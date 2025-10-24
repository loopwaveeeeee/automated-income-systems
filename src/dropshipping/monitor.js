const fs = require('fs');
const path = require('path');

// robust root directory: prefer __dirname, fallback to process.cwd()
const _ROOT = (typeof __dirname !== 'undefined') ? __dirname : (process && process.cwd ? process.cwd() : '.');

class DropshippingMonitor {
    constructor() {
        this.isRunning = false;
        this.config = {
            suppliers: ['aliexpress', 'dhgate'],
            minMargin: 30, // Minimum profit margin percentage
            maxProducts: 50,
            updateInterval: 3 * 60 * 60 * 1000, // 3 hours
            categories: ['electronics', 'fashion', 'home', 'sports']
        };

        this.products = [];
        this.orders = [];
        this.revenue = {
            total: 0,
            monthly: 0,
            orders: 0
        };

        const ROOT_DIR = (typeof __dirname !== 'undefined') ? __dirname : (typeof process !== 'undefined' && process.cwd ? process.cwd() : '.');
        this.loadData();
    }

    async initialize() {
        console.log('📦 Initializing Dropshipping Monitor...');
        // Load API keys from environment
        this.shopifyApiKey = process.env.SHOPIFY_API_KEY;
        this.shopifySecret = process.env.SHOPIFY_SECRET_KEY;
        this.aliexpressApiKey = process.env.ALIEXPRESS_API_KEY;

        if (!this.shopifyApiKey) {
            console.log('⚠️  Shopify API keys not found. Dropshipping monitor will run in simulation mode.');
            this.simulationMode = true;
        }

        this.isRunning = true;
        console.log('✅ Dropshipping Monitor initialized');
        return true;
    }

    async start() {
        if (!this.isRunning) {
            await this.initialize();
        }

        console.log('🚀 Starting Dropshipping Monitor...');

        // Initial product sourcing
        await this.sourceProducts();

        // Start periodic updates
        this.updateInterval = setInterval(() => {
            this.sourceProducts();
            this.monitorOrders();
        }, this.config.updateInterval);

        console.log('✅ Dropshipping Monitor started');
    }

    async stop() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        this.isRunning = false;
        this.saveData();
        console.log('🛑 Dropshipping Monitor stopped');
    }

    async sourceProducts() {
        if (!this.isRunning) return;

        console.log('🔍 Sourcing trending products...');

        try {
            for (const supplier of this.config.suppliers) {
                for (const category of this.config.categories) {
                    const newProducts = await this.getSupplierProducts(supplier, category);
                    this.products.push(...newProducts);
                }
            }

            // Filter by margin and sort by score
            this.products = this.products
                .filter(p => p.margin >= this.config.minMargin)
                .sort((a, b) => b.score - a.score)
                .slice(0, this.config.maxProducts);

            // Auto-list high-scoring products
            await this.listProducts();

            console.log(`📦 Sourced and listed ${this.products.length} products`);
            this.saveData();

        } catch (error) {
            console.error('❌ Product sourcing error:', error.message);
        }
    }

    async getSupplierProducts(supplier, category) {
        // Simulated product sourcing
        // In real implementation, this would use AliExpress/DHgate APIs
        const mockProducts = Array.from({ length: 5 }, (_, i) => ({
            id: `drop_${supplier}_${Date.now()}_${i}`,
            title: `Trending ${category} Product ${i + 1}`,
            supplier,
            category,
            costPrice: Math.floor(Math.random() * 50) + 10,
            sellingPrice: Math.floor(Math.random() * 150) + 50,
            margin: Math.floor(Math.random() * 50) + 20,
            score: Math.floor(Math.random() * 100),
            supplierUrl: `https://${supplier}.com/item/example${i}`,
            listed: false,
            timestamp: new Date()
        }));

        return mockProducts;
    }

    async listProducts() {
        if (!this.isRunning) return;

        const unlistedProducts = this.products.filter(p => !p.listed);

        for (const product of unlistedProducts.slice(0, 10)) { // List top 10
            try {
                // Simulate listing on Shopify
                await this.listOnShopify(product);
                product.listed = true;
                product.listedAt = new Date();
                console.log(`🛒 Listed: ${product.title} (${product.margin}% margin)`);
            } catch (error) {
                console.error(`❌ Failed to list ${product.title}:`, error.message);
            }
        }
    }

    async listOnShopify(product) {
        // Simulated Shopify API call
        // In real implementation, this would use Shopify Admin API
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    shopifyId: `shopify_${product.id}`,
                    url: `https://yourstore.com/products/${product.id}`
                });
            }, 100);
        });
    }

    async monitorOrders() {
        if (!this.isRunning) return;

        console.log('📋 Monitoring orders...');

        // Simulate new orders
        const newOrders = Math.floor(Math.random() * 3); // 0-2 orders

        for (let i = 0; i < newOrders; i++) {
            const order = this.createMockOrder();
            this.orders.push(order);
            this.revenue.total += order.profit;
            this.revenue.monthly += order.profit;
            this.revenue.orders++;

            console.log(`✅ New order: $${order.total} (Profit: $${order.profit})`);
        }

        this.saveData();
    }

    createMockOrder() {
        const product = this.products[Math.floor(Math.random() * this.products.length)];
        const quantity = Math.floor(Math.random() * 5) + 1;
        const total = product.sellingPrice * quantity;
        const cost = product.costPrice * quantity;
        const profit = total - cost;

        return {
            id: `order_${Date.now()}_${Math.random()}`,
            productId: product.id,
            quantity,
            total,
            cost,
            profit,
            status: 'fulfilled',
            timestamp: new Date()
        };
    }

    getPerformance() {
        const margin = this.products.length > 0 ?
            this.products.reduce((sum, p) => sum + p.margin, 0) / this.products.length : 0;

        return {
            products: this.products.length,
            orders: this.revenue.orders,
            margin: margin
        };
    }

    loadData() {
        try {
            const dataPath = path.join(_ROOT, '..', '..', 'data', 'dropshipping_data.json');
            if (fs.existsSync(dataPath)) {
                const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
                this.products = data.products || [];
                this.orders = data.orders || [];
                this.revenue = data.revenue || this.revenue;
            }
        } catch (error) {
            console.log('⚠️  Could not load dropshipping data');
        }
    }

    saveData() {
        try {
            const dataPath = path.join(_ROOT, '..', '..', 'data', 'dropshipping_data.json');
            const data = {
                products: this.products,
                orders: this.orders,
                revenue: this.revenue
            };
            fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('❌ Could not save dropshipping data');
        }
    }
}

module.exports = DropshippingMonitor;
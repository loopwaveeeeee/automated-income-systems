const fs = require('fs');
const path = require('path');
// robust root directory: prefer __dirname, fallback to process.cwd()
const _ROOT = (typeof __dirname !== 'undefined') ? __dirname : (process && process.cwd ? process.cwd() : '.');

class AffiliateManager {
    constructor() {
        this.isRunning = false;
        this.config = {
            categories: ['tech', 'fitness', 'home', 'books'],
            minCommission: 5, // Minimum commission percentage
            maxProducts: 100,
            updateInterval: 2 * 60 * 60 * 1000 // 2 hours
        };

        this.products = [];
        this.revenue = {
            total: 0,
            monthly: 0,
            conversions: 0
        };

        const ROOT_DIR = (typeof __dirname !== 'undefined') ? __dirname : (typeof process !== 'undefined' && process.cwd ? process.cwd() : '.');
        this.loadData();
    }

    async initialize() {
        console.log('💼 Initializing Affiliate Manager...');
        // Load API keys from environment
        this.amazonAssociateId = process.env.AMAZON_ASSOCIATE_ID;
        this.amazonAccessKey = process.env.AMAZON_ACCESS_KEY;
        this.cjApiKey = process.env.COMMISSION_JUNCTION_API_KEY;

        if (!this.amazonAssociateId) {
            console.log('⚠️  Amazon Associate ID not found. Affiliate manager will run in simulation mode.');
            this.simulationMode = true;
        }

        this.isRunning = true;
        console.log('✅ Affiliate Manager initialized');
        return true;
    }

    async start() {
        if (!this.isRunning) {
            await this.initialize();
        }

        console.log('🚀 Starting Affiliate Manager...');

        // Initial product discovery
        await this.discoverProducts();

        // Start periodic updates
        this.updateInterval = setInterval(() => {
            this.discoverProducts();
            this.monitorPrices();
        }, this.config.updateInterval);

        console.log('✅ Affiliate Manager started');
    }

    async stop() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        this.isRunning = false;
        this.saveData();
        console.log('🛑 Affiliate Manager stopped');
    }

    async discoverProducts() {
        if (!this.isRunning) return;

        console.log('🔍 Discovering trending products...');

        try {
            for (const category of this.config.categories) {
                const newProducts = await this.getTrendingProducts(category);
                this.products.push(...newProducts);
            }

            // Keep only top products
            this.products = this.products
                .sort((a, b) => b.score - a.score)
                .slice(0, this.config.maxProducts);

            console.log(`📦 Found ${this.products.length} high-converting products`);
            this.saveData();

        } catch (error) {
            console.error('❌ Product discovery error:', error.message);
        }
    }

    async getTrendingProducts(category) {
        // Simulated product discovery
        // In real implementation, this would use Amazon Product Advertising API
        const mockProducts = [
            {
                id: `prod_${Date.now()}_${Math.random()}`,
                title: `Amazing ${category} Product ${Math.floor(Math.random() * 1000)}`,
                price: Math.floor(Math.random() * 200) + 20,
                originalPrice: Math.floor(Math.random() * 300) + 50,
                commission: Math.floor(Math.random() * 10) + 3,
                category,
                score: Math.floor(Math.random() * 100),
                affiliateUrl: `https://amazon.com/dp/example${Math.random().toString(36).substr(2, 9)}?tag=yourassociateid`,
                timestamp: new Date()
            }
        ];

        return mockProducts.filter(p => p.commission >= this.config.minCommission);
    }

    async monitorPrices() {
        if (!this.isRunning) return;

        console.log('💰 Monitoring price changes...');

        // Check for price drops and update products
        this.products.forEach(product => {
            // Simulate price changes
            const priceChange = (Math.random() - 0.5) * 0.1; // ±5% change
            const newPrice = product.price * (1 + priceChange);

            if (newPrice < product.price) {
                console.log(`📉 Price drop: ${product.title} - $${product.price.toFixed(2)} → $${newPrice.toFixed(2)}`);
                product.price = newPrice;
                product.lastUpdated = new Date();
            }
        });

        this.saveData();
    }

    generateAffiliateLink(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return null;

        // In real implementation, generate proper affiliate links
        return product.affiliateUrl;
    }

    recordConversion(productId, amount) {
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.revenue.total += amount;
            this.revenue.monthly += amount;
            this.revenue.conversions++;
            product.conversions = (product.conversions || 0) + 1;
            this.saveData();
        }
    }

    getPerformance() {
        const conversionRate = this.products.length > 0 ?
            (this.revenue.conversions / this.products.length) * 100 : 0;

        return {
            products: this.products.length,
            conversion: conversionRate,
            revenue: this.revenue.total
        };
    }

    loadData() {
        try {
            const dataPath = path.join(_ROOT, '..', '..', 'data', 'affiliate_data.json');
            if (fs.existsSync(dataPath)) {
                const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
                this.products = data.products || [];
                this.revenue = data.revenue || this.revenue;
            }
        } catch (error) {
            console.log('⚠️  Could not load affiliate data');
        }
    }

    saveData() {
        try {
            const dataPath = path.join(_ROOT, '..', '..', 'data', 'affiliate_data.json');
            const data = {
                products: this.products,
                revenue: this.revenue
            };
            fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('❌ Could not save affiliate data');
        }
    }
}

module.exports = AffiliateManager;
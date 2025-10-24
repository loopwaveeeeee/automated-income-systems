const fs = require('fs');
const path = require('path');

class DividendTracker {
    constructor() {
        this.isRunning = false;
        this.config = {
            minYield: 3.0, // Minimum dividend yield percentage
            maxStocks: 20,
            updateInterval: 24 * 60 * 60 * 1000, // Daily updates
            sectors: ['technology', 'healthcare', 'consumer', 'financial', 'energy']
        };

        this.stocks = [];
        this.portfolio = [];
        this.dividends = {
            total: 0,
            monthly: 0,
            history: []
        };

        const ROOT_DIR = (typeof __dirname !== 'undefined') ? __dirname : (typeof process !== 'undefined' && process.cwd ? process.cwd() : '.');
        this.loadData();
    }

    async initialize() {
        console.log('📈 Initializing Dividend Tracker...');
        // Load API keys from environment
        this.alphaVantageKey = process.env.ALPHA_VANTAGE_API_KEY;
        this.yahooFinanceKey = process.env.YAHOO_FINANCE_API_KEY;

        if (!this.alphaVantageKey) {
            console.log('⚠️  Financial API keys not found. Dividend tracker will run in simulation mode.');
            this.simulationMode = true;
        }

        this.isRunning = true;
        console.log('✅ Dividend Tracker initialized');
        return true;
    }

    async start() {
        if (!this.isRunning) {
            await this.initialize();
        }

        console.log('🚀 Starting Dividend Tracker...');

        // Initial stock analysis
        await this.analyzeStocks();

        // Start periodic updates
        this.updateInterval = setInterval(() => {
            this.analyzeStocks();
            this.checkDividendPayments();
        }, this.config.updateInterval);

        console.log('✅ Dividend Tracker started');
    }

    async stop() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        this.isRunning = false;
        this.saveData();
        console.log('🛑 Dividend Tracker stopped');
    }

    async analyzeStocks() {
        if (!this.isRunning) return;

        console.log('📊 Analyzing dividend stocks...');

        try {
            // Get high-yield stocks
            const candidates = await this.getHighYieldStocks();

            // Update existing stocks and add new ones
            for (const stock of candidates) {
                const existing = this.stocks.find(s => s.symbol === stock.symbol);
                if (existing) {
                    Object.assign(existing, stock);
                } else {
                    this.stocks.push(stock);
                }
            }

            // Sort by yield and keep top stocks
            this.stocks = this.stocks
                .filter(s => s.dividendYield >= this.config.minYield)
                .sort((a, b) => b.dividendYield - a.dividendYield)
                .slice(0, this.config.maxStocks);

            // Generate recommendations
            await this.generateRecommendations();

            console.log(`📈 Tracking ${this.stocks.length} high-yield dividend stocks`);
            this.saveData();

        } catch (error) {
            console.error('❌ Stock analysis error:', error.message);
        }
    }

    async getHighYieldStocks() {
        // Simulated stock data
        // In real implementation, this would use Alpha Vantage or Yahoo Finance APIs
        const mockStocks = [
            { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'healthcare', price: 165, dividendYield: 3.2, dividendAmount: 5.28 },
            { symbol: 'KO', name: 'Coca-Cola', sector: 'consumer', price: 58, dividendYield: 3.1, dividendAmount: 1.80 },
            { symbol: 'PG', name: 'Procter & Gamble', sector: 'consumer', price: 145, dividendYield: 2.8, dividendAmount: 4.07 },
            { symbol: 'VZ', name: 'Verizon', sector: 'technology', price: 42, dividendYield: 6.2, dividendAmount: 2.59 },
            { symbol: 'PFE', name: 'Pfizer', sector: 'healthcare', price: 38, dividendYield: 4.1, dividendAmount: 1.56 },
            { symbol: 'XOM', name: 'Exxon Mobil', sector: 'energy', price: 105, dividendYield: 3.8, dividendAmount: 3.99 },
            { symbol: 'CVX', name: 'Chevron', sector: 'energy', price: 155, dividendYield: 3.5, dividendAmount: 5.43 },
            { symbol: 'ABBV', name: 'AbbVie', sector: 'healthcare', price: 140, dividendYield: 4.2, dividendAmount: 5.88 },
            { symbol: 'MRK', name: 'Merck', sector: 'healthcare', price: 110, dividendYield: 2.9, dividendAmount: 3.19 },
            { symbol: 'PEP', name: 'PepsiCo', sector: 'consumer', price: 170, dividendYield: 3.0, dividendAmount: 5.10 }
        ];

        return mockStocks;
    }

    async generateRecommendations() {
        // Simple recommendation logic
        this.stocks.forEach(stock => {
            if (stock.dividendYield >= 4.0) {
                stock.recommendation = 'BUY';
                stock.confidence = 'High';
            } else if (stock.dividendYield >= 3.0) {
                stock.recommendation = 'HOLD';
                stock.confidence = 'Medium';
            } else {
                stock.recommendation = 'WAIT';
                stock.confidence = 'Low';
            }
        });
    }

    async checkDividendPayments() {
        if (!this.isRunning) return;

        console.log('💰 Checking dividend payments...');

        const today = new Date();
        const currentMonth = today.getMonth();

        // Simulate dividend payments (in reality, this would check ex-dividend dates)
        this.stocks.forEach(stock => {
            // Random chance of dividend payment
            if (Math.random() < 0.1) { // 10% chance per check
                const dividend = stock.dividendAmount / 12; // Monthly approximation
                this.dividends.total += dividend;
                this.dividends.monthly += dividend;

                this.dividends.history.push({
                    symbol: stock.symbol,
                    amount: dividend,
                    date: new Date(),
                    exDividendDate: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
                });

                console.log(`💵 Dividend received: $${dividend.toFixed(2)} from ${stock.symbol}`);
            }
        });

        this.saveData();
    }

    getPerformance() {
        const avgYield = this.stocks.length > 0 ?
            this.stocks.reduce((sum, s) => sum + s.dividendYield, 0) / this.stocks.length : 0;

        return {
            stocks: this.stocks.length,
            yield: avgYield,
            income: this.dividends.monthly
        };
    }

    loadData() {
        try {
            const dataPath = path.join(ROOT_DIR, '..', '..', 'data', 'dividend_data.json');
            if (fs.existsSync(dataPath)) {
                const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
                this.stocks = data.stocks || [];
                this.dividends = data.dividends || this.dividends;
            }
        } catch (error) {
            console.log('⚠️  Could not load dividend data');
        }
    }

    saveData() {
        try {
            const dataPath = path.join(ROOT_DIR, '..', '..', 'data', 'dividend_data.json');
            const data = {
                stocks: this.stocks,
                dividends: this.dividends
            };
            fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('❌ Could not save dividend data');
        }
    }
}

module.exports = DividendTracker;
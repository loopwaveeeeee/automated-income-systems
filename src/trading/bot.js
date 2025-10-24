const fs = require('fs');
const path = require('path');

// robust root directory: prefer __dirname, fallback to process.cwd()
const _ROOT = (typeof __dirname !== 'undefined') ? __dirname : (process && process.cwd ? process.cwd() : '.');

class TradingBot {
    constructor() {
        this.isRunning = false;
        this.config = {
            maxPositionSize: 0.1,     // 10% of portfolio per trade
            stopLoss: 0.02,           // 2% stop loss
            takeProfit: 0.04,         // 4% take profit
            rsiOverbought: 70,
            rsiOversold: 30,
            symbols: ['BTC/USDT', 'ETH/USDT', 'ADA/USDT', 'DOT/USDT']
        };

        this.portfolio = {
            balance: 10000, // Starting balance
            positions: [],
            totalTrades: 0,
            winningTrades: 0
        };

        this.loadPortfolio();
    }

    async initialize() {
        console.log('🤖 Initializing Trading Bot...');
        // Load API keys from environment
        this.apiKey = process.env.BINANCE_API_KEY;
        this.secretKey = process.env.BINANCE_SECRET_KEY;

        if (!this.apiKey || !this.secretKey) {
            console.log('⚠️  Binance API keys not found. Trading bot will run in simulation mode.');
            this.simulationMode = true;
        }

        this.isRunning = true;
        console.log('✅ Trading Bot initialized');
        return true;
    }

    async start() {
        if (!this.isRunning) {
            await this.initialize();
        }

        console.log('🚀 Starting Trading Bot...');

        // Start trading loop
        this.tradingInterval = setInterval(() => {
            this.analyzeAndTrade();
        }, 5 * 60 * 1000); // Every 5 minutes

        console.log('✅ Trading Bot started');
    }

    async stop() {
        if (this.tradingInterval) {
            clearInterval(this.tradingInterval);
        }
        this.isRunning = false;
        this.savePortfolio();
        console.log('🛑 Trading Bot stopped');
    }

    async analyzeAndTrade() {
        if (!this.isRunning) return;

        try {
            for (const symbol of this.config.symbols) {
                const analysis = await this.analyzeSymbol(symbol);
                if (analysis.signal === 'BUY') {
                    await this.executeBuy(symbol, analysis.price);
                } else if (analysis.signal === 'SELL') {
                    await this.executeSell(symbol, analysis.price);
                }
            }
        } catch (error) {
            console.error('❌ Trading analysis error:', error.message);
        }
    }

    async analyzeSymbol(symbol) {
        // Simplified technical analysis
        // In a real implementation, this would fetch real market data
        const price = this.getSimulatedPrice(symbol);
        const rsi = this.calculateRSI(symbol);
        const signal = this.generateSignal(rsi);

        return {
            symbol,
            price,
            rsi,
            signal
        };
    }

    getSimulatedPrice(symbol) {
        // Simulate price movements
        const basePrices = {
            'BTC/USDT': 45000,
            'ETH/USDT': 3000,
            'ADA/USDT': 0.5,
            'DOT/USDT': 8
        };

        const basePrice = basePrices[symbol] || 100;
        const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
        return basePrice * (1 + variation);
    }

    calculateRSI(symbol) {
        // Simplified RSI calculation
        return Math.random() * 100; // Random for simulation
    }

    generateSignal(rsi) {
        if (rsi < this.config.rsiOversold) {
            return 'BUY';
        } else if (rsi > this.config.rsiOverbought) {
            return 'SELL';
        }
        return 'HOLD';
    }

    async executeBuy(symbol, price) {
        const positionSize = this.portfolio.balance * this.config.maxPositionSize;
        const quantity = positionSize / price;

        if (positionSize > this.portfolio.balance) {
            console.log('💰 Insufficient balance for trade');
            return;
        }

        const position = {
            symbol,
            quantity,
            entryPrice: price,
            stopLoss: price * (1 - this.config.stopLoss),
            takeProfit: price * (1 + this.config.takeProfit),
            timestamp: new Date()
        };

        this.portfolio.positions.push(position);
        this.portfolio.balance -= positionSize;
        this.portfolio.totalTrades++;

        console.log(`📈 BUY: ${quantity.toFixed(4)} ${symbol} at $${price.toFixed(2)}`);
        this.savePortfolio();
    }

    async executeSell(symbol, price) {
        const positionIndex = this.portfolio.positions.findIndex(p => p.symbol === symbol);
        if (positionIndex === -1) return;

        const position = this.portfolio.positions[positionIndex];
        const profit = (price - position.entryPrice) * position.quantity;

        this.portfolio.balance += (position.entryPrice * position.quantity) + profit;
        this.portfolio.positions.splice(positionIndex, 1);

        if (profit > 0) {
            this.portfolio.winningTrades++;
        }

        console.log(`📉 SELL: ${position.quantity.toFixed(4)} ${symbol} at $${price.toFixed(2)} (P&L: $${profit.toFixed(2)})`);
        this.savePortfolio();
    }

    getPerformance() {
        const winRate = this.portfolio.totalTrades > 0 ?
            (this.portfolio.winningTrades / this.portfolio.totalTrades) * 100 : 0;

        return {
            portfolio: this.portfolio.balance,
            trades: this.portfolio.totalTrades,
            success: winRate,
            positions: this.portfolio.positions.length
        };
    }

    loadPortfolio() {
        try {
            const dataPath = path.join(_ROOT, '..', '..', 'data', 'trading_portfolio.json');
            if (fs.existsSync(dataPath)) {
                const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
                this.portfolio = { ...this.portfolio, ...data };
            }
        } catch (error) {
            console.log('⚠️  Could not load trading portfolio data');
        }
    }

    savePortfolio() {
        try {
            const dataPath = path.join(_ROOT, '..', '..', 'data', 'trading_portfolio.json');
            fs.writeFileSync(dataPath, JSON.stringify(this.portfolio, null, 2));
        } catch (error) {
            console.error('❌ Could not save trading portfolio data');
        }
    }
}

module.exports = TradingBot;
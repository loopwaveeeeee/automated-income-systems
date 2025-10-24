# 🚀 Automated Income Systems

A comprehensive automated passive income generation platform that manages multiple revenue streams including cryptocurrency trading, affiliate marketing, dropshipping, and dividend investing.

## 🎯 Features

### 💰 Multiple Income Streams
- **Cryptocurrency Trading Bot** - Automated trading with technical analysis and risk management
- **Affiliate Marketing Manager** - Product discovery, price monitoring, and commission optimization
- **Dropshipping Automation** - Product sourcing, listing, and order fulfillment
- **Dividend Stock Tracker** - High-yield stock analysis and portfolio management

### 📊 Real-time Dashboard
- Live performance monitoring
- Revenue tracking and analytics
- System status management
- Interactive charts and metrics

### 🛡️ Risk Management
- Position sizing and stop-loss automation
- Portfolio diversification monitoring
- Daily loss limits and correlation analysis
- Performance-based recommendations

## 🛠️ Installation

### Prerequisites
- Node.js 16+ 
- MongoDB (optional, uses file storage by default)
- API keys for various services (see Configuration)

### Quick Start

1. **Clone the repository**
```bash
git clone https://github.com/bullpowerhubgit/automated-income-systems.git
cd automated-income-systems
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env with your API keys and configuration
```

4. **Start the system**
```bash
npm start
```

5. **Access the dashboard**
Open http://localhost:3000/dashboard in your browser

## ⚙️ Configuration

### Required API Keys

Create a `.env` file based on `.env.example` and configure:

#### Trading (Optional but Recommended)
```env
BINANCE_API_KEY=your_binance_api_key
BINANCE_SECRET_KEY=your_binance_secret_key
```

#### Affiliate Marketing
```env
AMAZON_ASSOCIATE_ID=your_amazon_associate_id
AMAZON_ACCESS_KEY=your_amazon_access_key
COMMISSION_JUNCTION_API_KEY=your_cj_api_key
```

#### Dropshipping
```env
SHOPIFY_API_KEY=your_shopify_api_key
SHOPIFY_SECRET_KEY=your_shopify_secret_key
ALIEXPRESS_API_KEY=your_aliexpress_api_key
```

#### Financial Data
```env
ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
YAHOO_FINANCE_API_KEY=your_yahoo_finance_key
```

#### Notifications
```env
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## 🚦 Getting Started

### 1. System Overview

The platform consists of four main income generation systems:

- **Trading Bot**: Automatically trades cryptocurrencies using technical analysis
- **Affiliate Manager**: Finds and promotes high-converting affiliate products  
- **Dropshipping Monitor**: Sources trending products and automates order fulfillment
- **Dividend Tracker**: Analyzes dividend stocks and tracks portfolio performance

### 2. Initial Setup

1. **Configure API Keys**: Add your exchange and service API keys to `.env`
2. **Set Risk Parameters**: Adjust risk management settings in each system
3. **Fund Trading Account**: Add initial capital to your trading exchange
4. **Review Settings**: Check configuration in `src/app.js`

### 3. Start Individual Systems

Each system can be controlled independently:

```bash
# Start specific systems
npm run trading-bot
npm run affiliate-manager  
npm run dropship-monitor
npm run dividend-tracker
```

Or start all systems together:
```bash
npm start
```

## 📈 Usage

### Dashboard Interface

Access the web dashboard at `http://localhost:3000/dashboard` to:

- Monitor real-time performance across all income streams
- View revenue trends and analytics
- Control individual systems (start/stop)
- Track key metrics and KPIs
- Receive alerts and notifications

### API Endpoints

The system provides REST API endpoints:

- `GET /api/status` - System status and health
- `GET /api/performance` - Overall performance metrics  
- `GET /api/income-streams` - Individual system performance
- `POST /api/systems/:system/toggle` - Start/stop systems

### Individual System Management

#### Trading Bot
- Monitors BTC/USDT, ETH/USDT, ADA/USDT, DOT/USDT
- Uses RSI, MACD, Moving Averages, Bollinger Bands
- Implements stop-loss and take-profit orders
- Risk management with position limits

#### Affiliate Marketing
- Searches for trending products in tech, fitness, home categories
- Monitors price drops for promotion opportunities
- Generates affiliate links automatically
- Tracks clicks, conversions, and revenue

#### Dropshipping
- Scrapes AliExpress and DHgate for trending products
- Auto-lists high-scoring products to Shopify
- Monitors competitor pricing
- Automates order fulfillment

#### Dividend Tracking
- Analyzes 20+ high-dividend stocks
- Tracks ex-dividend dates and payment schedules
- Calculates yield and growth metrics
- Provides buy/sell recommendations

## 🔧 Advanced Configuration

### Trading Parameters

Edit `src/trading/bot.js` to adjust:

```javascript
this.config = {
    maxPositionSize: 0.1,     // 10% of portfolio per trade
    stopLoss: 0.02,           // 2% stop loss
    takeProfit: 0.04,         // 4% take profit
    rsiOverbought: 70,
    rsiOversold: 30
};
```

### Risk Management

Modify `src/trading/riskManager.js`:

```javascript
this.maxDrawdown = 0.15;      // 15% max drawdown
this.maxTotalPositions = 5;   // Max open positions
this.dailyLossLimit = 0.05;   // 5% daily loss limit
```

### Scheduler Configuration

Adjust cron schedules in each system:

```javascript
// Trading analysis every 5 minutes
cron.schedule('*/5 * * * *', () => { ... });

// Price updates every 2 hours  
cron.schedule('0 */2 * * *', () => { ... });

// Daily reports at 9 AM
cron.schedule('0 9 * * *', () => { ... });
```

## 📊 Performance Monitoring

### Key Metrics

The system tracks:

- **Total Portfolio Value**: Combined value across all systems
- **Daily Revenue**: Net income from all sources
- **Monthly Progress**: Progress toward monthly income target
- **System Performance**: Individual system metrics and health
- **Risk Metrics**: Drawdown, volatility, correlation

### Alerts and Notifications

Automatic notifications for:

- Significant price movements
- High-yield dividend opportunities  
- Large affiliate commission earnings
- Dropshipping order fulfillment
- Risk threshold breaches

## 🔒 Security

### API Key Security
- Store all API keys in environment variables
- Use read-only API keys when possible
- Enable IP whitelisting on exchanges
- Regularly rotate API keys

### Risk Management
- Never invest more than you can afford to lose
- Start with paper trading to test strategies
- Use sandbox/testnet environments initially
- Monitor systems regularly

### Data Protection
- All sensitive data encrypted at rest
- Secure database connections
- Regular backup procedures
- Access logging and monitoring

## 🚨 Important Disclaimers

⚠️ **Financial Risk Warning**
- Trading cryptocurrencies involves substantial risk of loss
- Past performance does not guarantee future results  
- Only invest capital you can afford to lose
- This software is for educational purposes

⚠️ **Legal Compliance**
- Ensure compliance with local financial regulations
- Affiliate marketing must follow FTC guidelines
- Dropshipping requires proper business licensing
- Tax implications vary by jurisdiction

⚠️ **No Guarantees**
- No guarantee of profitability
- Market conditions can cause significant losses
- Technical issues may impact performance
- Regular monitoring and maintenance required

## 🛠️ Development

### Project Structure

```
src/
├── app.js                 # Main application entry
├── trading/
│   ├── bot.js            # Trading bot implementation
│   ├── analysis.js       # Technical analysis
│   ├── riskManager.js    # Risk management
│   └── portfolio.js      # Portfolio tracking
├── affiliate/
│   └── manager.js        # Affiliate marketing
├── dropshipping/
│   └── monitor.js        # Dropshipping automation
├── dividend/
│   └── tracker.js        # Dividend analysis
├── analytics/
│   └── performance.js    # Performance analytics
└── utils/
    ├── logger.js         # Logging utility
    └── database.js       # Data storage
```

### Adding New Systems

1. Create new system class in appropriate directory
2. Implement required methods: `initialize()`, `getPerformance()`, `toggle()`, `stop()`
3. Register system in `src/app.js`
4. Add dashboard UI components
5. Update performance analyzer

### Testing

```bash
# Run test suite
npm test

# Run specific system tests
npm test -- --grep "Trading Bot"

# Run integration tests
npm run test:integration
```

## 📞 Support

### Documentation
- API Documentation: `/docs/api`
- System Architecture: `/docs/architecture`
- Deployment Guide: `/docs/deployment`

### Community
- GitHub Issues: Report bugs and feature requests
- Discord Server: Join our trading community
- YouTube Channel: Video tutorials and updates

### Professional Support
- Custom integrations available
- Strategy development services
- VPS deployment assistance
- Priority support plans

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CCXT](https://github.com/ccxt/ccxt) for cryptocurrency exchange integration
- [Puppeteer](https://pptr.dev/) for web scraping capabilities
- [Chart.js](https://www.chartjs.org/) for dashboard visualizations
- [Express](https://expressjs.com/) for web server framework

---

**⚡ Ready to automate your income? Start your journey to financial freedom today!**

Remember to start small, monitor regularly, and never risk more than you can afford to lose. Happy automating! 🚀
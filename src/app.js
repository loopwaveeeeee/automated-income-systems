const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const TradingBot = require('./trading/bot');
const AffiliateManager = require('./affiliate/manager');
const DropshippingMonitor = require('./dropshipping/monitor');
const DividendTracker = require('./dividend/tracker');

// project root fallback (works in CommonJS and ESM/browser-guard)
const projectRoot = (typeof __dirname !== 'undefined') ? path.resolve(__dirname, '..') : (typeof process !== 'undefined' && process.cwd ? path.resolve(process.cwd()) : '.');
const PORT = process.env.PORT || 3000;

// Initialize systems
const tradingBot = new TradingBot();
const affiliateManager = new AffiliateManager();
const dropshippingMonitor = new DropshippingMonitor();
const dividendTracker = new DividendTracker();
const systems = {
    trading: tradingBot,
    affiliate: affiliateManager,
    dropshipping: dropshippingMonitor,
    dividend: dividendTracker
};

// (projectRoot is used above as the root path)

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Simple request logging
    try {
        const remote = req.socket && req.socket.remoteAddress ? req.socket.remoteAddress : 'unknown';
        console.log(`[${new Date().toISOString()}] ${req.method} ${pathname} from ${remote}`);
    } catch (e) {}

    // Set permissive CORS headers so clients (local browser, tools) can always reach the API
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Max-Age', '86400');

    // Always respond to preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // API routes
    if (pathname === '/api/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'running',
            systems: {
                trading: tradingBot.isRunning,
                affiliate: affiliateManager.isRunning,
                dropshipping: dropshippingMonitor.isRunning,
                dividend: dividendTracker.isRunning
            }
        }));
        return;
    }

    if (pathname === '/api/performance') {
        const tradingPerf = tradingBot.getPerformance();
        const affiliatePerf = affiliateManager.getPerformance();
        const dropshippingPerf = dropshippingMonitor.getPerformance();
        const dividendPerf = dividendTracker.getPerformance();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            totalValue: tradingPerf.portfolio + affiliatePerf.revenue + dropshippingPerf.margin + dividendPerf.income,
            dailyRevenue: 0, // TODO: Calculate daily revenue
            monthlyTarget: 1000,
            activeSystems: (tradingBot.isRunning ? 1 : 0) + (affiliateManager.isRunning ? 1 : 0) + (dropshippingMonitor.isRunning ? 1 : 0) + (dividendTracker.isRunning ? 1 : 0),
            monthlyProgress: 0 // TODO: Calculate progress
        }));
        return;
    }

    if (pathname === '/api/income-streams') {
        const tradingPerf = tradingBot.getPerformance();
        const affiliatePerf = affiliateManager.getPerformance();
        const dropshippingPerf = dropshippingMonitor.getPerformance();
        const dividendPerf = dividendTracker.getPerformance();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify([
            {
                type: 'trading',
                data: {
                    trades: tradingPerf.trades,
                    success: tradingPerf.success,
                    portfolio: tradingPerf.portfolio
                }
            },
            {
                type: 'affiliate',
                data: {
                    products: affiliatePerf.products,
                    conversion: affiliatePerf.conversion,
                    revenue: affiliatePerf.revenue
                }
            },
            {
                type: 'dropshipping',
                data: {
                    products: dropshippingPerf.products,
                    orders: dropshippingPerf.orders,
                    margin: dropshippingPerf.margin
                }
            },
            {
                type: 'dividend',
                data: {
                    stocks: dividendPerf.stocks,
                    yield: dividendPerf.yield,
                    income: dividendPerf.income
                }
            }
        ]));
        return;
    }

    if (pathname === '/api/systems/trading/toggle' && req.method === 'POST') {
        if (tradingBot.isRunning) {
            tradingBot.stop();
        } else {
            tradingBot.start();
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, running: tradingBot.isRunning }));
        return;
    }

    if (pathname === '/api/systems/affiliate/toggle' && req.method === 'POST') {
        if (affiliateManager.isRunning) {
            affiliateManager.stop();
        } else {
            affiliateManager.start();
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, running: affiliateManager.isRunning }));
        return;
    }

    if (pathname === '/api/systems/dropshipping/toggle' && req.method === 'POST') {
        if (dropshippingMonitor.isRunning) {
            dropshippingMonitor.stop();
        } else {
            dropshippingMonitor.start();
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, running: dropshippingMonitor.isRunning }));
        return;
    }

    if (pathname === '/api/systems/dividend/toggle' && req.method === 'POST') {
        if (dividendTracker.isRunning) {
            dividendTracker.stop();
        } else {
            dividendTracker.start();
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, running: dividendTracker.isRunning }));
        return;
    }

    // Serve static files from public directory with safe normalization and SPA fallback
    const publicRoot = path.join(projectRoot, 'public');
    // normalize requested path and avoid directory traversal
    let requested = pathname === '/' ? '/index.html' : pathname;
    // Ensure no querystring or hash
    requested = requested.split('?')[0].split('#')[0];
    let filePath = path.normalize(path.join(publicRoot, requested));

    // Prevent directory traversal: filePath must start with publicRoot
    if (!filePath.startsWith(path.normalize(publicRoot))) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end('<h1>403 Forbidden</h1>');
        return;
    }

    // If no extension, assume .html
    if (!path.extname(filePath)) {
        filePath += '.html';
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            // If file not found and this is not an API route, serve index.html for SPA fallback
            if (err.code === 'ENOENT' && !pathname.startsWith('/api')) {
                const indexPath = path.join(publicRoot, 'index.html');
                fs.readFile(indexPath, (ierr, idata) => {
                    if (ierr) {
                        res.writeHead(500, { 'Content-Type': 'text/html' });
                        res.end('<h1>500 Internal Server Error</h1>');
                        return;
                    }
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(idata);
                });
                return;
            }

            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
            }
            return;
        }

        // Set content type based on file extension
        const ext = path.extname(filePath);
        let contentType = 'text/html';
        switch (ext) {
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
            case '.svg':
                contentType = 'image/svg+xml';
                break;
            case '.ico':
                contentType = 'image/x-icon';
                break;
        }

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Automated Income Systems running on http://localhost:${PORT}`);
    console.log(`📊 Dashboard: http://localhost:${PORT}/dashboard`);
    console.log(`🌐 Also available on: http://0.0.0.0:${PORT}`);
});

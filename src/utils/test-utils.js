const logger = require('./logger');
const db = require('./database');

logger.info('Test: logger initialized');

db.write('test.json', { ok: true, timestamp: new Date().toISOString() });
const data = db.read('test.json');
logger.info('Test: db read result -> ' + JSON.stringify(data));

console.log('Utils test complete');

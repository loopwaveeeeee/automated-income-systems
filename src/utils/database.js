const fs = require('fs');
const path = require('path');

// robust root directory: prefer __dirname, fallback to process.cwd()
const _ROOT = (typeof __dirname !== 'undefined') ? __dirname : (process && process.cwd ? process.cwd() : '.');

const dataDir = path.join(_ROOT, '..', '..', 'data');
try { fs.mkdirSync(dataDir, { recursive: true }); } catch (e) {}

const dbFile = path.join(dataDir, 'db.json');

module.exports = {
    read: () => {
        try {
            if (fs.existsSync(dbFile)) {
                return JSON.parse(fs.readFileSync(dbFile, 'utf8'));
            }
        } catch (error) { }
        return {};
    },
    write: (obj) => {
        try {
            fs.writeFileSync(dbFile, JSON.stringify(obj, null, 2));
        } catch (error) { }
    }
};

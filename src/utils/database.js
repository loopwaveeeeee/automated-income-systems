const fs = require('fs');
const path = require('path');

const ROOT_DIR = (typeof __dirname !== 'undefined') ? __dirname : (typeof process !== 'undefined' && process.cwd ? process.cwd() : '.');

const dataDir = path.join(ROOT_DIR, '..', '..', 'data');
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

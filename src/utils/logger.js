const fs = require('fs');
const path = require('path');

const ROOT_DIR = (typeof __dirname !== 'undefined') ? __dirname : (typeof process !== 'undefined' && process.cwd ? process.cwd() : '.');

const logsDir = path.join(ROOT_DIR, '..', '..', 'logs');
try { fs.mkdirSync(logsDir, { recursive: true }); } catch (e) {}

function timestamp() {
  return new Date().toISOString();
}

function write(level, msg) {
  const line = `[${timestamp()}] [${level}] ${msg}\n`;
  try {
    fs.appendFileSync(path.join(logsDir, 'app.log'), line);
  } catch (e) {
    // ignore
  }
  if (level === 'ERROR') console.error(line.trim()); else console.log(line.trim());
}

module.exports = {
  info: (msg) => write('INFO', msg),
  warn: (msg) => write('WARN', msg),
  error: (msg) => write('ERROR', msg)
};

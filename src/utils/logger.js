const fs = require('fs');
const path = require('path');

// robust root directory: prefer __dirname, fallback to process.cwd()
const _ROOT = (typeof __dirname !== 'undefined') ? __dirname : (process && process.cwd ? process.cwd() : '.');

const logsDir = path.join(_ROOT, '..', '..', 'logs');
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

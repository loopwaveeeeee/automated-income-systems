const http = require('http');

function getJson(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let body = '';
      res.on('data', (c) => body += c);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error('Invalid JSON: ' + e.message));
        }
      });
    }).on('error', (err) => reject(err));
  });
}

(async () => {
  try {
    console.log('Fetching /api/status...');
    const status = await getJson('/api/status');
    console.log('Status:', JSON.stringify(status, null, 2));

    console.log('\nFetching /api/performance...');
    const perf = await getJson('/api/performance');
    console.log('Performance:', JSON.stringify(perf, null, 2));

    console.log('\nSmoke test: OK');
    process.exit(0);
  } catch (err) {
    console.error('\nSmoke test: FAILED');
    console.error(err && err.message ? err.message : err);
    process.exit(2);
  }
})();

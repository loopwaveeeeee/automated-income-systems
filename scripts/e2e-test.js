const http = require('http');

function httpRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: '127.0.0.1',
      port: 3000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function getJson(path) {
  const res = await httpRequest('GET', path);
  if (res.status !== 200) throw new Error(`GET ${path} -> ${res.status}`);
  try { return JSON.parse(res.body || '{}'); } catch (e) { throw new Error(`Invalid JSON from ${path}: ${e.message}`); }
}

async function postJson(path, body) {
  const res = await httpRequest('POST', path, body || {});
  if (res.status !== 200) throw new Error(`POST ${path} -> ${res.status}`);
  try { return JSON.parse(res.body || '{}'); } catch (e) { throw new Error(`Invalid JSON from POST ${path}: ${e.message}`); }
}

(async () => {
  const results = { ok: true, steps: [] };
  function step(name, ok, info) { results.steps.push({ name, ok, info }); if (!ok) results.ok = false; }

  try {
    // 1) Basic status
    const status1 = await getJson('/api/status');
    step('GET /api/status', true, status1);

    // 2) Performance and streams
    const perf = await getJson('/api/performance');
    step('GET /api/performance', true, perf);

    const streams = await getJson('/api/income-streams');
    step('GET /api/income-streams', Array.isArray(streams) && streams.length === 4, { length: Array.isArray(streams) ? streams.length : 'n/a' });

    // 3) Toggle each system on and off, verify status flips
    for (const sys of ['trading','affiliate','dropshipping','dividend']) {
      const togglePath = `/api/systems/${sys}/toggle`;
      const t1 = await postJson(togglePath, {});
      step(`POST ${togglePath} (on)`, t1 && t1.success === true, t1);
      const stOn = await getJson('/api/status');
      step(`status after ${sys} on`, stOn.systems && stOn.systems[sys] === true, stOn.systems);

      const t2 = await postJson(togglePath, {});
      step(`POST ${togglePath} (off)`, t2 && t2.success === true, t2);
      const stOff = await getJson('/api/status');
      step(`status after ${sys} off`, stOff.systems && stOff.systems[sys] === false, stOff.systems);
    }

    // 4) Dashboard route (SPA fallback)
    const dash = await httpRequest('GET', '/dashboard');
    const dashOk = dash.status === 200 && /Automated Income Systems/i.test(dash.body || '');
    step('GET /dashboard html', dashOk, { status: dash.status });

  } catch (err) {
    step('E2E error', false, { error: err.message });
  }

  // Print summary
  const pass = results.ok ? 'OK' : 'FAIL';
  console.log(`\nE2E RESULT: ${pass}`);
  for (const s of results.steps) {
    console.log(` - ${s.ok ? '✔' : '✖'} ${s.name}${s.ok ? '' : ' -> ' + JSON.stringify(s.info)}`);
  }

  process.exit(results.ok ? 0 : 2);
})();

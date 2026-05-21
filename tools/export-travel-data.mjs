import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const dataDir = path.join(root, 'assets', 'js', 'data');
const outputDir = path.join(root, 'database', 'seeders', 'data');
const outputFile = path.join(outputDir, 'travel-content.json');

const sandbox = {
  window: {},
  console,
};
sandbox.window.window = sandbox.window;

for (const file of ['tours.js', 'services.js', 'combos.js', 'gallery.js', 'videos.js']) {
  const filePath = path.join(dataDir, file);
  const code = fs.readFileSync(filePath, 'utf8');
  vm.runInNewContext(code, sandbox, { filename: filePath });
}

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputFile, `${JSON.stringify(sandbox.window.SaigonData || {}, null, 2)}\n`, 'utf8');

console.log(`Exported Travel static data to ${outputFile}`);


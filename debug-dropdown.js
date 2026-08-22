const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Search for all occurrences of "Header-nav-folder-item" and show context
let idx = 0;
let count = 0;
while ((idx = html.indexOf('Header-nav-folder-item', idx)) !== -1 && count < 20) {
  const snippet = html.substring(idx, idx + 100).replace(/\n/g, '\\n');
  console.log(`[${count}] pos=${idx}: ${snippet}`);
  idx += 30;
  count++;
}

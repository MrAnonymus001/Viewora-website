const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const before = html;

// Replace the about.html link with a JS-powered one that bypasses base href
// and opens in a new tab
html = html.replace(
  '<a href="about.html">About us</a>',
  '<a href="#" onclick="window.open(window.location.href.replace(/[^\\/]*$/, \'\') + \'about.html\', \'_blank\'); return false;">About us</a>'
);

if (html === before) {
  console.log('ERROR: pattern not found — no changes made.');
  process.exit(1);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done. About us link now opens about.html in a new tab correctly.');

const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const img1 = fs.readFileSync('new-hero-1.jpg');
const b64_1 = 'data:image/jpeg;base64,' + img1.toString('base64');

const img2 = fs.readFileSync('new-hero-2.jpg');
const b64_2 = 'data:image/jpeg;base64,' + img2.toString('base64');

html = html.replace(/<source srcset="new-hero-1\.jpg"/g, '<source srcset="' + b64_1 + '"');
html = html.replace(/src="new-hero-1\.jpg"/g, 'src="' + b64_1 + '"');

html = html.replace(/<source srcset="new-hero-2\.jpg"/g, '<source srcset="' + b64_2 + '"');
html = html.replace(/src="new-hero-2\.jpg"/g, 'src="' + b64_2 + '"');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Base64 injection complete.');

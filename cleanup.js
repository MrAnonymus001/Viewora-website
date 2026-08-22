const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'dist', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Remove obvious tracking/metrics scripts
const scriptsToRemove = [
    /<!-- This is Squarespace[\s\S]*?-->/g,
    /<script[^>]*src="[^"]*(analytics|tracking|facebook|twitter|pixel)[^"]*"[^>]*><\/script>/gi,
    /<script>window.SquarespaceMetrics[\s\S]*?<\/script>/gi,
    /<!--\[if lte IE 9\]>[\s\S]*?<!\[endif\]-->/g,
];

scriptsToRemove.forEach(regex => {
    html = html.replace(regex, '');
});

// Remove some generic script tags that contains tracking code
html = html.replace(/<script[^>]*>[\s\S]*?fbq\([\s\S]*?<\/script>/gi, '');
html = html.replace(/<script[^>]*>[\s\S]*?gtag\([\s\S]*?<\/script>/gi, '');

fs.writeFileSync(indexPath, html);
console.log('Cleanup complete');

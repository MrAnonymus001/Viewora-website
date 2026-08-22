const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

content = content.replace('Viewora Scans', 'Portfolio Packages');
content = content.replace('<h1>Use our network<br>to capture the<br>Property</h1>', '<h1>Book scans across<br>your whole<br>Portfolio</h1>');
content = content.replace('Request your scan online', 'Request your scans online');
content = content.replace('We schedule your operator', 'We schedule every property');
content = content.replace('Get your tour hosted & live', 'Get all your tours hosted & live');
content = content.replace('Tell us about your property', 'Tell us how many properties');

fs.writeFileSync('index.html', content);

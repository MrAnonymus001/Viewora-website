const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

content = content.replace('Book scans across<br>your whole<br>Portfolio', 'Book scans across<br>your complete<br>portfolio');
content = content.replace('<b>5+ States</b>FL, TX, CA, NC, OH & more', '<b>20–30% off</b>based on portfolio size');
content = content.replace('<b>48 hour delivery</b>scan to live tour', '<b>30% deposit</b>locks in your dates');
content = content.replace('Who uses Virtual Tours?', 'Who uses Portfolio Packages?');

fs.writeFileSync('index.html', content);

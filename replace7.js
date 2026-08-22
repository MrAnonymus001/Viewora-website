const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Replace box headings
content = content.replace(/<div class="name">Car rentals<\/div>/g, '<div class="name">Car rental marketplaces</div>');
content = content.replace(/<div class="name">Fleet managers<\/div>/g, '<div class="name">Enterprise facilities</div>');

fs.writeFileSync('index.html', content);

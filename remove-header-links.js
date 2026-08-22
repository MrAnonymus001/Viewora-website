const fs = require('fs');
let lines = fs.readFileSync('index.html', 'utf8').split('\n');

let openMobile = 0;
let openDesktop = 0;
let replacedCount = 0;

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('<a href="#">')) {
    lines[i] = lines[i].replace('<a href="#">', '<div style="display: block; cursor: default; margin-bottom: 15px; color: inherit;">');
    openMobile++;
    replacedCount++;
  }
  else if (openMobile > 0 && lines[i].includes('</a>')) {
    lines[i] = lines[i].replace('</a>', '</div>');
    openMobile--;
  }
  
  if (lines[i].includes('<a href="#" class="Header-nav-folder-item">')) {
    lines[i] = lines[i].replace('<a href="#" class="Header-nav-folder-item">', '<div class="Header-nav-folder-item" style="cursor: default; text-decoration: none;">');
    openDesktop++;
    replacedCount++;
  }
  else if (openDesktop > 0 && lines[i].includes('</a>')) {
    lines[i] = lines[i].replace('</a>', '</div>');
    openDesktop--;
  }
}

fs.writeFileSync('index.html', lines.join('\n'), 'utf8');
console.log(`Done. Replaced ${replacedCount} dropdown items in the header.`);

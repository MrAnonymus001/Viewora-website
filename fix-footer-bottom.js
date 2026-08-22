const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const regex = /<div class="Footer-bottom clear">[\s\S]*?<div class="socialaccounts-block">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

const replacement = `<div class="Footer-bottom clear">
      <p>
        Made with ♥ in Pakistan.<br>
        © 2026 Viewora. All rights reserved.
      </p>
    </div>`;

html = html.replace(regex, replacement);

fs.writeFileSync('index.html', html, 'utf-8');
console.log("Changes applied successfully.");

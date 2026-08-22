const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Read and base64-encode the Viewora logo (PNG)
const logoData = fs.readFileSync('viewora-logo.png');
const logob64 = 'data:image/png;base64,' + logoData.toString('base64');

// 1. Replace HEADER logo (Header-branding-logo)
// Original: <img src="...keynest-logo-apng.png" alt="KeyNest - Smart Key Exchange" class="Header-branding-logo" />
html = html.replace(
  /<img\s+src="[^"]*keynest-logo-apng\.png"\s+alt="[^"]*"\s+class="Header-branding-logo"\s*\/>/,
  `<img src="${logob64}" alt="Viewora" class="Header-branding-logo" style="height:auto;width:auto;" />`
);

// 2. Replace MOBILE BAR logo (Mobile-bar-branding-logo)
html = html.replace(
  /<img\s+src="[^"]*keynest-logo-apng\.png"\s+alt="[^"]*"\s+class="Mobile-bar-branding-logo"\s*\/>/,
  `<img src="${logob64}" alt="Viewora" class="Mobile-bar-branding-logo" style="height:auto;width:auto;" />`
);

// 3. Replace FOOTER logo — keep exact size via width/height from existing img, just swap src
// Original: <img alt="Logo" src="...logo-footer.svg">
html = html.replace(
  /<img\s+alt="Logo"\s+src="[^"]*logo-footer\.svg">/,
  `<img alt="Logo" src="${logob64}" style="width:auto;height:auto;max-height:inherit;">`
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('All logo replacements done.');

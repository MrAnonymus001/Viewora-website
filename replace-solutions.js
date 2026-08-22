const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The 5 boxes in order as they appear in the UI:
// 1. Airbnb hosts       -> data-solution="airbnb-hosts"
// 2. Mid-term rentals   -> data-solution="mid-term-rental"
// 3. Property managers  -> data-solution="property-managers"
// 4. Social housing     -> data-solution="social-housing"
// 5. Short-term rental  -> data-solution="short-term-rental"

const mapping = [
  { file: 'sol-1.jpg', solution: 'airbnb-hosts' },
  { file: 'sol-2.jpg', solution: 'mid-term-rental' },
  { file: 'sol-3.jpg', solution: 'property-managers' },
  { file: 'sol-4.jpg', solution: 'social-housing' },
  { file: 'sol-5.jpg', solution: 'short-term-rental' },
];

for (const { file, solution } of mapping) {
  const imgData = fs.readFileSync(file);
  const b64 = 'data:image/jpeg;base64,' + imgData.toString('base64');

  // Replace src and srcset on the img tag that has data-solution="<solution>"
  // Pattern: <img src="..." srcset="..." alt="" data-solution="airbnb-hosts">
  const regex = new RegExp(
    `(<img )src="[^"]*"( srcset="[^"]*")( alt="" data-solution="${solution}")`,
    'g'
  );
  html = html.replace(regex, `$1src="${b64}"$2$3`);

  // Also replace the srcset value for that specific img
  const regex2 = new RegExp(
    `(src="${b64.substring(0, 30)}[^"]*" )srcset="[^"]*"( alt="" data-solution="${solution}")`,
    'g'
  );
  html = html.replace(regex2, `$1srcset="${b64}"$2`);

  console.log(`Replaced image for data-solution="${solution}"`);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('All 5 solution images replaced successfully.');

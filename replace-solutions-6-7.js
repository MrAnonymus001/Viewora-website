const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const mapping = [
  { file: 'sol-6.jpg', solution: 'spare-key-holding' },
  { file: 'sol-7.jpg', solution: 'friends-family-pet-sitters' }
];

for (const { file, solution } of mapping) {
  const imgData = fs.readFileSync(file);
  const b64 = 'data:image/jpeg;base64,' + imgData.toString('base64');

  const regex = new RegExp(`(<img )src="[^"]*"( srcset="[^"]*")( alt="" data-solution="${solution}")`, 'g');
  html = html.replace(regex, `$1src="${b64}"$2$3`);

  const regex2 = new RegExp(`(src="${b64.substring(0, 30)}[^"]*" )srcset="[^"]*"( alt="" data-solution="${solution}")`, 'g');
  html = html.replace(regex2, `$1srcset="${b64}"$2`);

  console.log(`Replaced image for data-solution="${solution}"`);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Images 6 and 7 replaced successfully.');

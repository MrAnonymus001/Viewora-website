const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Fix the footer logo — replace the current style with a strict size constraint
// The original KeyNest footer logo (bird + text SVG) was approximately 40px tall.
// We constrain height to 40px and width to auto to maintain aspect ratio.
// We use a regex that matches the current inline base64 footer logo img tag.
html = html.replace(
  /(<img alt="Logo" src="data:image\/png;base64,[^"]*")( style="[^"]*")?>/,
  '$1 style="height:40px;width:auto;">'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Footer logo size fixed to 40px height.');

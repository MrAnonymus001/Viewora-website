const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Replace headline
content = content.replace(
    '<h1>Use our network<br>to capture your property</h1>',
    '<h1>Use our network<br>to capture the<br>property</h1>'
);

// Replace section title
content = content.replace(
    'Who uses Viewora Scans?',
    'Who uses Virtual Tours?'
);

// Replace subheading
content = content.replace(
    '<p>Our vetted local operators scan your property with professional equipment. We handle scheduling and delivery, so you get a polished tour without lifting a camera.</p>',
    '<p>Our vetted local operators scan your property with pro equipment. We handle scheduling and delivery for a polished ready-to-use tour.</p>'
);

fs.writeFileSync('index.html', content);

const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Replace left nav text (only the exact one)
content = content.replace('<div class="copy">Private Lockers</div>', '<div class="copy">Viewora Scans</div>');

// Replace stats texts
content = content.replace('<b>Every 6 seconds</b>a key is collected', '<b>5+ States</b>FL, TX, CA, NC, OH & more');
content = content.replace('<b>All-steel construction</b>total peace of mind', '<b>48-hour delivery</b>scan to live tour');

// Replace icons
const mapPinIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>';
const timerIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/></svg>';

content = content.replace('<img src="https://static1.squarespace.com/static/ta/5c8b7156b10f253f8ba41f04/7340/assets/blocks/home/products/stats/key-exchange.svg" alt="">', mapPinIcon);
content = content.replace('<img src="https://static1.squarespace.com/static/ta/5c8b7156b10f253f8ba41f04/7340/assets/blocks/home/products/stats/security.svg" alt="">', timerIcon);

// Replace headline
content = content.replace('<h1>Buy your own 24/7 key locker</h1>', '<h1>Use our network<br>to capture your property</h1>');

// Replace subheading
content = content.replace(
    '<p>Install your own KeyNest Locker on-site. Allow your team and customers to pick up and drop off your keys 24/7 with no staff needed.</p>',
    '<p>Our vetted local operators scan your property with professional equipment. We handle scheduling and delivery, so you get a polished tour without lifting a camera.</p>'
);

// Replace section title
content = content.replace('Who uses KeyNest Private Lockers?', 'Who uses Viewora Scans?');

fs.writeFileSync('index.html', content);

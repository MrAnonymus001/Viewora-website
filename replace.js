const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Replace "We're rated Excellent on trustpilot!"
content = content.replace(/We're rated Excellent on <span role="link" tabindex="0" onclick="event.stopPropagation\(\); window.open\('https:\/\/uk.trustpilot.com\/review\/keynest.com', '_blank'\)">Trustpilot!<\/span>/g, 'Get a Tour that speaks for itself!');

// Replace "Vacation Rentals"
content = content.replace(/<div class="name">Vacation Rentals<\/div>/g, '<div class="name">Social housing</div>');

// Replace "None of these use cases fit you?"
content = content.replace(/None of these use cases fit you\?/g, "Don't see your business type?");

fs.writeFileSync('index.html', content);

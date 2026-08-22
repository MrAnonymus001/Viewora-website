const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// The exact string to replace
const targetStr = "We're rated Excellent on <span role=\"link\" tabindex=\"0\" onclick=\"event.stopPropagation(); window.open(this.dataset.href, '_blank', 'noopener'); return false;\" data-href=\"https://www.trustpilot.com/review/keynest.com\">Trustpilot!</span>";
const newStr = "Get a Tour that speaks for itself!";

content = content.replaceAll(targetStr, newStr);

fs.writeFileSync('index.html', content);

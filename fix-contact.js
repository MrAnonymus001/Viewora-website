const fs = require('fs');

let html = fs.readFileSync('contact.html', 'utf8');
const before = html;

// ── Fix 1: Headline apostrophe encoding ──────────────────────────────────────
// The curly apostrophe (U+2019 = \u2019) renders as â€™ in Latin-1 interpreted browsers
// Replace with a straight apostrophe so it always renders correctly
html = html.replace(
  `We\u2019re here to help`,
  `We're here to help`
);

// ── Fix 2: Remove the Chat container ─────────────────────────────────────────
// The chat block is: <div class="link"><a href="javascript:Tawk_API.toggle()">...</a></div>
// It is the FIRST <div class="link"> inside <div class="method">
// We match the specific chat link by its unique href
const chatBlockRegex = /\t\t\t\t\t\t\t\t\t\t<div class="link">\s*\n\s*<a href="javascript:Tawk_API\.toggle\(\)"[\s\S]*?<\/a>\s*\n\s*<\/div>/;
html = html.replace(chatBlockRegex, '');

// ── Fix 3: Add CSS so remaining 2 boxes (Call + Write) fill space evenly ─────
// Inject a style block right before </head> or at the end of the <style> block
const layoutOverride = `<style>
/* Override: 2 contact boxes fill full width evenly after Chat removal */
#other-contact-us-block .method {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
#other-contact-us-block .method .link,
#other-contact-us-block .method .email {
  flex: 1 1 calc(50% - 20px);
  max-width: calc(50% - 20px);
  min-width: 260px;
  box-sizing: border-box;
}
</style>`;

html = html.replace('</head>', layoutOverride + '\n</head>');

if (html === before) {
  console.log('WARNING: No changes detected — patterns may not have matched.');
} else {
  fs.writeFileSync('contact.html', html, 'utf8');
  console.log('Done:');
  console.log('  1. Headline apostrophe fixed');
  console.log('  2. Chat container removed');
  console.log('  3. Layout CSS added for 2-column Call + Write boxes');
}

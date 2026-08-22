const fs = require('fs');

// ── Extract the nav bar from index.html ────────────────────────────────────
// The nav bar is both header blocks: Header--top (mobile) and Header--bottom (desktop)
// Everything from the first <header class="Header Header--top"> to the closing </header>
// of the second block (Header--bottom). We'll use the surrounding wrapper.

let indexHtml = fs.readFileSync('index.html', 'utf8');

// The nav bar lives inside a wrapper div. We capture both header blocks together.
// Pattern: from <header class="Header Header--top"> ... to the end of the second </header>
// We'll capture them as one unit by matching the first opening to the second closing </header>

const navBarRegex = /(<header class="Header Header--top">[\s\S]*?<\/header>\s*\n\s*\n[\s\S]*?<header class="Header Header--bottom[\s\S]*?<\/header>)/;
const match = indexHtml.match(navBarRegex);

if (!match) {
  console.log('ERROR: Could not extract nav bar from index.html');
  process.exit(1);
}

const newNavBar = match[1];
console.log(`Extracted nav bar from index.html (${newNavBar.length} chars)`);

// ── Replace in about.html ──────────────────────────────────────────────────
['about.html', 'contact.html'].forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`WARNING: ${file} not found. Skipping.`);
    return;
  }

  let html = fs.readFileSync(file, 'utf8');

  // Match the equivalent nav bar in the target file (same pattern but may have extra attrs)
  const targetNavRegex = /(<header class="Header Header--top">[\s\S]*?<\/header>[\s\S]*?<header class="Header Header--bottom[\s\S]*?<\/header>)/;
  const targetMatch = html.match(targetNavRegex);

  if (!targetMatch) {
    console.log(`ERROR: Could not find nav bar in ${file}`);
    return;
  }

  const replaced = html.replace(targetNavRegex, newNavBar);

  if (replaced === html) {
    console.log(`WARNING: No change made to ${file} (pattern identical or not found)`);
    return;
  }

  fs.writeFileSync(file, replaced, 'utf8');
  console.log(`Done: Nav bar synced to ${file}`);
});

console.log('\nAll done.');

const fs = require('fs');

// ── Step 1: Fix index.html ──────────────────────────────────────────────────
let html = fs.readFileSync('index.html', 'utf8');
const before = html;

// Replace the onclick-based About us link with an ID'd link + target="_blank"
html = html.replace(
  `<a href="#" onclick="window.open(window.location.href.replace(/[^\\/]*$/, '') + 'about.html', '_blank'); return false;">About us</a>`,
  `<a id="footer-about-link" href="#" target="_blank">About us</a>`
);

// Replace the onclick-based Contact us link with an ID'd link + target="_blank"
html = html.replace(
  `<a href="#" onclick="window.open(window.location.href.replace(/[^\\/]*$/, '') + 'contact.html', '_blank'); return false;">Contact us</a>`,
  `<a id="footer-contact-link" href="#" target="_blank">Contact us</a>`
);

// Inject a tiny JS snippet just before </footer> that sets the real hrefs at runtime
const fixScript = `<script>
(function() {
  var base = window.location.href.replace(/[^\\/]*$/, '');
  var a = document.getElementById('footer-about-link');
  var c = document.getElementById('footer-contact-link');
  if (a) a.href = base + 'about.html';
  if (c) c.href = base + 'contact.html';
})();
</script>`;

// Insert right before </footer>
html = html.replace('</footer>', fixScript + '\n</footer>');

if (html === before) {
  console.log('ERROR: patterns not found in index.html — no changes made.');
  process.exit(1);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done: Fixed footer links in index.html.');

// ── Step 2: Sync the same footer to about.html and contact.html ─────────────
function replaceFooter(sourceFile, targetFiles) {
  let sourceHtml = fs.readFileSync(sourceFile, 'utf8');
  const footerRegex = /(<footer class="Footer"[\s\S]*?<\/footer>)/i;
  const sourceFooterMatch = sourceHtml.match(footerRegex);

  if (!sourceFooterMatch) {
    console.log(`ERROR: Could not find footer in ${sourceFile}`);
    return;
  }

  const newFooter = sourceFooterMatch[1];
  console.log(`Extracted updated footer from ${sourceFile}.`);

  targetFiles.forEach(file => {
    if (!fs.existsSync(file)) {
      console.log(`WARNING: ${file} not found. Skipping.`);
      return;
    }
    let targetHtml = fs.readFileSync(file, 'utf8');
    let replacedHtml = targetHtml.replace(footerRegex, newFooter);

    if (replacedHtml !== targetHtml) {
      fs.writeFileSync(file, replacedHtml, 'utf8');
      console.log(`Done: Synced footer to ${file}.`);
    } else {
      console.log(`WARNING: Footer not found/replaced in ${file}.`);
    }
  });
}

replaceFooter('index.html', ['about.html', 'contact.html']);
console.log('\nAll done. Footer links fixed across index.html, about.html, and contact.html.');

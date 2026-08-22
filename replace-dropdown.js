const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// ─── REPLACEMENT 1: HEADER NAV (desktop) ──────────────────────────────────────
// Structure: <div class="name">X <span class="tag">Y</span></div><div class="desc">Z</div>
const headerOld = /<a href="\/key-holding-stores" class="Header-nav-folder-item">[\s\S]*?<\/a>\s*<a href="\/electronic-key-locker" class="Header-nav-folder-item">[\s\S]*?<\/a>\s*<a href="\/key-management-software-office" class="Header-nav-folder-item">[\s\S]*?<\/a>\s*<a href="\/guestcare" class="Header-nav-folder-item">[\s\S]*?<\/a>/;

const headerNew = `<a href="#" class="Header-nav-folder-item">
\t\t\t<div class="name">Viewora Scans <span class="tag">Single property</span></div>
\t\t\t<div class="desc">Book a Matterport scan for one property. We handle scheduling, capture and delivery hosted and ready to share in 48 hours.</div>
\t\t</a>
\t\t<a href="#" class="Header-nav-folder-item">
\t\t\t<div class="name">Portfolio Packages <span class="tag">Multi-property</span></div>
\t\t\t<div class="desc">Book scans across your entire portfolio in one request. Batch pricing, one timeline, every tour delivered together.</div>
\t\t</a>
\t\t<a href="#" class="Header-nav-folder-item">
\t\t\t<div class="name">Full-Service Delivery <span class="tag">End-to-end</span></div>
\t\t\t<div class="desc">Our team coordinates your operator, checks tour quality and manages the whole process from booking to live delivery.</div>
\t\t</a>`;

if (headerOld.test(html)) {
  html = html.replace(headerOld, headerNew);
  console.log('Header (desktop) Products dropdown replaced.');
} else {
  console.log('WARNING: Header dropdown pattern not found.');
}

// ─── REPLACEMENT 2: MOBILE NAV ────────────────────────────────────────────────
// Structure: <div class="name">X</div><div class="tag">Y</div><div class="desc">Z</div>
const mobileOld = /<a href="\/key-holding-stores">[\s\S]*?<div class="name">KeyNest Points<\/div>[\s\S]*?<\/a>\s*<a href="\/electronic-key-locker">[\s\S]*?<\/a>\s*<a href="\/key-management-software-office">[\s\S]*?<\/a>\s*<a href="\/guestcare">[\s\S]*?<\/a>/;

const mobileNew = `<a href="#">
\t\t\t<div class="name">Viewora Scans</div>
\t\t\t<div class="tag">Single property</div>
\t\t\t<div class="desc">Book a Matterport scan for one property. We handle scheduling, capture and delivery hosted and ready to share in 48 hours.</div>
\t\t</a>
\t\t<a href="#">
\t\t\t<div class="name">Portfolio Packages</div>
\t\t\t<div class="tag">Multi-property</div>
\t\t\t<div class="desc">Book scans across your entire portfolio in one request. Batch pricing, one timeline, every tour delivered together.</div>
\t\t</a>
\t\t<a href="#">
\t\t\t<div class="name">Full-Service Delivery</div>
\t\t\t<div class="tag">End-to-end</div>
\t\t\t<div class="desc">Our team coordinates your operator, checks tour quality and manages the whole process from booking to live delivery.</div>
\t\t</a>`;

if (mobileOld.test(html)) {
  html = html.replace(mobileOld, mobileNew);
  console.log('Mobile Products dropdown replaced.');
} else {
  console.log('WARNING: Mobile dropdown pattern not found.');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done.');

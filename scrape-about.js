const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to about page...');
  await page.goto('https://keynest.com/about-us', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  // Wait a bit for any lazy content
  await new Promise(r => setTimeout(r, 3000));

  const html = await page.content();
  fs.writeFileSync('about.html', html, 'utf-8');
  console.log('about.html saved! Size:', html.length, 'bytes');

  await browser.close();
})();

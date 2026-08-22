const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://keynest.com', { waitUntil: 'networkidle2' });

  // Extract data from the page
  const inspectionData = await page.evaluate(() => {
    const getStyles = (element, ...properties) => {
      const style = window.getComputedStyle(element);
      const result = {};
      properties.forEach(prop => {
        result[prop] = style[prop];
      });
      return result;
    };

    const sections = [];
    const sectionElements = document.querySelectorAll('section, header, footer, .sqs-block');
    
    // To avoid too much data, we'll just summarize the overall page styles and structure
    const bodyStyles = getStyles(document.body, 'background-color', 'color', 'font-family', 'font-size', 'line-height');
    
    // Get unique colors used
    const colors = new Set();
    const bgColors = new Set();
    const fontFamilies = new Set();
    
    document.querySelectorAll('*').forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.color && style.color !== 'rgba(0, 0, 0, 0)' && style.color !== 'transparent') colors.add(style.color);
      if (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent') bgColors.add(style.backgroundColor);
      if (style.fontFamily) fontFamilies.add(style.fontFamily);
    });

    // Basic Structure
    let structure = "";
    document.querySelectorAll('section').forEach((sec, index) => {
        structure += `Section ${index + 1}: ${sec.className}\n`;
        const h1s = sec.querySelectorAll('h1');
        const h2s = sec.querySelectorAll('h2');
        if (h1s.length > 0) structure += `  H1: ${h1s[0].innerText.substring(0, 50).replace(/\n/g, " ")}\n`;
        if (h2s.length > 0) structure += `  H2: ${h2s[0].innerText.substring(0, 50).replace(/\n/g, " ")}\n`;
    });

    return {
      bodyStyles,
      colors: Array.from(colors),
      bgColors: Array.from(bgColors),
      fontFamilies: Array.from(fontFamilies),
      structure
    };
  });

  fs.writeFileSync('inspection_report.json', JSON.stringify(inspectionData, null, 2));

  await browser.close();
})();

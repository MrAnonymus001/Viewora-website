const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// 1. Remove the injected <style> block for Footer-middle
html = html.replace(/<style>\s*\.Footer-middle \{[\s\S]*?<\/style>\s*(?=<footer)/, '');

// 2. Re-arrange and add the 4th column
const middleRegex = /<div class="Footer-middle clear">\s*([\s\S]*?)<\/div>\s*<div class="Footer-bottom clear">/;
const match = html.match(middleRegex);
if (match) {
    let middleContent = match[1];
    const colRegex = /<div class="Footer-menu-column">[\s\S]*?<\/div>/g;
    const columns = middleContent.match(colRegex);
    if (columns && columns.length >= 3) {
        // Find columns by their headers
        const viewora = columns.find(c => c.includes('<b>Viewora</b>')) || columns[0];
        const products = columns.find(c => c.includes('<b>Products</b>')) || columns[1];
        const usecases = columns.find(c => c.includes('<b>Use cases</b>')) || columns[2];
        
        // Construct the Resources column
        const resources = `<div class="Footer-menu-column">

	
	<b>Resources</b>

	
	<a href="#">KeyNest Points FAQs</a>
	<a href="#">KeyNest Lockers FAQs</a>
	<a href="#">KeyNest Cloud FAQs</a>
	<a href="#">Guestcare FAQs</a>
	<a href="#">Integrations</a>
	<a href="#">API docs</a>
	<a href="#">System Status</a>
	<a href="#">Press</a>
	<a href="#">Terms &amp; Privacy</a>
</div>`;

        // Reorder to match original: Use cases, Products, Viewora, Resources
        const newMiddleContent = `\n      ${usecases}\n\n${products}\n\n${viewora}\n\n${resources}\n    `;
        
        html = html.replace(middleContent, newMiddleContent);
        fs.writeFileSync('index.html', html, 'utf-8');
        console.log("Successfully restored 4 columns and original CSS!");
    } else {
        console.log("Could not extract columns properly.");
    }
} else {
    console.log("Could not find Footer-middle clear.");
}

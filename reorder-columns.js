const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// Regex to capture each column. The columns start with <div class="Footer-menu-column"> and end with </div>.
// Because there are exactly 3 columns inside <div class="Footer-middle clear">, we can match them.
const middleRegex = /<div class="Footer-middle clear">\s*([\s\S]*?)<\/div>\s*<div class="Footer-bottom clear">/;

const match = html.match(middleRegex);
if (match) {
    let middleContent = match[1];
    
    // Split by <div class="Footer-menu-column">
    // Since each column is wrapped in this div, we can extract them.
    const colRegex = /<div class="Footer-menu-column">[\s\S]*?<\/div>/g;
    const columns = middleContent.match(colRegex);
    
    if (columns && columns.length === 3) {
        const useCases = columns[0];
        const products = columns[1];
        const viewora = columns[2];
        
        // Reorder: Viewora, Products, Use cases
        const newMiddleContent = `\n      ${viewora}\n\n${products}\n\n${useCases}\n\n    `;
        
        // Replace in original html
        html = html.replace(middleContent, newMiddleContent);
        
        fs.writeFileSync('index.html', html, 'utf-8');
        console.log("Successfully reordered columns.");
    } else {
        console.log("Could not find exactly 3 columns. Found: " + (columns ? columns.length : 0));
    }
} else {
    console.log("Could not find Footer-middle block.");
}

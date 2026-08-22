const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const middleRegex = /(<div class="Footer-middle clear">[\s\S]*?<\/div>\s*<div class="Footer-bottom clear">)/;
const match = html.match(middleRegex);

if (match) {
    let block = match[1];
    const colRegex = /<div class="Footer-menu-column">[\s\S]*?<\/div>/g;
    const columns = block.match(colRegex);

    if (columns && columns.length === 4) {
        const col1 = columns[0]; // Use cases
        const col2 = columns[1]; // Products
        const col3 = columns[2]; // Viewora
        const col4 = columns[3]; // States we serve

        // Swap col1 and col3: new order is Viewora, Products, Use cases, States we serve
        const newBlock = block
            .replace(col1, '##COL3##')
            .replace(col2, '##COL2##')
            .replace(col3, '##COL1##')
            .replace(col4, '##COL4##')
            .replace('##COL1##', col1)
            .replace('##COL2##', col2)
            .replace('##COL3##', col3)
            .replace('##COL4##', col4);

        html = html.replace(block, newBlock);
        console.log("Columns swapped successfully.");
    } else {
        console.log("Could not find exactly 4 columns. Found: " + (columns ? columns.length : 0));
    }
} else {
    console.log("Could not find Footer-middle block.");
}

// Fix the garbled heart symbol
html = html.replace(/Made with [^\s<]*\s*in USA\./g, 'Made with ♥ in USA.');

fs.writeFileSync('index.html', html, 'utf-8');
console.log("Heart symbol fixed.");

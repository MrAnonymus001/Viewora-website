const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Remove the left nav item
const navItemRegex = /<a href="#keynest-cloud" class="item">[\s\S]*?<div class="copy">KeyNest Cloud<\/div>\s*<\/a>/;
content = content.replace(navItemRegex, '');

// 2. Remove the keynest-cloud product block
const productBlockRegex = /<div id="keynest-cloud" class="product">[\s\S]*?<\/div>\s*<!-- End of keynest-cloud -->/;
// Wait, the HTML doesn't have an end comment. Let's look for a specific string at the end to match robustly.
// The block ends right before <div id="section-u-Spacer" ... or <script defer="true" ...
// A better way is to use a specific string replacement based on lines.

const startIndexNav = content.indexOf('<a href="#keynest-cloud" class="item">');
const endIndexNav = content.indexOf('</a>', startIndexNav) + 4;
if(startIndexNav !== -1) {
    content = content.substring(0, startIndexNav) + content.substring(endIndexNav);
}

const startIndexProduct = content.indexOf('<div id="keynest-cloud" class="product">');
const endIndexProduct = content.indexOf('</section>', startIndexProduct); 
// Wait, the <section> closes after <div class="products-group"> and <div id="products-block"> and <div class="Index-page-content">.
// So the structure is:
// <div id="keynest-cloud" class="product">
// ...
// </div> (this closes the product div)
// </div> (this closes the products-group div)
// </div> (this closes the products-block div)
// </div> (this closes the Index-page-content div)
// </section>

// I will just find the exact closing tag index by counting div nesting.
function getEndIndex(str, startIndex) {
    let count = 0;
    let i = startIndex;
    while (i < str.length) {
        if (str.substring(i, i + 4) === '<div') {
            count++;
        } else if (str.substring(i, i + 6) === '</div>') {
            count--;
            if (count === 0) {
                return i + 6;
            }
        }
        i++;
    }
    return -1;
}

if(startIndexProduct !== -1) {
    let endIndex = getEndIndex(content, startIndexProduct);
    if(endIndex !== -1) {
        content = content.substring(0, startIndexProduct) + content.substring(endIndex);
    }
}

fs.writeFileSync('index.html', content);

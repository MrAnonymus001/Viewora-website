const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

// The start is at <section id="section-about-Testimonials-small" class="Index-page">
// which is where the previous incorrect deletion stopped. 
// I'll backtrack slightly to the spacer before it to clean up.
const startIndexStr = '<section id="section-about-Testimonials-small" class="Index-page">';
let startIndex = html.indexOf(startIndexStr);
if (startIndex === -1) {
    console.log('Error: Could not find start index.');
    process.exit(1);
}

// Let's back up to the spacer right above it if it exists.
const spacerStr = '<section id="section-u-Spacer" class="Index-page">\r\n  <div class="Index-page-content">\r\n  </div>\r\n</section>';
const spacerIndex = html.lastIndexOf(spacerStr, startIndex);
if (spacerIndex !== -1 && (startIndex - spacerIndex < 200)) {
    startIndex = spacerIndex;
}

// The end is the exact script block of the siema-awards carousel.
const endScriptStr = 'keynest_features_2_interval = setInterval(() => !document.hidden && keynest_features1.next(), 15000);\r\n\t});\r\n</script>';
let endIndex = html.indexOf(endScriptStr, startIndex);
if (endIndex === -1) {
    // Try \n instead of \r\n
    const endScriptStr2 = 'keynest_features_2_interval = setInterval(() => !document.hidden && keynest_features1.next(), 15000);\n\t});\n</script>';
    endIndex = html.indexOf(endScriptStr2, startIndex);
    if (endIndex !== -1) {
        endIndex += endScriptStr2.length;
    }
} else {
    endIndex += endScriptStr.length;
}

if (endIndex === -1) {
    console.log('Error: Could not find end index. Please debug the exact string.');
    process.exit(1);
}

const deletedSection = html.substring(startIndex, endIndex);
console.log('Deleting ' + deletedSection.length + ' characters.');

const newHtml = html.substring(0, startIndex) + html.substring(endIndex);
fs.writeFileSync('about.html', newHtml, 'utf8');
console.log('Successfully deleted the rest of the sections.');

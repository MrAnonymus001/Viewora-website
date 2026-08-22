const fs = require('fs');

function replaceFooter(sourceFile, targetFiles) {
    let sourceHtml = fs.readFileSync(sourceFile, 'utf8');
    
    // Extract the footer from source using a robust regex
    const footerRegex = /(<footer class="Footer"[^>]*>[\s\S]*?<\/footer>)/i;
    const sourceFooterMatch = sourceHtml.match(footerRegex);
    
    if (!sourceFooterMatch) {
        console.log(`ERROR: Could not find footer in ${sourceFile}`);
        return;
    }
    
    const newFooter = sourceFooterMatch[1];
    console.log(`Successfully extracted footer from ${sourceFile} (length: ${newFooter.length} characters)`);

    targetFiles.forEach(file => {
        if (!fs.existsSync(file)) {
            console.log(`WARNING: ${file} does not exist. Skipping.`);
            return;
        }
        
        let targetHtml = fs.readFileSync(file, 'utf8');
        let replacedHtml = targetHtml.replace(footerRegex, newFooter);
        
        if (replacedHtml !== targetHtml) {
            fs.writeFileSync(file, replacedHtml, 'utf8');
            console.log(`Done: Replaced footer in ${file}`);
        } else {
            console.log(`WARNING: Could not find/replace footer in ${file} (or identical)`);
        }
    });
}

replaceFooter('index.html', ['about.html', 'contact.html']);

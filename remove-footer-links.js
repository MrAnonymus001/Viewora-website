const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
let newHtml = html;

function processColumn(content, colHeader) {
  // Find the block starting with <b>Header</b> until the next </div>
  const regex = new RegExp(`(<b>${colHeader}<\\/b>[\\s\\S]*?)(<\\/div>)`, 'i');
  return content.replace(regex, (match, p1, p2) => {
    // Replace all <a> tags with <div> inside this specific block
    let newLinks = p1.replace(/<a href="[^"]*"[^>]*>/g, '<div style="margin-bottom: 12px; color: inherit; cursor: default;">');
    newLinks = newLinks.replace(/<\/a>/g, '</div>');
    return newLinks + p2;
  });
}

newHtml = processColumn(newHtml, 'Products');
newHtml = processColumn(newHtml, 'Use cases');
newHtml = processColumn(newHtml, 'States we serve');

if (newHtml !== html) {
  fs.writeFileSync('index.html', newHtml, 'utf8');
  console.log('Done: Links successfully removed from Products, Use cases, and States we serve columns.');
} else {
  console.log('ERROR: Could not find columns to replace.');
}

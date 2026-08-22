const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const aboutHtml = fs.readFileSync('about.html', 'utf8');

// The regex to find the style + section block in index.html
const sectionRegexIndex = /<style>\s*#section-u-Sign-Up[\s\S]*?<\/section>/;
const matchIndex = indexHtml.match(sectionRegexIndex);
if (!matchIndex) {
    console.log('Could not find the section in index.html');
    process.exit(1);
}
const replacementHtml = matchIndex[0];
console.log('Found replacement HTML in index.html, length: ' + replacementHtml.length);

// The regex to find the section block in about.html
// Note: there is no style block for this section in the current about.html, just the section tag.
const sectionRegexAbout = /<section id="section-u-Sign-Up" class="Index-page">[\s\S]*?<\/section>/;
const matchAbout = aboutHtml.match(sectionRegexAbout);
if (!matchAbout) {
    console.log('Could not find the section in about.html');
    process.exit(1);
}
console.log('Found old HTML in about.html, length: ' + matchAbout[0].length);

const newAboutHtml = aboutHtml.replace(sectionRegexAbout, replacementHtml);

fs.writeFileSync('about.html', newAboutHtml, 'utf8');
console.log('Successfully replaced the banner in about.html!');

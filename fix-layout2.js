const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// The current style block in index.html is:
const old_style_block = `<style>
.Footer-middle {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 40px !important;
    width: 100% !important;
}
.Footer-menu-column {
    width: 100% !important;
    max-width: none !important;
    float: none !important;
    margin: 0 !important;
}
@media (max-width: 768px) {
    .Footer-middle {
        grid-template-columns: 1fr !important;
        gap: 20px !important;
    }
}
</style>`;

const new_style_block = `<style>
.Footer-middle {
    display: flex !important;
    justify-content: space-between !important;
    width: 100% !important;
}
.Footer-menu-column {
    /* Remove full width constraints so they naturally take up only the space they need,
       allowing space-between to push the outer columns to the absolute edges */
    max-width: none !important;
    float: none !important;
    margin: 0 !important;
}
/* Ensure the last column aligns correctly if they want it fully flush right */
/* .Footer-middle .Footer-menu-column:last-child {
    text-align: right;
} */
@media (max-width: 768px) {
    .Footer-middle {
        flex-direction: column !important;
        gap: 20px !important;
    }
}
</style>`;

html = html.replace(old_style_block, new_style_block);

fs.writeFileSync('index.html', html, 'utf-8');
console.log("Changes applied successfully.");

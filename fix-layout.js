const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

// The current style block in index.html is:
const old_style_block = `<style>
.Footer-middle {
    display: flex !important;
    justify-content: space-between !important;
    width: 100% !important;
}
.Footer-menu-column {
    flex: 1 1 33.33% !important;
    max-width: 33.33% !important;
    float: none !important;
}
@media (max-width: 768px) {
    .Footer-middle {
        flex-direction: column !important;
    }
    .Footer-menu-column {
        max-width: 100% !important;
    }
}
</style>`;

const new_style_block = `<style>
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

html = html.replace(old_style_block, new_style_block);

fs.writeFileSync('index.html', html, 'utf-8');
console.log("Changes applied successfully.");

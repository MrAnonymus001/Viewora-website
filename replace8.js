const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Change nav label "Guestcare" to "Full-Service Delivery" (only the products-block nav item, not all instances)
content = content.replace(
    '<a href="#guestcare" class="item">\n\t\t\t\t\t<img src="https://static1.squarespace.com/static/ta/5c8b7156b10f253f8ba41f04/7340/assets/blocks/home/products/switcher/Guestcare.svg" alt="">\n\t\t\t\t\t<div class="copy">Guestcare</div>\n\t\t\t\t</a>',
    '<a href="#guestcare" class="item">\n\t\t\t\t\t<img src="https://static1.squarespace.com/static/ta/5c8b7156b10f253f8ba41f04/7340/assets/blocks/home/products/switcher/Guestcare.svg" alt="">\n\t\t\t\t\t<div class="copy">Full-Service Delivery</div>\n\t\t\t\t</a>'
);

// 2. Fix body paragraph to exact requested text
content = content.replace(
    `<p>From booking to final delivery, we coordinate your operator, review every tour for quality, and host it live — so you're never chasing photographers, files, or follow-ups.</p>`,
    `<p>From booking to final delivery, we coordinate your operator, review every tour for quality and host it live so you're never chasing photographers, files or follow-ups.</p>`
);

fs.writeFileSync('index.html', content);

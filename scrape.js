const scrape = require('website-scraper').default;
const PuppeteerPlugin = require('website-scraper-puppeteer').default;
const path = require('path');

scrape({
    urls: ['https://keynest.com/'],
    directory: path.resolve(__dirname, 'dist'),
    plugins: [
        new PuppeteerPlugin({
            launchOptions: { headless: 'new' }, /* optional */
            scrollToBottom: { timeout: 10000, viewportN: 10 }, /* optional */
            blockNavigation: true, /* optional */
        })
    ],
    sources: [
        {selector: 'img', attr: 'src'},
        {selector: 'img', attr: 'data-src'},
        {selector: 'link[rel="stylesheet"]', attr: 'href'},
        {selector: 'script', attr: 'src'},
        {selector: 'source', attr: 'src'}
    ]
}).then((result) => {
    console.log("Website successfully downloaded");
}).catch((err) => {
    console.log("An error occurred", err);
});

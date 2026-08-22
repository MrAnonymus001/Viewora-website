const fs = require('fs');
let html = fs.readFileSync('about.html', 'utf8');

// Box 1
html = html.replace('KeyNest began in 2016 with 2 founders and a handful of KeyNest Points in central London. Today, the KeyNest cloud platform and its dense network of public and private KeyNest Lockers, powers the daily operations of tens of thousands of Airbnb property managers, corporate housing, letting agents, fleet managers, social housing, healthcare, and a growing number of public services across 30+ countries.', "Viewora started with a simple observation: in short-term rentals, listings with better photos get more bookings and a 3D tour beats photos every time. We built Viewora to make professional virtual tours accessible to property managers and hosts without the overhead of hiring an in-house team. Today we operate across 5 states, with local operators handling every scan and our team manage all of that from start to finish.");

// Box 2
html = html.replace('We are an innovative company, and our team is driven by one core principle at the heart of all of our offerings: to be that reliable partner that just sits in the background, quietly doing its job, saving you money, time, and especially, energy, so you can run your business without worrying about who has the keys, will they be there on time, are they safe, etc…?', "We're driven by one principle: make your listing impossible to scroll past. A tour should do the selling for you showing guests exactly what they're booking, before they ever ask a question.");

// Box 3
html = html.replace('Implementing a new key management system can be scary. In fact, 95% of our customers come to us recommended by an existing customer. So, if you’re in that 5% who hadn’t heard about KeyNest before, this page is for you.', "We don't work with hundreds of clients at once. Every scan gets scheduled personally, checked before delivery and handled by someone who knows your property not a queue.");

// Stat 1
html = html.replace(/<h1 class="counter" data-counter-target="12500000">0<\/h1>\s*<p>key movements<\/p>/, '<h1 class="counter" data-counter-target="5">0</h1>\n\t\t\t\t\t<p>States and growing</p>');

// Stat 2
html = html.replace(/<h1 class="counter" data-counter-target="800000">0<\/h1>\s*<p>keys managed<\/p>/, '<h1 class="counter" data-counter-target="48">0</h1>\n\t\t\t\t\t<p>Hours average delivery time</p>');

// Stat 3
html = html.replace(/<h1 class="counter" data-counter-target="300">0<\/h1>\s*<p>cities served<\/p>/, '<h1><span class="counter" data-counter-target="30">0</span>%</h1>\n\t\t\t\t\t<p>Deposit to lock in your scan date</p>');

fs.writeFileSync('about.html', html);
console.log('Done!');

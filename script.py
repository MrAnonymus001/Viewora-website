import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Top bar: Remove the UK country/flag selector dropdown.
html = re.sub(r'<div class="Footer-country-switcher">.*?</div>\s*</div>\s*<div class="Footer-middle clear">', '</div>\n\n    <div class="Footer-middle clear">', html, flags=re.DOTALL)

# 2. Column 1: Update Use cases list
new_col1 = '''<div class="Footer-menu-column">

	
	<b>Use cases</b>

	
	<a href="/airbnb-key-exchange">Airbnb hosts</a>
	<a href="/vacation-rental-managers">Serviced apartments</a>
	<a href="/estate-agent-key-tracking">Real estate brokerages</a>
	<a href="/mid-term-rentals">Mid-term rentals</a>
	<a href="/property-managers">Property managers</a>
	<a href="#">Vacation rental brands</a>
	<a href="#">Short-term rental managers</a>
	<a href="#">Co-living &amp; HMO rentals</a>
	<a href="/hotel-locker">Hotels</a>
	<a href="/auto-dealerships-and-garages-key-handling">Dealerships &amp; garages</a>
	<a href="#">Enterprise facilities</a>
</div>'''
html = re.sub(r'<div class="Footer-menu-column">\s*<b>Use cases</b>.*?</div>', new_col1, html, flags=re.DOTALL, count=1)

# 3. Column 2: Update Products list
new_col2 = '''<div class="Footer-menu-column">

	
	<b>Products</b>

	
	<a href="#">Viewora Scans <span class="tag">Single property</span></a>
	<a href="#">Portfolio Packages <span class="tag">Multi-property</span></a>
	<a href="#">Full-Service Delivery <span class="tag">End-to-end</span></a>

</div>'''
html = re.sub(r'<div class="Footer-menu-column">\s*<b>Products</b>.*?</div>', new_col2, html, flags=re.DOTALL, count=1)

# 4. Column 3: Update KeyNest -> Viewora and list
new_col3 = '''<div class="Footer-menu-column">

	
	<b>Viewora</b>

	
	<a href="/about-us">About us</a>
	<a href="/contact-us">Contact us</a>

</div>'''
html = re.sub(r'<div class="Footer-menu-column">\s*<b>KeyNest</b>.*?</div>', new_col3, html, flags=re.DOTALL, count=1)

# 5. Column 4: Remove Resources completely
html = re.sub(r'<div class="Footer-menu-column">\s*<b>Resources</b>.*?</div>', '', html, flags=re.DOTALL, count=1)

# 6. Layout adjustment: Add style to Footer-middle to distribute 3 columns evenly
style_block = '''<style>
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
</style>
'''
html = re.sub(r'(<footer class="Footer" role="contentinfo" data-controller="FooterBreakpoints">)', style_block + r'\1', html, count=1)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print("Changes applied successfully.")

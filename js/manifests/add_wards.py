import re

# Ward office entries to add to each manifest
WARD_ENTRIES = {
    'koshi-manifest.js': [
        "    { path: 'data/provinces/koshi/morang/katahari/katahari_ward_offices.json', province: 'koshi', district: 'morang', city: 'katahari', type: 'ward_offices' },",
        "    { path: 'data/provinces/koshi/morang/biratnagar_ward_offices.json', province: 'koshi', district: 'morang', city: 'biratnagar', type: 'ward_offices' },",
        "    { path: 'data/provinces/koshi/sunsari/dharan_ward_offices.json', province: 'koshi', district: 'sunsari', city: 'dharan', type: 'ward_offices' },",
        "    { path: 'data/provinces/koshi/sunsari/itahari_ward_offices.json', province: 'koshi', district: 'sunsari', city: 'itahari', type: 'ward_offices' },",
    ],
    'bagmati-manifest.js': [
        "    { path: 'data/provinces/bagmati/kathmandu/kathmandu_ward_offices.json', province: 'bagmati', district: 'kathmandu', city: 'kathmandu', type: 'ward_offices' },",
        "    { path: 'data/provinces/bagmati/lalitpur/lalitpur_ward_offices.json', province: 'bagmati', district: 'lalitpur', city: 'lalitpur', type: 'ward_offices' },",
        "    { path: 'data/provinces/bagmati/bhaktapur/bhaktapur_ward_offices.json', province: 'bagmati', district: 'bhaktapur', city: 'bhaktapur', type: 'ward_offices' },",
        "    { path: 'data/provinces/bagmati/chitwan/bharatpur_ward_offices.json', province: 'bagmati', district: 'chitwan', city: 'bharatpur', type: 'ward_offices' },",
        "    { path: 'data/provinces/bagmati/makwanpur/hetauda_ward_offices.json', province: 'bagmati', district: 'makwanpur', city: 'hetauda', type: 'ward_offices' },",
        "    { path: 'data/provinces/bagmati/kathmandu/kirtipur/kirtipur_ward_offices.json', province: 'bagmati', district: 'kathmandu', city: 'kirtipur', type: 'ward_offices' },",
    ],
    'madhesh-manifest.js': [
        "    { path: 'data/provinces/madhesh/parsa/birgunj/birgunj_ward_offices.json', province: 'madhesh', district: 'parsa', city: 'birgunj', type: 'ward_offices' },",
        "    { path: 'data/provinces/madhesh/dhanusha/janakpur/janakpur_ward_offices.json', province: 'madhesh', district: 'dhanusa', city: 'janakpur', type: 'ward_offices' },",
    ],
    'gandaki-manifest.js': [
        "    { path: 'data/provinces/gandaki/kaski/pokhara_ward_offices.json', province: 'gandaki', district: 'kaski', city: 'pokhara', type: 'ward_offices' },",
    ],
    'lumbini-manifest.js': [
        "    { path: 'data/provinces/lumbini/rupandehi/butwal/butwal_ward_offices.json', province: 'lumbini', district: 'rupandehi', city: 'butwal', type: 'ward_offices' },",
        "    { path: 'data/provinces/lumbini/banke/nepalgunj/nepalgunj_ward_offices.json', province: 'lumbini', district: 'banke', city: 'nepalgunj', type: 'ward_offices' },",
    ],
    'karnali-manifest.js': [
        "    { path: 'data/provinces/karnali/surkhet/birendranagar/birendranagar_ward_offices.json', province: 'karnali', district: 'surkhet', city: 'birendranagar', type: 'ward_offices' },",
    ],
    'sudurpashchim-manifest.js': [
        "    { path: 'data/provinces/sudurpashchim/kailali/dhangadhi/dhangadhi_ward_offices.json', province: 'sudurpashchim', district: 'kailali', city: 'dhangadhi', type: 'ward_offices' },",
    ],
}

for filename, entries in WARD_ENTRIES.items():
    with open(filename, 'r') as f:
        content = f.read()
    
    # Check if already added
    if 'ward_offices' in content:
        print(f"Skipping {filename} - already has ward_offices")
        continue
    
    # Find the last entry and add after it
    # Look for the closing bracket
    new_entries = '\n'.join(entries)
    
    # Replace the closing ]; with new entries + ];
    content = content.rstrip()
    if content.endswith('];'):
        content = content[:-2].rstrip() + ',\n' + new_entries + '\n];'
    
    with open(filename, 'w') as f:
        f.write(content)
    print(f"Updated {filename}")

print("\nDone!")

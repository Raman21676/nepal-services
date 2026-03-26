#!/bin/bash
# Manual deploy script for Nepal Services

echo "Building Nepal Services for Netlify..."

# Create a clean build directory
rm -rf build
mkdir -p build

# Copy all static files (Netlify doesn't need build step for static sites)
cp -r index.html styles.css app.js manifest.json service-worker.js favicon.svg sitemap*.xml robots.txt humans.txt ads.txt browserconfig.xml .htaccess images js data build/

echo "✅ Build complete!"
echo ""
echo "To deploy manually:"
echo "1. Go to https://app.netlify.com/drop"
echo "2. Drag and drop the 'build' folder"
echo ""

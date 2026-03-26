# 🚀 Migrate from Netlify to GitHub Pages

## Step 1: Delete Site from Netlify

### Method A: Through Netlify Dashboard (Recommended)
1. Go to https://app.netlify.com/
2. Click on your site **"gleaming-biscotti-b764c2"** (or nepalservice.online)
3. Go to **Site settings** (left sidebar)
4. Scroll down to **Danger zone**
5. Click **"Delete site"**
6. Type the site name to confirm
7. Click **"Delete"**

### Method B: If You Can't Access Dashboard
Since your account is suspended, you may need to:
1. Email Netlify support: support@netlify.com
2. Subject: "Request to delete site - Account suspended"
3. Provide: Site name (gleaming-biscotti-b764c2) and your email

---

## Step 2: Disconnect GitHub from Netlify

1. Go to https://github.com/settings/applications
2. Find **"Netlify"** in the list
3. Click **"Revoke access"**
4. Confirm the revocation

---

## Step 3: Prepare Repository for GitHub Pages

### Option A: Deploy from main branch (Simplest)

Create a new file `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Option B: Just enable GitHub Pages (No workflow needed)

1. Go to your GitHub repo
2. Settings → Pages
3. Source: Deploy from a branch
4. Branch: main / (root)
5. Click Save

---

## Step 4: Update Domain DNS (If you have custom domain)

If you own **nepalservice.online**:

### Update DNS Records:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |
| CNAME | www | YOUR_USERNAME.github.io | 3600 |

---

## Step 5: Update CNAME File

Create a file named `CNAME` in your repository root:

```
nepalservice.online
```

Or if using www:
```
www.nepalservice.online
```

---

## ✅ Verification Checklist

After migration:

- [ ] Site loads at `https://YOUR_USERNAME.github.io/nepal-services/`
- [ ] Or at your custom domain `https://nepalservice.online`
- [ ] All images load correctly
- [ ] Search functionality works
- [ ] Filters work properly

---

## 🚨 Important Notes

### GitHub Pages Limitations:
| Feature | Limit |
|---------|-------|
| Bandwidth | 100GB/month |
| Builds | 10/hour (soft limit) |
| Repository size | 1GB |
| File size | 100MB max |

### Your site is fine because:
- Static HTML/CSS/JS ✅
- No server-side code ✅
- Data loaded via JSON ✅

---

## 🔄 Quick Commands

```bash
# After making changes
git add .
git commit -m "Prepare for GitHub Pages deployment"
git push origin main

# GitHub Pages will auto-deploy!
```


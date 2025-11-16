# Deployment Guide

## Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the details:
   - **Repository name**: `bus-ticketing-app` (or any name you prefer)
   - **Description**: "Modern Bus Ticketing Website built with React.js"
   - **Visibility**: Public (required for assignment)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

## Step 2: Push Code to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/bus-ticketing-app.git

# Rename branch to main (if needed)
git branch -M main

# Push your code
git push -u origin main
```

**Or if you prefer SSH:**

```bash
git remote add origin git@github.com:YOUR_USERNAME/bus-ticketing-app.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel (Recommended - Easiest)

### Option A: Deploy via Vercel Website (Easiest)

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click **"Add New Project"**
4. Import your GitHub repository (`bus-ticketing-app`)
5. Vercel will auto-detect Vite settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **"Deploy"**
7. Your app will be live in ~2 minutes!
8. Copy the deployment URL (e.g., `https://bus-ticketing-app.vercel.app`)

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project directory)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? bus-ticketing-app
# - Directory? ./
# - Override settings? No

# For production deployment:
vercel --prod
```

## Step 4: Deploy to Netlify (Alternative)

### Option A: Deploy via Netlify Website

1. Go to [netlify.com](https://netlify.com)
2. Sign up/Login with your GitHub account
3. Click **"Add new site"** → **"Import an existing project"**
4. Select your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click **"Deploy site"**
7. Your app will be live in ~2 minutes!
8. Copy the deployment URL (e.g., `https://bus-ticketing-app.netlify.app`)

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build the project first
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

## Step 5: Update README with Live Link

After deployment, update your README.md to include:

```markdown
## 🌐 Live Demo

[View Live Application](https://your-deployment-url.vercel.app)
```

## Quick Commands Summary

```bash
# 1. Initialize Git (Already done ✓)
git init
git add .
git commit -m "Initial commit"

# 2. Create GitHub repo (Do this on GitHub website)
# Then run:
git remote add origin https://github.com/YOUR_USERNAME/bus-ticketing-app.git
git branch -M main
git push -u origin main

# 3. Deploy to Vercel (Easiest)
npm install -g vercel
vercel login
vercel --prod

# OR Deploy to Netlify
npm install -g netlify-cli
netlify login
npm run build
netlify deploy --prod --dir=dist
```

## Troubleshooting

### If you get authentication errors:

- Make sure you're logged into GitHub
- Use Personal Access Token if password doesn't work
- For SSH: Set up SSH keys on GitHub

### If build fails:

- Make sure `node_modules` is in `.gitignore` (it is ✓)
- Run `npm install` locally first to test
- Check that all dependencies are in `package.json`

### If deployment fails:

- Check build logs in Vercel/Netlify dashboard
- Ensure `dist` folder is being generated (`npm run build`)
- Verify `vite.config.js` is correct

## Next Steps After Deployment

1. ✅ Test the live application
2. ✅ Update README.md with live link
3. ✅ Submit the assignment form with:
   - GitHub repository URL
   - Live deployment URL
   - Any additional notes

---

**Need Help?** Check the deployment platform's documentation:

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)

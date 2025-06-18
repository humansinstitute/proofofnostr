# Deploying PoW Notes to GitHub Pages

This guide will help you deploy your PoW Notes Nostr client to GitHub Pages.

## Prerequisites

- A GitHub account
- Git installed on your computer
- Node.js installed (for local development)

## Step-by-Step Deployment

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right and select "New repository"
3. Name your repository (e.g., `pow-notes`, `nostr-pow-client`, etc.)
4. Make sure it's set to **Public** (GitHub Pages requires public repos for free accounts)
5. Don't initialize with README, .gitignore, or license (we already have these files)
6. Click "Create repository"

### 2. Push Your Code to GitHub

In your project directory, run these commands:

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: PoW Notes Nostr client"

# Add your GitHub repository as origin (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on the **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The workflow is already configured and will run automatically

### 4. Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You should see a "Deploy to GitHub Pages" workflow running
3. Wait for it to complete (usually takes 2-3 minutes)
4. Once complete, your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Configuration Details

The project is already configured for GitHub Pages deployment:

### Vite Configuration
- Automatically sets the correct base path for GitHub Pages
- Uses the repository name from the GitHub environment

### GitHub Actions Workflow
- Builds the project using Node.js 22
- Deploys to GitHub Pages automatically on every push to main
- Creates a 404.html file for client-side routing

### Manifest and SEO
- Web app manifest configured for PWA support
- SEO meta tags for social sharing
- Proper Open Graph tags

## Custom Domain (Optional)

If you want to use a custom domain:

1. In your repository settings, go to **Pages**
2. Under **Custom domain**, enter your domain name
3. Create a `CNAME` file in the `public/` directory with your domain name
4. Configure your DNS provider to point to `YOUR_USERNAME.github.io`

## Troubleshooting

### Build Fails
- Check the Actions tab for error details
- Ensure all dependencies are properly listed in `package.json`
- Make sure the build passes locally with `npm run build`

### Site Not Loading
- Check that GitHub Pages is enabled in repository settings
- Verify the workflow completed successfully
- Wait a few minutes for DNS propagation

### Assets Not Loading
- The Vite configuration automatically handles the base path
- If you see 404 errors for assets, check the browser console for the exact URLs

### Routing Issues
- The 404.html file handles client-side routing
- Make sure you're using React Router's `BrowserRouter` (already configured)

## Environment Variables

The deployment automatically handles:
- `GITHUB_REPOSITORY`: Used to set the correct base path
- `NODE_ENV`: Set to 'production' during build

## Updates

To update your deployed site:
1. Make changes to your code
2. Commit and push to the main branch
3. GitHub Actions will automatically rebuild and redeploy

```bash
git add .
git commit -m "Update: description of changes"
git push
```

## Performance Notes

The built site includes:
- Optimized React production build
- Compressed assets (gzip)
- Font subsetting for faster loading
- Efficient chunk splitting

Your PoW Notes client will be fast and responsive on GitHub Pages!

---

*Need help? Check the [GitHub Pages documentation](https://docs.github.com/en/pages) or open an issue in your repository.*
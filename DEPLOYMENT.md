# Deployment Guide

## Vercel Deployment

### Option 1: Using Vercel CLI

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Deploy**:
```bash
vercel
```

For production deployment:
```bash
vercel --prod
```

### Option 2: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the configuration from `vercel.json`
5. Click "Deploy"

### Configuration

The project includes a `vercel.json` file with the following configuration:

- **Build Command**: `pip install -r requirements.txt && python3 -m mkdocs build`
- **Output Directory**: `site`
- **Install Command**: `pip install -r requirements.txt`

**Note**: We use `python3 -m mkdocs` instead of `mkdocs` directly to ensure the command is found in Vercel's build environment.

Vercel will automatically:
- Install Python dependencies
- Build the MkDocs site
- Deploy the generated static files

### Environment Variables

No environment variables are required for basic deployment.

### Custom Domain

After deployment, you can add a custom domain in the Vercel dashboard:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## GitHub Pages Deployment

Alternatively, you can deploy to GitHub Pages:

```bash
mkdocs gh-deploy
```

This will create a `gh-pages` branch and deploy to GitHub Pages.

## Other Static Hosting

Build the site and upload the `site/` directory:

```bash
mkdocs build
# Upload the site/ directory to your hosting service
```


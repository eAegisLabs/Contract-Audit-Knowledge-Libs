#!/bin/bash
# Build script for Vercel deployment

# Install dependencies
pip install -r requirements.txt

# Build the site
mkdocs build

# The site/ directory will be served by Vercel


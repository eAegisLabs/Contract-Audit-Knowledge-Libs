# Contract Audit Knowledge Library

A comprehensive knowledge base for smart contract security auditing, covering vulnerability analysis, audit methods, and best practices.

## Overview

This knowledge library is designed to help security auditors, developers, and researchers understand common smart contract vulnerabilities, learn effective audit methodologies, and implement security best practices.

## Features

- **Comprehensive Vulnerability Coverage**: Detailed analysis of common smart contract vulnerabilities
- **Audit Methodologies**: Guides on static analysis, dynamic analysis, formal verification, and code review
- **Tools & Resources**: Curated list of audit tools, testing frameworks, and learning resources
- **Case Studies**: Real-world examples of security issues and their solutions
- **Best Practices**: Development standards, security patterns, and defense strategies

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/eaegislabs/Contract-Audit-Knowledge-Libs.git
cd Contract-Audit-Knowledge-Libs
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

### Development

To preview the documentation locally:

```bash
mkdocs serve
```

Then open `http://127.0.0.1:8000` in your browser.

### Building

To build the static site:

```bash
mkdocs build
```

The generated site will be in the `site/` directory.

### Deployment

The site can be deployed to various platforms:

#### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

#### GitHub Pages

```bash
mkdocs gh-deploy
```

#### Other Static Hosting

Build the site and deploy the `site/` directory:
```bash
mkdocs build
# Then upload the site/ directory to your hosting service
```

## Project Structure

```
.
├── docs/                    # Documentation source files
│   ├── index.md            # Home page
│   ├── vulnerabilities/    # Vulnerability documentation
│   ├── audit-methods/      # Audit methodology guides
│   ├── tools/              # Tools and resources
│   ├── case-studies/       # Case study examples
│   └── best-practices/     # Best practice guides
├── mkdocs.yml              # MkDocs configuration
├── requirements.txt        # Python dependencies
└── README.md              # This file
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- GitHub: [@eaegislabs](https://github.com/eaegislabs)
- Twitter: [@eaegislabs](https://twitter.com/eaegislabs)


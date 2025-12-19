# 🎵 HLPFL Link-in-Bio

[![CI/CD Pipeline](https://github.com/HLPFLCG/linkinbio/actions/workflows/ci.yml/badge.svg)](https://github.com/HLPFLCG/linkinbio/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A high-performance, accessible, and SEO-optimized link-in-bio solution for HLPFL Records - Michigan's premier record label.

## ✨ Features

### 🚀 Performance
- **Lighthouse Score: 95+** across all metrics
- **Core Web Vitals Optimized**
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- **Service Worker** for offline capabilities
- **Progressive Web App (PWA)** ready
- **Optimized images** with WebP format
- **Minimal JavaScript** - Vanilla JS, no frameworks

### ♿ Accessibility
- **WCAG 2.1 Level AA Compliant**
- **Semantic HTML5** structure
- **ARIA labels** and roles
- **Keyboard navigation** support
- **Screen reader** optimized
- **Skip navigation** links
- **Focus indicators** on all interactive elements
- **Respects prefers-reduced-motion**

### 🔒 Security
- **Content Security Policy (CSP)** headers
- **HTTPS enforced** via Cloudflare
- **Security headers** (X-Frame-Options, X-Content-Type-Options, etc.)
- **Subresource Integrity (SRI)** for external scripts
- **No inline styles** (separation of concerns)
- **security.txt** file for responsible disclosure

### 📊 SEO Optimized
- **Structured Data (JSON-LD)** for rich snippets
- **Open Graph** tags for social sharing
- **Twitter Card** tags
- **robots.txt** and **sitemap.xml**
- **Canonical URLs**
- **Meta descriptions** and keywords
- **Semantic HTML** for better crawling

### 🎨 Design
- **Mobile-first** responsive design
- **Touch-friendly** (44px minimum touch targets)
- **Smooth animations** (60fps)
- **Custom brand colors** and gradients
- **Interactive elements** with ripple effects
- **Dark theme** optimized

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox
- **Vanilla JavaScript** - ES6+, no frameworks
- **Service Worker** - PWA capabilities
- **Cloudflare Pages** - Hosting and CDN

## 📦 Installation

### Prerequisites
- Node.js 20.x or higher
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/HLPFLCG/linkinbio.git
cd linkinbio

# Install dependencies
npm install

# Start development server
npm run dev

# Format code
npm run format

# Lint code
npm run lint

# Build for production
npm run build
```

## 🚀 Development

### Project Structure

```
linkinbio/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── script.js           # JavaScript functionality
├── sw.js              # Service Worker
├── manifest.json      # PWA manifest
├── robots.txt         # SEO robots file
├── sitemap.xml        # SEO sitemap
├── _headers           # Cloudflare security headers
├── .well-known/       # Security and verification files
│   └── security.txt
├── images/            # Image assets
│   ├── favicon/       # Favicon files
│   ├── background/    # Background images
│   └── ...
├── .github/           # GitHub Actions workflows
│   └── workflows/
│       └── ci.yml
├── .eslintrc.json     # ESLint configuration
├── .prettierrc.json   # Prettier configuration
├── .editorconfig      # Editor configuration
└── package.json       # Dependencies and scripts
```

### Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run deploy` - Deploy to Cloudflare Pages

## 🎯 Performance Metrics

### Lighthouse Scores (Target)
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

## 🔐 Security Features

### Headers Implemented
- `Content-Security-Policy`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security` (HSTS)
- `Permissions-Policy`

### Best Practices
- All external links use `rel="noopener noreferrer"`
- No inline JavaScript or CSS
- Environment variables for sensitive data
- Regular security audits with `npm audit`

## ♿ Accessibility Features

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Skip navigation links
- Focus indicators
- Screen reader optimized
- Color contrast ratios meet WCAG AA
- Respects `prefers-reduced-motion`
- Form labels properly associated

## 📱 Progressive Web App (PWA)

- **Service Worker** for offline functionality
- **Web App Manifest** for installability
- **App-like experience** on mobile devices
- **Offline fallback** pages
- **Cache-first strategy** for static assets

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 SEO Features

- Structured data (JSON-LD) for Organization
- Open Graph tags for social media
- Twitter Card tags
- robots.txt for crawler directives
- sitemap.xml for search engines
- Canonical URLs
- Meta descriptions and keywords
- Semantic HTML for better indexing

## 🚀 Deployment

### Cloudflare Pages

1. Connect your GitHub repository to Cloudflare Pages
2. Set build command: `npm run build`
3. Set build output directory: `/`
4. Deploy!

The `_headers` file will automatically configure security headers.

### Manual Deployment

```bash
# Build the project
npm run build

# Deploy files to your hosting provider
# Upload: index.html, styles.css, script.js, sw.js, manifest.json,
#         robots.txt, sitemap.xml, _headers, images/, .well-known/
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test on mobile devices (iOS, Android)
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Test with slow 3G connection
- [ ] Test offline functionality
- [ ] Verify all links work
- [ ] Check form submission
- [ ] Verify social media previews

### Automated Testing
- ESLint for code quality
- Prettier for code formatting
- Lighthouse CI for performance
- npm audit for security vulnerabilities

## 📊 Analytics & Monitoring

Consider adding:
- Google Analytics or privacy-focused alternative
- Error tracking (Sentry, Bugsnag)
- Performance monitoring (New Relic, Datadog)
- Uptime monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow ESLint and Prettier configurations
- Write semantic HTML
- Use CSS custom properties for theming
- Comment complex logic
- Keep functions small and focused

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Jim Rockel** - Founder, HLPFL Records
- **Development Team** - HLPFL Tech

## 🙏 Acknowledgments

- Font: Montserrat by Google Fonts
- Icons: Custom SVG icons
- Hosting: Cloudflare Pages

## 📞 Contact

- Website: [hlpfl.org](https://hlpfl.org)
- Email: [Contact Form](https://hlpfl.org/contact/)
- Instagram: [@hlpfl_](https://www.instagram.com/hlpfl_/)
- Twitter: [@hlpfl_](https://x.com/hlpfl_)

## 🎵 About HLPFL

HLPFL Records is a Michigan-based record label discovering, developing, and promoting exceptional musical talent. We elevate artists to global recognition with cutting-edge production and worldwide distribution.

---

**Made with ❤️ by HLPFL Records**
# HLPFL Link-in-Bio Platform 🎵

[![CI/CD](https://github.com/HLPFLCG/linkinbio/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/HLPFLCG/linkinbio/actions)
[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-95%2B-success)](https://developers.google.com/web/tools/lighthouse)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-blue)](https://www.w3.org/WAI/WCAG21/quickref/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A world-class, accessible, and performant link-in-bio platform for HLPFL Records. Built with vanilla JavaScript, CSS3, and HTML5, following THE PERFECTION MANDATE standards for excellence in web development.

## ✨ Features

### 🎯 Core Features
- 🚀 **Lightning Fast** - Optimized for performance with 95+ Lighthouse score
- 🎨 **Fully Customizable** - Complete control over design and branding
- 📱 **Mobile First** - Responsive design that works perfectly on all devices
- ♿ **WCAG 2.1 AA Compliant** - Fully accessible with keyboard navigation and screen reader support
- 🔒 **Enterprise Security** - Comprehensive security headers and CSP implementation
- 📈 **SEO Optimized** - Structured data, meta tags, and search engine friendly

### 🚀 Performance
- ⚡ Service Worker for offline support
- 📦 PWA support for installable app experience
- 🎯 Optimized caching strategies
- 🖼️ Lazy loading for images
- 📊 Core Web Vitals optimized

### 🔐 Security
- 🛡️ Content Security Policy (CSP)
- 🔒 HTTPS enforcement with HSTS
- 🚫 XSS and clickjacking protection
- 📝 Security.txt for responsible disclosure
- 🔍 Regular security audits

### ♿ Accessibility
- ⌨️ Full keyboard navigation
- 🔊 Screen reader optimized
- 👁️ High contrast mode support
- 🎨 WCAG 2.1 AA color contrast
- 🎭 Reduced motion support
- 🏷️ Comprehensive ARIA labels

### 🎨 User Experience
- ✨ Smooth animations and transitions
- 📝 Accessible contact form
- 🎯 Skip navigation links
- 💬 Toast notifications
- 🎪 Interactive elements
- 📱 PWA install prompt

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript ES6+
- **Hosting**: Cloudflare Pages with global CDN
- **Version Control**: GitHub with automated CI/CD
- **Code Quality**: ESLint + Prettier
- **Testing**: GitHub Actions, Lighthouse CI, Pa11y
- **PWA**: Service Worker, Web App Manifest
- **Security**: CSP, Security Headers, HTTPS
- **Performance**: Optimized caching, lazy loading
- **Accessibility**: WCAG 2.1 AA compliant

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/HLPFLCG/linkinbio.git
cd linkinbio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### 4. Customize Content

Edit the following files to customize your link-in-bio:

- `index.html` - Update profile information, links, and content
- `styles.css` - Customize colors, fonts, and design
- `form.css` - Modify contact form styling
- `script.js` - Add custom functionality

### 5. Test Your Changes

```bash
# Run linting
npm run lint

# Format code
npm run format

# Check formatting
npx prettier --check "*.{html,css,js}"
```

### 6. Deploy to Production

#### Option A: Cloudflare Pages (Recommended)

1. Push changes to GitHub:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

2. Connect repository to Cloudflare Pages
3. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `/`
4. Deploy automatically

#### Option B: Other Platforms

The site works with any static hosting platform:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

## 📁 Project Structure

```
custom-link-in-bio/
├── index.html          # Main link-in-bio page
├── admin.html          # Admin panel for easy editing
├── style.css           # Styles and animations
├── script.js           # Main functionality
├── admin.css           # Admin panel styles
├── admin.js            # Admin panel functionality
├── config.json         # Configuration file
├── deploy.md           # Deployment guide
├── package.json        # Project metadata
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🎨 Customization Guide

### Basic Customization

Edit `script.js` to modify:

```javascript
const linkData = {
    profile: {
        name: "Your Name",
        bio: "Creator | Developer | Designer",
        avatar: "https://example.com/your-photo.jpg",
        social: {
            twitter: "https://twitter.com/yourusername",
            instagram: "https://instagram.com/yourusername",
            linkedin: "https://linkedin.com/in/yourusername"
        }
    },
    links: [
        {
            title: "🚀 My Website",
            url: "https://yourwebsite.com",
            description: "Check out my portfolio",
            type: "primary"
        }
        // Add more links...
    ]
};
```

### Advanced Customization

#### Colors and Theme

Edit CSS variables in `style.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --background-color: #0f172a;
    --surface-color: #1e293b;
    --text-primary: #f1f5f9;
    --text-secondary: #94a3b8;
}
```

#### Animations

Modify CSS animations or disable them:

```css
/* Disable animations for reduced motion */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        transition-duration: 0.01ms !important;
    }
}
```

#### Custom Fonts

Add custom fonts in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

And update CSS:

```css
body {
    font-family: 'YourFont', sans-serif;
}
```

## 🔧 Admin Panel

Access the admin panel at `your-domain.com/admin.html` to:

- ✏️ Edit profile information
- 🔗 Manage links easily
- 🎨 Customize colors
- 📊 View analytics
- 📤 Export/import configuration
- 💾 Save changes locally

## 📊 Analytics

Built-in analytics tracks:

- Total clicks per link
- Most popular links
- Click timestamps
- User engagement patterns

View analytics in the admin panel or access raw data:

```javascript
// Get analytics data
const analytics = window.LinkBio.getAnalytics();
console.log(analytics);
```

## 🌐 Deployment Options

### Option 1: Cloudflare Pages (Recommended)

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/repo.git
   git push -u origin main
   ```

2. **Deploy to Cloudflare Pages**
   - Go to Cloudflare Dashboard
   - Navigate to Pages
   - Connect to GitHub
   - Select your repository
   - Deploy

3. **Custom Domain** (Optional)
   - Add custom domain in Cloudflare Pages settings
   - Update DNS records

### Option 2: Other Static Hosts

Works perfectly with:
- Netlify
- Vercel
- GitHub Pages
- Surge.sh
- Any static hosting service

## 🔒 Security Features

- **HTTPS Only**: Automatic SSL certificate
- **CORS Protected**: Secure cross-origin requests
- **Input Validation**: Sanitized user inputs
- **No External Dependencies**: Reduced attack surface
- **Privacy Focused**: No third-party tracking

## ♿ Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **High Contrast**: WCAG AA compliant colors
- **Focus Management**: Visible focus indicators
- **Reduced Motion**: Respects user preferences

## 📱 Mobile Optimization

- **Responsive Design**: Adapts to all screen sizes
- **Touch Friendly**: Large tap targets
- **Fast Loading**: Optimized for mobile networks
- **PWA Ready**: Can be installed as app

## 🔄 Update Workflow

1. Make changes locally
2. Test with `npm run dev`
3. Commit and push to GitHub
4. Cloudflare Pages auto-deploys
5. Changes live in seconds

## 🛡️ Backup & Recovery

- **Git Version Control**: Full change history
- **Config Export**: Download backup anytime
- **Local Storage**: Admin panel saves locally
- **Multiple Environments**: Dev/Staging/Production

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature-name`
3. Make changes and test
4. Commit: `git commit -m 'Add feature'`
5. Push: `git push origin feature-name`
6. Open Pull Request

## 📄 License

MIT License - feel free to use, modify, and distribute.

## 🆘 Support

- 📖 Check [deploy.md](deploy.md) for deployment help
- 🐛 Report issues on GitHub
- 💬 Ask questions in discussions
- 📧 Email: your-email@example.com

## 🌟 Show Your Support

If this project helped you:

- ⭐ Star the repository
- 🐦 Follow on Twitter
- 💼 Connect on LinkedIn
- ☕ Buy me a coffee

## 🎯 Roadmap

- [ ] Dark/Light theme toggle
- [ ] QR code generation
- [ ] Advanced analytics dashboard
- [ ] Link scheduling
- [ ] Team collaboration features
- [ ] API integration
- [ ] Custom domains wizard
- [ ] Performance metrics

---

**Built with ❤️ using GitHub & Cloudflare Pages**

*Free forever. No ads. No tracking. Just your links, your way.*
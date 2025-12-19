# Contributing to HLPFL Link-in-Bio

First off, thank you for considering contributing to HLPFL Link-in-Bio! It's people like you that make this project better.

## Code of Conduct

This project and everyone participating in it is governed by our commitment to creating a welcoming and inclusive environment. By participating, you are expected to uphold this standard.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if applicable**
- **Include your environment details** (browser, OS, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternatives you've considered**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Ensure the test suite passes**
6. **Make sure your code lints** (run `npm run lint`)
7. **Format your code** (run `npm run format`)
8. **Write a clear commit message**
9. **Submit your pull request**

## Development Process

### Setup Development Environment

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/linkinbio.git
cd linkinbio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Coding Standards

#### HTML
- Use semantic HTML5 elements
- Include proper ARIA labels
- Ensure accessibility (WCAG 2.1 AA)
- Keep markup clean and well-indented

#### CSS
- Use CSS custom properties for theming
- Follow mobile-first approach
- Keep selectors specific but not overly complex
- Group related styles together
- Comment complex CSS when necessary

#### JavaScript
- Use ES6+ features
- Follow ESLint rules
- Write clear, self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names

### Code Style

We use ESLint and Prettier to maintain code quality:

```bash
# Check linting
npm run lint

# Format code
npm run format
```

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add dark mode toggle
fix: resolve mobile menu overflow issue
docs: update installation instructions
style: format code with prettier
refactor: simplify navigation component
perf: optimize image loading
```

### Testing

Before submitting a pull request:

1. **Test on multiple browsers**
   - Chrome (latest)
   - Firefox (latest)
   - Safari (latest)
   - Edge (latest)

2. **Test on mobile devices**
   - iOS Safari
   - Chrome Mobile

3. **Test accessibility**
   - Keyboard navigation
   - Screen reader compatibility
   - Color contrast

4. **Test performance**
   - Run Lighthouse audit
   - Check Core Web Vitals

### Documentation

- Update README.md if you change functionality
- Update CHANGELOG.md following Keep a Changelog format
- Add JSDoc comments for new functions
- Update TODO.md if applicable

## Project Structure

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
├── images/            # Image assets
├── .github/           # GitHub Actions workflows
└── ...
```

## Performance Guidelines

- Keep JavaScript bundle size minimal
- Optimize images (use WebP format)
- Implement lazy loading where appropriate
- Use CSS custom properties for theming
- Minimize CSS and JavaScript
- Leverage browser caching

## Accessibility Guidelines

- Follow WCAG 2.1 Level AA standards
- Use semantic HTML
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Maintain color contrast ratios
- Test with screen readers
- Support prefers-reduced-motion

## Security Guidelines

- Never commit sensitive data
- Use environment variables for secrets
- Sanitize user inputs
- Follow OWASP Top 10 guidelines
- Keep dependencies updated
- Run security audits regularly

## Questions?

Feel free to open an issue with your question or reach out via:
- Website: [hlpfl.org](https://hlpfl.org)
- Email: [Contact Form](https://hlpfl.org/contact/)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to HLPFL Link-in-Bio! 🎵
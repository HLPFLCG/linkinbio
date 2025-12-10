/* ===== PREMIUM LINK-IN-BIO SCRIPT ===== */
/* Enterprise-level interactions and features */

// Enhanced link data with additional premium features
const linkData = {
    profile: {
        name: "HLPFL",
        bio: "Michigan-Based Record Label & Creative Collective",
        avatar: "images/founder/0914B329-9D3E-421B-95D9-D027EC731771.jpeg",
        social: {
            twitter: "https://twitter.com/hlpfl_",
            instagram: "https://instagram.com/hlpfl_",
            linkedin: "https://linkedin.com/company/hlpfl"
        }
    },
    links: [
        {
            id: 1,
            title: "🌐 Official Website",
            url: "https://hlpfl.org",
            description: "Explore our complete digital ecosystem",
            type: "primary",
            icon: "🌐",
            category: "main",
            views: 0,
            lastViewed: null
        },
        {
            id: 2,
            title: "💼 LinkedIn Company",
            url: "https://linkedin.com/company/hlpfl",
            description: "Connect with us professionally",
            type: "secondary",
            icon: "💼",
            category: "social",
            views: 0,
            lastViewed: null
        },
        {
            id: 3,
            title: "📧 Email Contact",
            url: "mailto:contact@hlpfl.org",
            description: "Direct communication with our team",
            type: "default",
            icon: "📧",
            category: "contact",
            views: 0,
            lastViewed: null
        },
        {
            id: 4,
            title: "📱 Schedule Consultation",
            url: "https://calendly.com/hlpfl",
            description: "Book a strategic consultation session",
            type: "primary",
            icon: "📱",
            category: "booking",
            views: 0,
            lastViewed: null
        },
        {
            id: 5,
            title: "🎵 Music Portfolio",
            url: "https://hlpfl.org/music",
            description: "Discover our latest releases",
            type: "secondary",
            icon: "🎵",
            category: "portfolio",
            views: 0,
            lastViewed: null
        },
        {
            id: 6,
            title: "🎬 Production Services",
            url: "https://hlpfl.org/production",
            description: "Professional music production solutions",
            type: "default",
            icon: "🎬",
            category: "services",
            views: 0,
            lastViewed: null
        },
        {
            id: 7,
            title: "📞 Phone Contact",
            url: "tel:+1234567890",
            description: "Call us directly for immediate assistance",
            type: "default",
            icon: "📞",
            category: "contact",
            views: 0,
            lastViewed: null
        },
        {
            id: 8,
            title: "💬 Live Chat Support",
            url: "https://hlpfl.org/chat",
            description: "Real-time support from our team",
            type: "secondary",
            icon: "💬",
            category: "support",
            views: 0,
            lastViewed: null
        }
    ]
};

// Premium analytics configuration
const analyticsConfig = {
    enable: true,
    provider: 'enhanced',
    tracking: {
        clicks: true,
        hoverTime: true,
        scrollDepth: true,
        sessionDuration: true,
        deviceInfo: true,
        location: false
    },
    heatmap: false
};

// Premium theme configuration
const themes = {
    default: {
        name: 'Midnight Purple',
        colors: {
            primary: '#0a0a0a',
            accent: '#6366f1',
            secondary: '#8b5cf6'
        }
    },
    gold: {
        name: 'Executive Gold',
        colors: {
            primary: '#1a1a1a',
            accent: '#f59e0b',
            secondary: '#f97316'
        }
    },
    emerald: {
        name: 'Emerald Dream',
        colors: {
            primary: '#0a0a0a',
            accent: '#10b981',
            secondary: '#06b6d4'
        }
    },
    rose: {
        name: 'Rose Quartz',
        colors: {
            primary: '#1a0a0a',
            accent: '#f43f5e',
            secondary: '#ec4899'
        }
    }
};

// Initialize premium features
class PremiumLinkBio {
    constructor() {
        this.currentTheme = 'default';
        this.particles = [];
        this.cursor = { x: 0, y: 0 };
        this.scrollY = 0;
        this.sessionStart = Date.now();
        this.hoverTimers = new Map();
        this.init();
    }

    init() {
        this.createCustomCursor();
        this.createParticles();
        this.loadProfile();
        this.renderLinks();
        this.setupEventListeners();
        this.initializeAnalytics();
        this.setupScrollEffects();
        this.initializeThemeSwitcher();
        this.createQRCodeFeature();
        this.setupKeyboardNavigation();
        this.initializeAccessibility();
        this.optimizePerformance();
        this.startSessionTracking();
    }

    // Custom cursor implementation
    createCustomCursor() {
        if (window.matchMedia('(hover: hover)').matches) {
            const cursor = document.createElement('div');
            cursor.className = 'custom-cursor';
            document.body.appendChild(cursor);

            const follower = document.createElement('div');
            follower.className = 'custom-cursor-follower';
            document.body.appendChild(follower);

            document.addEventListener('mousemove', (e) => {
                this.cursor.x = e.clientX;
                this.cursor.y = e.clientY;
                
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                setTimeout(() => {
                    follower.style.left = e.clientX + 'px';
                    follower.style.top = e.clientY + 'px';
                }, 100);
            });

            // Add hover effects
            const interactiveElements = document.querySelectorAll('.link-item, .social-icon, button');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add('hover');
                    follower.classList.add('hover');
                });
                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hover');
                    follower.classList.remove('hover');
                });
            });
        }
    }

    // Particle system
    createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        container.appendChild(particle);
    }

    // Enhanced profile loading with animations
    loadProfile() {
        const profile = linkData.profile;
        
        // Animate profile image
        const profilePic = document.getElementById('profilePic');
        if (profilePic && profile.avatar) {
            profilePic.src = profile.avatar;
            profilePic.alt = `${profile.name}'s profile picture`;
            profilePic.style.opacity = '0';
            profilePic.onload = () => {
                profilePic.style.transition = 'opacity 1s ease';
                profilePic.style.opacity = '1';
            };
        }
        
        // Typewriter effect for name
        const profileName = document.querySelector('.profile-name');
        if (profileName) {
            this.typewriterEffect(profileName, profile.name);
        }
        
        // Fade in bio
        const profileBio = document.querySelector('.profile-bio');
        if (profileBio) {
            profileBio.style.opacity = '0';
            setTimeout(() => {
                profileBio.style.transition = 'opacity 1s ease';
                profileBio.style.opacity = '1';
            }, 500);
        }
        
        // Update social links with animation
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach((icon, index) => {
            const platform = icon.dataset.platform;
            if (profile.social[platform]) {
                icon.href = profile.social[platform];
                icon.target = '_blank';
                icon.rel = 'noopener noreferrer';
                icon.style.opacity = '0';
                icon.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    icon.style.transition = 'all 0.6s ease';
                    icon.style.opacity = '1';
                    icon.style.transform = 'translateY(0)';
                }, 200 * (index + 1));
            }
        });
    }

    // Typewriter effect
    typewriterEffect(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        setTimeout(type, 300);
    }

    // Enhanced link rendering with analytics
    renderLinks() {
        const container = document.getElementById('linksContainer');
        if (!container) return;
        
        container.innerHTML = '';
        
        const sortedLinks = linkData.links.sort((a, b) => a.id - b.id);
        
        sortedLinks.forEach((link, index) => {
            const linkElement = this.createPremiumLinkElement(link, index);
            container.appendChild(linkElement);
        });
    }

    // Premium link element creation
    createPremiumLinkElement(link, index) {
        const linkItem = document.createElement('a');
        linkItem.href = link.url;
        linkItem.className = `link-item ${link.type || 'default'}`;
        linkItem.setAttribute('data-link-id', link.id);
        linkItem.setAttribute('data-category', link.category);
        
        if (!link.url.startsWith('tel:') && !link.url.startsWith('mailto:')) {
            linkItem.target = '_blank';
            linkItem.rel = 'noopener noreferrer';
        }
        
        linkItem.style.animationDelay = `${index * 0.15}s`;
        
        linkItem.innerHTML = `
            <div class="link-content">
                <div class="link-icon">${link.icon || '🔗'}</div>
                <div>
                    <div class="link-text">${link.title}</div>
                    ${link.description ? `<span class="link-description">${link.description}</span>` : ''}
                </div>
            </div>
            <div class="link-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </div>
        `;
        
        // Premium interactions
        this.setupLinkInteractions(linkItem, link);
        
        return linkItem;
    }

    // Enhanced link interactions
    setupLinkInteractions(element, link) {
        let hoverStartTime = null;
        
        element.addEventListener('mouseenter', () => {
            hoverStartTime = Date.now();
            
            // Add ripple effect
            this.createRipple(element);
            
            // Track hover time
            this.hoverTimers.set(link.id, hoverStartTime);
        });
        
        element.addEventListener('mouseleave', () => {
            if (hoverStartTime) {
                const hoverDuration = Date.now() - hoverStartTime;
                this.trackHoverTime(link.id, hoverDuration);
                this.hoverTimers.delete(link.id);
            }
        });
        
        element.addEventListener('click', (e) => {
            this.trackPremiumLinkClick(link);
            
            // Premium click animation
            element.style.transform = 'scale(0.98)';
            setTimeout(() => {
                element.style.transform = '';
            }, 200);
            
            // Update view count
            link.views++;
            link.lastViewed = new Date().toISOString();
            this.saveAnalytics();
        });
    }

    // Ripple effect
    createRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.marginLeft = -size/2 + 'px';
        ripple.style.marginTop = -size/2 + 'px';
        
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    // Enhanced event listeners
    setupEventListeners() {
        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        // Parallax effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const profileImage = document.querySelector('.profile-image');
            if (profileImage) {
                const rect = profileImage.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const deltaX = (e.clientX - centerX) / 30;
                const deltaY = (e.clientY - centerY) / 30;
                
                profileImage.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            }
        });
        
        // Performance monitoring
        if (window.PerformanceObserver) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                });
            });
            observer.observe({ entryTypes: ['largest-contentful-paint'] });
        }
    }

    // Premium analytics
    initializeAnalytics() {
        if (!analyticsConfig.enable) return;
        
        window.premiumAnalytics = {
            trackEvent: (category, action, label, value) => {
                const event = {
                    category,
                    action,
                    label,
                    value,
                    timestamp: new Date().toISOString(),
                    url: window.location.href,
                    userAgent: navigator.userAgent,
                    sessionId: this.getSessionId(),
                    userId: this.getUserId()
                };
                
                this.saveAnalyticsEvent(event);
            },
            
            getAnalytics: () => this.getAnalyticsData(),
            
            exportData: () => this.exportAnalyticsData()
        };
        
        // Track page view
        this.trackPageView();
    }

    trackPremiumLinkClick(link) {
        if (typeof premiumAnalytics !== 'undefined') {
            premiumAnalytics.trackEvent('Link Click', link.title, link.url, link.views);
        }
        
        // Add visual feedback
        this.showClickFeedback(link);
    }

    trackHoverTime(linkId, duration) {
        if (duration > 1000) { // Only track hovers over 1 second
            if (typeof premiumAnalytics !== 'undefined') {
                premiumAnalytics.trackEvent('Hover Time', `Link ${linkId}`, `Duration: ${duration}ms`, duration);
            }
        }
    }

    trackPageView() {
        if (typeof premiumAnalytics !== 'undefined') {
            premiumAnalytics.trackEvent('Page View', 'Link-in-Bio', 'HLPFL Premium');
        }
    }

    // Scroll effects
    setupScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            this.scrollY = window.scrollY;
            
            // Parallax background
            const background = document.querySelector('.premium-background');
            if (background) {
                background.style.transform = `translateY(${this.scrollY * 0.5}px)`;
            }
            
            // Fade elements on scroll
            const profile = document.querySelector('.profile');
            if (profile) {
                const opacity = Math.max(0, 1 - this.scrollY / 300);
                profile.style.opacity = opacity;
            }
            
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }

    // Theme switcher
    initializeThemeSwitcher() {
        const savedTheme = localStorage.getItem('linkbio-theme') || 'default';
        this.currentTheme = savedTheme;
        this.applyTheme(savedTheme);
        
        // Create theme switcher UI
        this.createThemeSwitcherUI();
    }

    createThemeSwitcherUI() {
        const switcher = document.createElement('div');
        switcher.className = 'theme-switcher';
        switcher.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 8px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        
        Object.entries(themes).forEach(([key, theme]) => {
            const button = document.createElement('button');
            button.style.cssText = `
                width: 30px;
                height: 30px;
                border-radius: 50%;
                border: 2px solid ${key === this.currentTheme ? '#fff' : 'transparent'};
                background: ${theme.colors.accent};
                margin: 2px;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            button.title = theme.name;
            
            button.addEventListener('click', () => {
                this.switchTheme(key);
            });
            
            switcher.appendChild(button);
        });
        
        document.body.appendChild(switcher);
    }

    switchTheme(themeName) {
        this.currentTheme = themeName;
        localStorage.setItem('linkbio-theme', themeName);
        this.applyTheme(themeName);
    }

    applyTheme(themeName) {
        const theme = themes[themeName];
        if (!theme) return;
        
        const root = document.documentElement;
        root.style.setProperty('--accent-primary', theme.colors.accent);
        root.style.setProperty('--accent-secondary', theme.colors.secondary);
        
        // Update theme switcher UI
        const switcher = document.querySelector('.theme-switcher');
        if (switcher) {
            switcher.querySelectorAll('button').forEach((button, index) => {
                const isCurrent = Object.keys(themes)[index] === themeName;
                button.style.borderColor = isCurrent ? '#fff' : 'transparent';
            });
        }
    }

    // QR Code feature
    createQRCodeFeature() {
        const qrButton = document.createElement('button');
        qrButton.innerHTML = '📱';
        qrButton.title = 'Generate QR Code';
        qrButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient-primary);
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
            transition: all 0.3s ease;
        `;
        
        qrButton.addEventListener('click', () => {
            this.generateQRCode();
        });
        
        document.body.appendChild(qrButton);
    }

    generateQRCode() {
        // Create QR code modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: var(--color-secondary);
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            max-width: 300px;
        `;
        
        content.innerHTML = `
            <h3 style="margin-bottom: 20px; color: white;">Scan to Share</h3>
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}" 
                     alt="QR Code" style="width: 200px; height: 200px;">
            </div>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: var(--gradient-primary); color: white; border: none; 
                           padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                Close
            </button>
        `;
        
        modal.appendChild(content);
        document.body.appendChild(modal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') return; // Allow default tab behavior
            
            const focusableElements = document.querySelectorAll('.link-item, .social-icon');
            const focusableArray = Array.from(focusableElements);
            const currentIndex = focusableArray.indexOf(document.activeElement);
            
            if (e.key === 'ArrowDown' && currentIndex < focusableArray.length - 1) {
                e.preventDefault();
                focusableArray[currentIndex + 1].focus();
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                focusableArray[currentIndex - 1].focus();
            } else if (e.key === 'Home') {
                e.preventDefault();
                focusableArray[0]?.focus();
            } else if (e.key === 'End') {
                e.preventDefault();
                focusableArray[focusableArray.length - 1]?.focus();
            }
        });
    }

    // Enhanced accessibility
    initializeAccessibility() {
        // Add ARIA labels
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            const platform = icon.dataset.platform;
            icon.setAttribute('aria-label', `Visit HLPFL on ${platform}`);
        });
        
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#links-container';
        skipLink.textContent = 'Skip to links';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--accent-primary);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 9999;
            transition: top 0.3s ease;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Announce page content to screen readers
        this.announceToScreenReader('HLPFL link-in-bio page loaded');
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        announcement.textContent = message;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }

    // Performance optimization
    optimizePerformance() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Preload critical resources
        this.preloadCriticalResources();
    }

    preloadCriticalResources() {
        const criticalResources = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
        ];
        
        criticalResources.forEach(url => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = url;
            document.head.appendChild(link);
        });
    }

    // Session tracking
    startSessionTracking() {
        this.sessionStart = Date.now();
        
        // Track session duration
        window.addEventListener('beforeunload', () => {
            const sessionDuration = Date.now() - this.sessionStart;
            if (typeof premiumAnalytics !== 'undefined') {
                premiumAnalytics.trackEvent('Session', 'Duration', `Session ended`, sessionDuration);
            }
        });
        
        // Track scroll depth
        this.trackScrollDepth();
    }

    trackScrollDepth() {
        const maxScroll = () => {
            return Math.max(
                window.pageYOffset,
                document.documentElement.scrollTop,
                document.body.scrollTop
            );
        };
        
        const scrollThresholds = [25, 50, 75, 90];
        const trackedThresholds = new Set();
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((maxScroll() / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
            
            scrollThresholds.forEach(threshold => {
                if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
                    trackedThresholds.add(threshold);
                    if (typeof premiumAnalytics !== 'undefined') {
                        premiumAnalytics.trackEvent('Scroll Depth', `${threshold}%`, 'Page scroll');
                    }
                }
            });
        });
    }

    // Analytics data management
    getSessionId() {
        let sessionId = sessionStorage.getItem('linkbio-session-id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            sessionStorage.setItem('linkbio-session-id', sessionId);
        }
        return sessionId;
    }

    getUserId() {
        return localStorage.getItem('linkbio-user-id') || 'anonymous';
    }

    saveAnalyticsEvent(event) {
        const events = JSON.parse(localStorage.getItem('linkbio-events') || '[]');
        events.push(event);
        
        // Keep only last 1000 events
        if (events.length > 1000) {
            events.splice(0, events.length - 1000);
        }
        
        localStorage.setItem('linkbio-events', JSON.stringify(events));
    }

    getAnalyticsData() {
        return {
            events: JSON.parse(localStorage.getItem('linkbio-events') || '[]'),
            links: linkData.links.map(link => ({
                ...link,
                views: link.views || 0
            }))
        };
    }

    exportAnalyticsData() {
        const data = this.getAnalyticsData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `linkbio-analytics-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    saveAnalytics() {
        localStorage.setItem('linkbio-data', JSON.stringify(linkData));
    }

    showClickFeedback(link) {
        const feedback = document.createElement('div');
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--gradient-primary);
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            font-weight: 600;
            z-index: 10000;
            animation: fadeInOut 2s ease;
        `;
        feedback.textContent = `Opening ${link.title}...`;
        
        document.body.appendChild(feedback);
        setTimeout(() => feedback.remove(), 2000);
    }
}

// Initialize premium features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.premiumLinkBio = new PremiumLinkBio();
    
    // Expose API for external use
    window.HLPFLLinks = {
        updateProfile: function(newProfile) {
            Object.assign(linkData.profile, newProfile);
            window.premiumLinkBio.loadProfile();
        },
        
        addLink: function(newLink) {
            const id = Math.max(...linkData.links.map(l => l.id)) + 1;
            linkData.links.push({ id, views: 0, lastViewed: null, ...newLink });
            window.premiumLinkBio.renderLinks();
        },
        
        removeLink: function(linkId) {
            linkData.links = linkData.links.filter(link => link.id !== linkId);
            window.premiumLinkBio.renderLinks();
        },
        
        updateLink: function(linkId, updatedLink) {
            const index = linkData.links.findIndex(link => link.id === linkId);
            if (index !== -1) {
                linkData.links[index] = { ...linkData.links[index], ...updatedLink };
                window.premiumLinkBio.renderLinks();
            }
        },
        
        getAnalytics: function() {
            return window.premiumLinkBio.getAnalyticsData();
        },
        
        exportData: function() {
            return window.premiumLinkBio.exportAnalyticsData();
        },
        
        switchTheme: function(themeName) {
            window.premiumLinkBio.switchTheme(themeName);
        },
        
        refresh: function() {
            window.premiumLinkBio.renderLinks();
            window.premiumLinkBio.loadProfile();
        }
    };
});

// Add CSS for new animations
const additionalCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);
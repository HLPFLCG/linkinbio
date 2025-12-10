// Link data configuration
const linkData = {
    profile: {
        name: "HLPFL",
        bio: "Professional Consulting & Services",
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
            description: "Visit our main website for complete information",
            type: "primary",
            icon: "🌐"
        },
        {
            id: 2,
            title: "💼 LinkedIn Company",
            url: "https://linkedin.com/company/hlpfl",
            description: "Connect with us professionally",
            type: "secondary",
            icon: "💼"
        },
        {
            id: 3,
            title: "📧 Email Contact",
            url: "mailto:contact@hlpfl.org",
            description: "Get in touch with our team",
            type: "default",
            icon: "📧"
        },
        {
            id: 4,
            title: "📱 Schedule Consultation",
            url: "https://calendly.com/hlpfl",
            description: "Book a consultation with our experts",
            type: "primary",
            icon: "📱"
        },
        {
            id: 5,
            title: "📋 Services Overview",
            url: "https://hlpfl.org/services",
            description: "Explore our comprehensive services",
            type: "secondary",
            icon: "📋"
        },
        {
            id: 6,
            title: "🎯 Case Studies",
            url: "https://hlpfl.org/case-studies",
            description: "See our success stories",
            type: "default",
            icon: "🎯"
        },
        {
            id: 7,
            title: "📞 Phone Contact",
            url: "tel:+1234567890",
            description: "Call us directly",
            type: "default",
            icon: "📞"
        },
        {
            id: 8,
            title: "💬 Live Chat Support",
            url: "https://hlpfl.org/chat",
            description: "Chat with our support team",
            type: "secondary",
            icon: "💬"
        }
    ]
};

// Analytics configuration
const analytics = {
    enable: true,
    provider: 'local', // or 'google', 'plausible'
    trackingId: null
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadProfile();
    renderLinks();
    setupEventListeners();
    initializeAnalytics();
    addSmoothScrolling();
    setupAnimations();
    observeIntersections();
}

// Load profile information
function loadProfile() {
    const profile = linkData.profile;
    
    // Update profile picture
    const profilePic = document.getElementById('profilePic');
    if (profilePic && profile.avatar) {
        profilePic.src = profile.avatar;
        profilePic.alt = `${profile.name}'s profile picture`;
    }
    
    // Update profile name
    const profileName = document.querySelector('.profile-name');
    if (profileName) {
        profileName.textContent = profile.name;
    }
    
    // Update profile bio
    const profileBio = document.querySelector('.profile-bio');
    if (profileBio) {
        profileBio.textContent = profile.bio;
    }
    
    // Update social links
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        const platform = icon.dataset.platform;
        if (profile.social[platform]) {
            icon.href = profile.social[platform];
            icon.target = '_blank';
            icon.rel = 'noopener noreferrer';
        }
    });
}

// Render links
function renderLinks() {
    const container = document.getElementById('linksContainer');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    // Sort links by order if specified
    const sortedLinks = linkData.links.sort((a, b) => a.id - b.id);
    
    // Create link elements
    sortedLinks.forEach((link, index) => {
        const linkElement = createLinkElement(link, index);
        container.appendChild(linkElement);
    });
}

// Create individual link element
function createLinkElement(link, index) {
    const linkItem = document.createElement('a');
    linkItem.href = link.url;
    linkItem.className = `link-item ${link.type || 'default'}`;
    
    // Handle external links
    if (!link.url.startsWith('tel:') && !link.url.startsWith('mailto:')) {
        linkItem.target = '_blank';
        linkItem.rel = 'noopener noreferrer';
    }
    
    linkItem.setAttribute('data-link-id', link.id);
    
    // Add animation delay
    linkItem.style.animationDelay = `${index * 0.1}s`;
    
    // Create content structure
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
    
    // Add click tracking
    linkItem.addEventListener('click', (e) => {
        trackLinkClick(link);
        
        // Add click animation
        linkItem.style.transform = 'scale(0.98)';
        setTimeout(() => {
            linkItem.style.transform = '';
        }, 150);
    });
    
    return linkItem;
}

// Setup event listeners
function setupEventListeners() {
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Allow default tab behavior
            return;
        }
        
        const focusedElement = document.activeElement;
        const focusableElements = document.querySelectorAll('.link-item, .social-icon');
        const focusableArray = Array.from(focusableElements);
        const currentIndex = focusableArray.indexOf(focusedElement);
        
        if (e.key === 'ArrowDown' && currentIndex < focusableArray.length - 1) {
            e.preventDefault();
            focusableArray[currentIndex + 1].focus();
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            focusableArray[currentIndex - 1].focus();
        }
    });
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize analytics
function initializeAnalytics() {
    if (!analytics.enable) return;
    
    // Simple click tracking
    window.trackEvent = function(category, action, label) {
        const event = {
            category,
            action,
            label,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        // Store in localStorage for demo purposes
        const events = JSON.parse(localStorage.getItem('linkEvents') || '[]');
        events.push(event);
        localStorage.setItem('linkEvents', JSON.stringify(events));
        
        console.log('Event tracked:', event);
        
        // Send to analytics service if configured
        if (analytics.provider === 'google' && analytics.trackingId) {
            // Google Analytics implementation would go here
        }
    };
    
    // Track page view
    if (typeof trackEvent === 'function') {
        trackEvent('Page View', 'Link-in-Bio', 'HLPFL Links Page');
    }
}

// Track link clicks
function trackLinkClick(link) {
    if (typeof trackEvent === 'function') {
        trackEvent('Link Click', link.title, link.url);
    }
    
    // Add visual feedback
    const linkElement = document.querySelector(`[data-link-id="${link.id}"]`);
    if (linkElement) {
        linkElement.style.transform = 'scale(0.98)';
        setTimeout(() => {
            linkElement.style.transform = '';
        }, 150);
    }
}

// Add smooth scrolling
function addSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Setup animations
function setupAnimations() {
    // Add parallax effect to profile image on mouse move
    const profileImage = document.querySelector('.profile-image');
    
    if (profileImage) {
        document.addEventListener('mousemove', (e) => {
            const rect = profileImage.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / 50;
            const deltaY = (e.clientY - centerY) / 50;
            
            profileImage.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        document.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'translate(0, 0)';
        });
    }
    
    // Add hover sound effect (optional)
    const links = document.querySelectorAll('.link-item');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Add hover sound if needed
            link.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// Intersection Observer for animations
function observeIntersections() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for link items
                if (entry.target.classList.contains('link-item')) {
                    const linkItems = Array.from(document.querySelectorAll('.link-item'));
                    const index = linkItems.indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    // Observe all link items
    document.querySelectorAll('.link-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Dynamic content loading (for future use)
async function loadContentFromAPI() {
    try {
        // Example: Load links from an API
        const response = await fetch('/api/links');
        const data = await response.json();
        
        if (data && data.links) {
            linkData.links = data.links;
            renderLinks();
        }
    } catch (error) {
        console.error('Failed to load content:', error);
    }
}

// Performance optimization
function optimizePerformance() {
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
}

// Accessibility improvements
function improveAccessibility() {
    // Add ARIA labels
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        const platform = icon.dataset.platform;
        icon.setAttribute('aria-label', `Visit HLPFL on ${platform}`);
    });
    
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 9999;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Theme switcher (optional future feature)
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
}

// Export functions for external use
window.HLPFLLinks = {
    updateProfile: function(newProfile) {
        Object.assign(linkData.profile, newProfile);
        loadProfile();
    },
    
    addLink: function(newLink) {
        const id = Math.max(...linkData.links.map(l => l.id)) + 1;
        linkData.links.push({ id, ...newLink });
        renderLinks();
    },
    
    removeLink: function(linkId) {
        linkData.links = linkData.links.filter(link => link.id !== linkId);
        renderLinks();
    },
    
    updateLink: function(linkId, updatedLink) {
        const index = linkData.links.findIndex(link => link.id === linkId);
        if (index !== -1) {
            linkData.links[index] = { ...linkData.links[index], ...updatedLink };
            renderLinks();
        }
    },
    
    getAnalytics: function() {
        return JSON.parse(localStorage.getItem('linkEvents') || '[]');
    },
    
    exportData: function() {
        return {
            profile: linkData.profile,
            links: linkData.links,
            analytics: this.getAnalytics()
        };
    },
    
    refresh: function() {
        renderLinks();
        loadProfile();
    }
};

// Initialize additional features
loadTheme();
improveAccessibility();
optimizePerformance();

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
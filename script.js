// Link data configuration
const linkData = {
    profile: {
        name: "Your Name",
        bio: "Creator | Developer | Designer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        social: {
            twitter: "https://twitter.com/yourusername",
            instagram: "https://instagram.com/yourusername",
            linkedin: "https://linkedin.com/in/yourusername"
        }
    },
    links: [
        {
            id: 1,
            title: "🚀 My Website",
            url: "https://yourwebsite.com",
            description: "Check out my portfolio",
            type: "primary",
            icon: "🌐"
        },
        {
            id: 2,
            title: "💼 LinkedIn",
            url: "https://linkedin.com/in/yourusername",
            description: "Professional network",
            type: "secondary",
            icon: "💼"
        },
        {
            id: 3,
            title: "📧 Email Me",
            url: "mailto:your.email@example.com",
            description: "Get in touch",
            type: "default",
            icon: "📧"
        },
        {
            id: 4,
            title: "🐱 GitHub",
            url: "https://github.com/yourusername",
            description: "View my projects",
            type: "secondary",
            icon: "🐱"
        },
        {
            id: 5,
            title: "🎨 Dribbble",
            url: "https://dribbble.com/yourusername",
            description: "Design portfolio",
            type: "default",
            icon: "🎨"
        },
        {
            id: 6,
            title: "📝 Blog",
            url: "https://yourblog.com",
            description: "Read my articles",
            type: "secondary",
            icon: "📝"
        }
    ]
};

// Analytics configuration
const analytics = {
    enable: true,
    provider: 'cloudflare', // or 'google', 'plausible'
    trackingId: null // Add your tracking ID if needed
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
    linkItem.target = '_blank';
    linkItem.rel = 'noopener noreferrer';
    linkItem.setAttribute('data-link-id', link.id);
    
    // Add animation delay
    linkItem.style.animationDelay = `${index * 0.1}s`;
    
    // Create content structure
    linkItem.innerHTML = `
        <div class="link-content">
            <div class="link-icon">${link.icon || '🔗'}</div>
            <div>
                <div class="link-text">${link.title}</div>
                ${link.description ? `<small style="color: var(--text-secondary); font-size: 0.9rem;">${link.description}</small>` : ''}
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
    
    // Add smooth reveal on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.link-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
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
            url: window.location.href
        };
        
        // Store in localStorage for demo purposes
        const events = JSON.parse(localStorage.getItem('linkEvents') || '[]');
        events.push(event);
        localStorage.setItem('linkEvents', JSON.stringify(events));
        
        console.log('Event tracked:', event);
    };
}

// Track link clicks
function trackLinkClick(link) {
    if (typeof trackEvent === 'function') {
        trackEvent('Link Click', link.title, link.url);
    }
    
    // Optional: Add visual feedback
    const linkElement = document.querySelector(`[data-link-id="${link.id}"]`);
    if (linkElement) {
        linkElement.style.transform = 'scale(0.95)';
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

// Theme switcher (optional)
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
window.LinkBio = {
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
    }
};

// Initialize theme
loadTheme();
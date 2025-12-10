// Admin Panel JavaScript for HLPFL Links
let currentConfig = {};

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    loadConfig();
    setupEventListeners();
    renderLinksList();
    loadAnalytics();
    initializeNavigation();
});

// Initialize navigation
function initializeNavigation() {
    // Show profile section by default
    showSection('profile');
}

// Show specific section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.editor-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.admin-nav .btn').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('btn-secondary');
        btn.classList.remove('btn-primary');
    });
    
    // Show selected section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
    
    // Update active nav button
    const activeBtn = document.querySelector(`.admin-nav .btn[onclick*="${sectionName}"]`);
    if (activeBtn) {
        activeBtn.classList.remove('btn-secondary');
        activeBtn.classList.add('btn-primary');
        activeBtn.classList.add('active');
    }
    
    // Load section-specific data
    if (sectionName === 'analytics') {
        loadAnalytics();
    }
}

// Load configuration
function loadConfig() {
    // Try to load from localStorage first
    const savedConfig = localStorage.getItem('hlpflLinkConfig');
    if (savedConfig) {
        currentConfig = JSON.parse(savedConfig);
    } else {
        // Load default config
        currentConfig = getDefaultConfig();
    }
    populateForms();
}

// Get default configuration
function getDefaultConfig() {
    return {
        profile: {
            name: "HLPFL",
            bio: "MI-Based Record Label",
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
                url: "mailto:admin@hlpfl.org",
                description: "Get in touch with our team",
                type: "default",
                icon: "📧"
            }
        ],
        theme: {
            primaryColor: "#c87941",
            secondaryColor: "#d89055",
            backgroundColor: "#000000",
            surfaceColor: "#1a1d23",
            textPrimary: "#f5f5f5",
            textSecondary: "#8a8a8a"
        },
        analytics: {
            enable: true,
            provider: "local"
        },
        settings: {
            customDomain: "",
            enableNotifications: false
        }
    };
}

// Setup event listeners
function setupEventListeners() {
    // Profile form
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveProfile();
    });

    // Settings form
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveSettings();
        });
    }

    // Auto-save functionality
    let autoSaveTimeout;
    document.addEventListener('input', function(e) {
        if (e.target.matches('input, textarea, select')) {
            clearTimeout(autoSaveTimeout);
            autoSaveTimeout = setTimeout(() => {
                saveConfig(false);
            }, 2000);
        }
    });
}

// Populate forms with current data
function populateForms() {
    if (!currentConfig.profile) return;

    // Profile form
    document.getElementById('profileName').value = currentConfig.profile.name || '';
    document.getElementById('profileBio').value = currentConfig.profile.bio || '';
    document.getElementById('profileAvatar').value = currentConfig.profile.avatar || '';

    // Social form
    document.getElementById('twitterUrl').value = currentConfig.profile.social?.twitter || '';
    document.getElementById('instagramUrl').value = currentConfig.profile.social?.instagram || '';
    document.getElementById('linkedinUrl').value = currentConfig.profile.social?.linkedin || '';

    // Settings form
    const enableAnalytics = document.getElementById('enableAnalytics');
    const analyticsProvider = document.getElementById('analyticsProvider');
    const themeColor = document.getElementById('themeColor');
    const customDomain = document.getElementById('customDomain');
    
    if (enableAnalytics) enableAnalytics.value = currentConfig.analytics?.enable ? 'true' : 'false';
    if (analyticsProvider) analyticsProvider.value = currentConfig.analytics?.provider || 'local';
    if (themeColor) themeColor.value = currentConfig.theme?.primaryColor || '#c87941';
    if (customDomain) customDomain.value = currentConfig.settings?.customDomain || '';
}

// Save profile
function saveProfile() {
    currentConfig.profile = {
        ...currentConfig.profile,
        name: document.getElementById('profileName').value,
        bio: document.getElementById('profileBio').value,
        avatar: document.getElementById('profileAvatar').value,
        social: {
            twitter: document.getElementById('twitterUrl').value,
            instagram: document.getElementById('instagramUrl').value,
            linkedin: document.getElementById('linkedinUrl').value
        }
    };

    saveConfig(true);
    showToast('Profile saved successfully!', 'success');
}

// Save settings
function saveSettings() {
    currentConfig.analytics = {
        enable: document.getElementById('enableAnalytics').value === 'true',
        provider: document.getElementById('analyticsProvider').value
    };
    
    currentConfig.theme = {
        ...currentConfig.theme,
        primaryColor: document.getElementById('themeColor').value
    };
    
    currentConfig.settings = {
        ...currentConfig.settings,
        customDomain: document.getElementById('customDomain').value
    };

    saveConfig(true);
    showToast('Settings saved successfully!', 'success');
}

// Render links list
function renderLinksList() {
    const container = document.getElementById('linksList');
    const links = currentConfig.links || [];
    
    if (links.length === 0) {
        container.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; padding: 2rem;">No links added yet. Click "Add New Link" to get started.</p>';
        return;
    }

    container.innerHTML = links.map((link, index) => `
        <div class="link-item-editor" data-link-id="${link.id}">
            <div class="link-form">
                <div class="link-form-row">
                    <input type="text" placeholder="Link Title" value="${link.title || ''}" data-field="title" required>
                    <select data-field="type">
                        <option value="default" ${link.type === 'default' ? 'selected' : ''}>Default</option>
                        <option value="primary" ${link.type === 'primary' ? 'selected' : ''}>Primary</option>
                        <option value="secondary" ${link.type === 'secondary' ? 'selected' : ''}>Secondary</option>
                    </select>
                    <input type="text" placeholder="Icon (emoji)" value="${link.icon || ''}" data-field="icon">
                </div>
                <div class="link-form-row">
                    <input type="url" placeholder="URL" value="${link.url || ''}" data-field="url" style="grid-column: 1 / -1;" required>
                </div>
                <div class="link-form-row">
                    <input type="text" placeholder="Description" value="${link.description || ''}" data-field="description" style="grid-column: 1 / -1;">
                </div>
            </div>
            <div class="link-actions">
                <button class="btn btn-success" onclick="saveLink(${link.id})" title="Save Link">💾</button>
                <button class="btn btn-danger" onclick="deleteLink(${link.id})" title="Delete Link">🗑️</button>
            </div>
        </div>
    `).join('');

    // Add event listeners to form fields
    container.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('change', function() {
            const linkId = parseInt(this.closest('.link-item-editor').dataset.linkId);
            const fieldName = this.dataset.field;
            updateLinkField(linkId, fieldName, this.value);
        });
    });
}

// Add new link
function addNewLink() {
    if (!currentConfig.links) {
        currentConfig.links = [];
    }

    const newLink = {
        id: Date.now(),
        title: '',
        url: '',
        description: '',
        type: 'default',
        icon: '🔗'
    };

    currentConfig.links.push(newLink);
    renderLinksList();
    showToast('New link added! Fill in the details and save.', 'success');
    
    // Scroll to the new link
    setTimeout(() => {
        const newLinkElement = document.querySelector(`[data-link-id="${newLink.id}"]`);
        if (newLinkElement) {
            newLinkElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            newLinkElement.querySelector('input[data-field="title"]').focus();
        }
    }, 100);
}

// Update link field
function updateLinkField(linkId, fieldName, value) {
    const linkIndex = currentConfig.links.findIndex(link => link.id === linkId);
    if (linkIndex !== -1) {
        currentConfig.links[linkIndex][fieldName] = value;
    }
}

// Save link
function saveLink(linkId) {
    const linkIndex = currentConfig.links.findIndex(link => link.id === linkId);
    if (linkIndex === -1) {
        showToast('Link not found!', 'error');
        return;
    }

    const linkEditor = document.querySelector(`[data-link-id="${linkId}"]`);
    if (!linkEditor) return;

    // Update link data
    currentConfig.links[linkIndex] = {
        ...currentConfig.links[linkIndex],
        title: linkEditor.querySelector('[data-field="title"]').value,
        url: linkEditor.querySelector('[data-field="url"]').value,
        description: linkEditor.querySelector('[data-field="description"]').value,
        type: linkEditor.querySelector('[data-field="type"]').value,
        icon: linkEditor.querySelector('[data-field="icon"]').value
    };

    saveConfig(false);
    showToast('Link saved successfully!', 'success');
}

// Delete link
function deleteLink(linkId) {
    if (!confirm('Are you sure you want to delete this link? This action cannot be undone.')) {
        return;
    }

    currentConfig.links = currentConfig.links.filter(link => link.id !== linkId);
    renderLinksList();
    saveConfig(true);
    showToast('Link deleted successfully!', 'success');
}

// Save all links
function saveAllLinks() {
    saveConfig(true);
    showToast('All links saved successfully!', 'success');
}

// Save configuration
function saveConfig(showNotification = false) {
    localStorage.setItem('hlpflLinkConfig', JSON.stringify(currentConfig));
    
    if (showNotification) {
        showToast('Configuration saved locally!', 'success');
    }
}

// Export configuration
function exportConfig() {
    const dataStr = JSON.stringify(currentConfig, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `hlpfl-links-config-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    showToast('Configuration exported successfully!', 'success');
}

// Import configuration
function importConfig(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedConfig = JSON.parse(e.target.result);
            
            // Validate imported config
            if (!importedConfig.profile || !importedConfig.links) {
                throw new Error('Invalid configuration file');
            }
            
            currentConfig = importedConfig;
            populateForms();
            renderLinksList();
            saveConfig(true);
            showToast('Configuration imported successfully!', 'success');
        } catch (error) {
            showToast('Invalid configuration file! Please check the file format.', 'error');
            console.error('Import error:', error);
        }
    };
    reader.readAsText(file);
}

// Load analytics
function loadAnalytics() {
    const analyticsContainer = document.getElementById('analyticsData');
    
    // Get analytics from localStorage (in a real app, this would come from your analytics provider)
    const events = JSON.parse(localStorage.getItem('hlpflLinkEvents') || '[]');
    
    if (events.length === 0) {
        analyticsContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--color-text-muted);">
                <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
                <h3>No Analytics Data Yet</h3>
                <p>Analytics will appear once visitors start clicking your links.</p>
            </div>
        `;
        return;
    }

    // Calculate statistics
    const totalClicks = events.length;
    const uniqueLinks = [...new Set(events.map(e => e.label))].length;
    const lastClick = events.length > 0 ? new Date(events[events.length - 1].timestamp).toLocaleString() : 'Never';
    
    // Group clicks by link
    const linkClicks = {};
    events.forEach(event => {
        const label = event.label || 'Unknown';
        linkClicks[label] = (linkClicks[label] || 0) + 1;
    });

    // Group clicks by date
    const clicksByDate = {};
    events.forEach(event => {
        const date = new Date(event.timestamp).toLocaleDateString();
        clicksByDate[date] = (clicksByDate[date] || 0) + 1;
    });

    // Render analytics
    analyticsContainer.innerHTML = `
        <div class="analytics-stats">
            <div class="stat-card">
                <div class="stat-value">${totalClicks}</div>
                <div class="stat-label">Total Clicks</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${uniqueLinks}</div>
                <div class="stat-label">Unique Links Clicked</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${Object.keys(linkClicks).length}</div>
                <div class="stat-label">Different Links</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${Object.keys(clicksByDate).length}</div>
                <div class="stat-label">Active Days</div>
            </div>
        </div>
        
        <h3 style="margin: 2rem 0 1rem; color: #c87941;">🔗 Link Performance</h3>
        <div class="analytics-table">
            <table>
                <thead>
                    <tr>
                        <th>Link</th>
                        <th>Clicks</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(linkClicks)
                        .sort(([,a], [,b]) => b - a)
                        .map(([link, clicks]) => `
                            <tr>
                                <td>${link}</td>
                                <td><strong>${clicks}</strong></td>
                                <td>${((clicks / totalClicks) * 100).toFixed(1)}%</td>
                            </tr>
                        `).join('')}
                </tbody>
            </table>
        </div>
        
        <h3 style="margin: 2rem 0 1rem; color: #c87941;">📅 Daily Activity</h3>
        <div class="analytics-table">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(clicksByDate)
                        .sort(([a], [b]) => new Date(b) - new Date(a))
                        .slice(0, 10) // Show last 10 days
                        .map(([date, clicks]) => `
                            <tr>
                                <td>${date}</td>
                                <td><strong>${clicks}</strong></td>
                            </tr>
                        `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Refresh analytics
function refreshAnalytics() {
    loadAnalytics();
    showToast('Analytics refreshed!', 'success');
}

// Clear analytics
function clearAnalytics() {
    if (!confirm('Are you sure you want to clear all analytics data? This action cannot be undone.')) {
        return;
    }
    
    localStorage.removeItem('hlpflLinkEvents');
    loadAnalytics();
    showToast('Analytics data cleared!', 'success');
}

// Generate main files
function generateMainFiles() {
    // Create updated script.js with current config
    const scriptContent = `// HLPFL Link Data - Generated by Admin Panel
const linkData = ${JSON.stringify(currentConfig, null, 2)};

// Rest of the script.js content...`;
    
    // In a real application, this would save to the file system
    // or send to a backend endpoint
    showToast('Files generated! Download and deploy to see changes.', 'success');
    console.log('Generated script content:', scriptContent);
}

// Deploy changes (placeholder for actual deployment logic)
function deployChanges() {
    if (!confirm('This will deploy your changes to the live site. Continue?')) {
        return;
    }
    
    // In a real application, this would trigger a deployment
    showToast('Deployment started! This may take a few minutes...', 'success');
    
    // Simulate deployment process
    setTimeout(() => {
        showToast('Deployment completed successfully! 🚀', 'success');
    }, 3000);
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Export functions for external use
window.HLPFLAdmin = {
    exportConfig,
    importConfig,
    generateMainFiles,
    deployChanges,
    getCurrentConfig: () => currentConfig,
    saveConfig: () => saveConfig(true),
    loadAnalytics,
    showSection
};

// Auto-save every 30 seconds
setInterval(() => {
    saveConfig(false);
}, 30000);

// Warn before leaving if there are unsaved changes
window.addEventListener('beforeunload', function(e) {
    const hasUnsavedChanges = localStorage.getItem('hlpflLinkConfig') !== JSON.stringify(currentConfig);
    if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S to save
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveConfig(true);
        showToast('Configuration saved!', 'success');
    }
    
    // Ctrl/Cmd + E to export
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportConfig();
    }
    
    // Ctrl/Cmd + 1-4 for navigation
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                showSection('profile');
                break;
            case '2':
                e.preventDefault();
                showSection('links');
                break;
            case '3':
                e.preventDefault();
                showSection('analytics');
                break;
            case '4':
                e.preventDefault();
                showSection('settings');
                break;
        }
    }
});
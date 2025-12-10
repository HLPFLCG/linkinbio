// Admin Panel JavaScript
let currentConfig = {};

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    loadConfig();
    setupEventListeners();
    renderLinksList();
    loadAnalytics();
});

// Load configuration
function loadConfig() {
    // Try to load from localStorage first
    const savedConfig = localStorage.getItem('linkBioConfig');
    if (savedConfig) {
        currentConfig = JSON.parse(savedConfig);
    } else {
        // Load default config from config.json (in production)
        fetch('./config.json')
            .then(response => response.json())
            .then(config => {
                currentConfig = config;
                populateForms();
            })
            .catch(error => {
                console.error('Failed to load config:', error);
                // Use default config
                currentConfig = getDefaultConfig();
                populateForms();
            });
    }
    populateForms();
}

// Get default configuration
function getDefaultConfig() {
    return {
        profile: {
            name: "Your Name",
            bio: "Creator | Developer | Designer",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
            social: {
                twitter: "",
                instagram: "",
                linkedin: ""
            }
        },
        links: [],
        theme: {
            primaryColor: "#6366f1",
            secondaryColor: "#8b5cf6",
            backgroundColor: "#0f172a",
            surfaceColor: "#1e293b",
            textPrimary: "#f1f5f9",
            textSecondary: "#94a3b8"
        },
        analytics: {
            enable: true,
            provider: "cloudflare"
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

    // Social form
    document.getElementById('socialForm').addEventListener('submit', function(e) {
        e.preventDefault();
        saveSocialLinks();
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
}

// Save profile
function saveProfile() {
    currentConfig.profile = {
        ...currentConfig.profile,
        name: document.getElementById('profileName').value,
        bio: document.getElementById('profileBio').value,
        avatar: document.getElementById('profileAvatar').value
    };

    saveConfig();
    showToast('Profile saved successfully!', 'success');
}

// Save social links
function saveSocialLinks() {
    if (!currentConfig.profile.social) {
        currentConfig.profile.social = {};
    }

    currentConfig.profile.social = {
        twitter: document.getElementById('twitterUrl').value,
        instagram: document.getElementById('instagramUrl').value,
        linkedin: document.getElementById('linkedinUrl').value
    };

    saveConfig();
    showToast('Social links saved successfully!', 'success');
}

// Render links list
function renderLinksList() {
    const container = document.getElementById('linksList');
    const links = currentConfig.links || [];
    
    if (links.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">No links added yet. Click "Add Link" to get started.</p>';
        return;
    }

    container.innerHTML = links.map((link, index) => `
        <div class="link-item-editor" data-link-id="${link.id}">
            <div class="link-form">
                <div class="link-form-row">
                    <input type="text" placeholder="Link Title" value="${link.title || ''}" data-field="title">
                    <select data-field="type">
                        <option value="default" ${link.type === 'default' ? 'selected' : ''}>Default</option>
                        <option value="primary" ${link.type === 'primary' ? 'selected' : ''}>Primary</option>
                        <option value="secondary" ${link.type === 'secondary' ? 'selected' : ''}>Secondary</option>
                    </select>
                    <input type="text" placeholder="Icon (emoji)" value="${link.icon || ''}" data-field="icon">
                </div>
                <div class="link-form-row">
                    <input type="url" placeholder="URL" value="${link.url || ''}" data-field="url" style="grid-column: 1 / -1;">
                </div>
                <div class="link-form-row">
                    <input type="text" placeholder="Description" value="${link.description || ''}" data-field="description" style="grid-column: 1 / -1;">
                </div>
            </div>
            <div class="link-actions">
                <button class="btn btn-success" onclick="saveLink(${link.id})">💾</button>
                <button class="btn btn-danger" onclick="deleteLink(${link.id})">🗑️</button>
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

    saveConfig();
    showToast('Link saved successfully!', 'success');
}

// Delete link
function deleteLink(linkId) {
    if (!confirm('Are you sure you want to delete this link?')) {
        return;
    }

    currentConfig.links = currentConfig.links.filter(link => link.id !== linkId);
    renderLinksList();
    saveConfig();
    showToast('Link deleted successfully!', 'success');
}

// Save configuration
function saveConfig() {
    localStorage.setItem('linkBioConfig', JSON.stringify(currentConfig));
    
    // In a real application, you would also save to a backend or file
    // For now, we'll just show a message about manual deployment
    showToast('Configuration saved locally! Remember to deploy changes to see them live.', 'success');
}

// Export configuration
function exportConfig() {
    const dataStr = JSON.stringify(currentConfig, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `linkbio-config-${new Date().toISOString().split('T')[0]}.json`;
    
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
            currentConfig = importedConfig;
            populateForms();
            renderLinksList();
            saveConfig();
            showToast('Configuration imported successfully!', 'success');
        } catch (error) {
            showToast('Invalid configuration file!', 'error');
        }
    };
    reader.readAsText(file);
}

// Load analytics
function loadAnalytics() {
    const analyticsContainer = document.getElementById('analyticsData');
    
    // Get analytics from localStorage (in a real app, this would come from your analytics provider)
    const events = JSON.parse(localStorage.getItem('linkEvents') || '[]');
    
    if (events.length === 0) {
        analyticsContainer.innerHTML = '<p style="color: var(--text-secondary);">No analytics data available yet.</p>';
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
                <div class="stat-value">${lastClick}</div>
                <div class="stat-label">Last Click</div>
            </div>
        </div>
        
        <h3 style="margin: 2rem 0 1rem; color: var(--text-primary);">Link Performance</h3>
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
                                <td>${clicks}</td>
                                <td>${((clicks / totalClicks) * 100).toFixed(1)}%</td>
                            </tr>
                        `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Generate main files
function generateMainFiles() {
    // Generate updated script.js with current config
    const scriptContent = `// Link data configuration
const linkData = ${JSON.stringify(currentConfig, null, 2)};

// Rest of the script.js content...`;
    
    // In a real application, you would save this to the file system
    // or send it to a backend endpoint
    showToast('Files generated! Download and deploy to see changes.', 'success');
}

// Deploy changes (placeholder for actual deployment logic)
function deployChanges() {
    if (!confirm('This will deploy your changes to the live site. Continue?')) {
        return;
    }
    
    // In a real application, this would trigger a deployment
    showToast('Deployment started! This may take a few minutes...', 'success');
}

// Export for external use
window.LinkBioAdmin = {
    exportConfig,
    importConfig,
    generateMainFiles,
    deployChanges,
    getCurrentConfig: () => currentConfig
};
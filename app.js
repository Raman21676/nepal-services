/**
 * Nepal Services Directory - Main Application
 * Beautiful, fast, and accessible service directory for Nepal
 */

class NepalServicesApp {
    constructor() {
        this.allData = [];
        this.filteredData = [];
        this.availableCities = new Set();
        this.availableDistricts = new Set();
        this.availableProvinces = new Set();
        this.availableCategories = new Set();
        
        this.currentPage = 1;
        
        // Initialize modules
        this.dataLoader = dataLoader;
        this.filterManager = null;
        this.uiRenderer = null;
        
        // Set current year in footer
        this.setCurrentYear();
    }
    
    async init() {
        this.showLoading();
        
        // Track this page visit
        trackPageView();
        
        try {
            // Load all data
            const data = await this.dataLoader.loadAllData();
            this.allData = data.allData;
            this.filteredData = [...this.allData];
            this.availableCities = data.availableCities;
            this.availableDistricts = data.availableDistricts;
            this.availableProvinces = data.availableProvinces;
            this.availableCategories = data.availableCategories;
            
            // Initialize modules
            this.filterManager = new FilterManager(this);
            this.uiRenderer = new UIRenderer(this);
            
            // Initialize Fuse.js
            this.filterManager.initFuse();
            
            // Setup UI
            this.populateFilters();
            this.uiRenderer.renderResults();
            this.uiRenderer.updateResultsCount();
            
            // Restore view preference
            this.filterManager.restoreViewPreference();
            
            // Update hero stats after a short delay for animation
            setTimeout(() => {
                this.uiRenderer.updateHeroStats();
            }, 500);
            
            console.log(`✅ Nepal Services Directory loaded successfully`);
            console.log(`📊 Total records: ${this.allData.length}`);
            console.log(`🏙️ Cities: ${this.availableCities.size}`);
            console.log(`🏛️ Districts: ${this.availableDistricts.size}`);
            
        } catch (error) {
            console.error('❌ Error initializing app:', error);
            this.showError('Failed to load data. Please refresh the page.');
        }
        
        this.hideLoading();
    }
    
    renderResults() {
        if (this.uiRenderer) {
            this.uiRenderer.renderResults();
        }
    }
    
    updateResultsCount() {
        if (this.uiRenderer) {
            this.uiRenderer.updateResultsCount();
        }
    }
    
    populateFilters() {
        // Get filter elements
        const provinceFilter = document.getElementById('provinceFilter');
        const districtFilter = document.getElementById('districtFilter');
        const cityFilter = document.getElementById('cityFilter');
        const categoryFilter = document.getElementById('categoryFilter');
        
        const provinceNames = CONFIG.PROVINCE_NAMES;
        const categoryNames = CONFIG.CATEGORY_NAMES;
        
        // Populate province filter (keep the first option "All Provinces")
        while (provinceFilter.options.length > 1) {
            provinceFilter.remove(1);
        }
        const sortedProvinces = Array.from(this.availableProvinces).sort();
        sortedProvinces.forEach(province => {
            const option = document.createElement('option');
            option.value = province;
            option.textContent = provinceNames[province] || this.capitalizeFirst(province);
            provinceFilter.appendChild(option);
        });
        
        // Populate district filter (keep the first option "All Districts")
        while (districtFilter.options.length > 1) {
            districtFilter.remove(1);
        }
        const sortedDistricts = Array.from(this.availableDistricts).sort();
        sortedDistricts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = this.capitalizeFirst(district);
            districtFilter.appendChild(option);
        });
        
        // Populate city filter (keep the first option "All Cities")
        while (cityFilter.options.length > 1) {
            cityFilter.remove(1);
        }
        const sortedCities = Array.from(this.availableCities).sort();
        sortedCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = this.capitalizeFirst(city);
            cityFilter.appendChild(option);
        });
        
        // Populate category filter (keep the first option "All Categories")
        while (categoryFilter.options.length > 1) {
            categoryFilter.remove(1);
        }
        const sortedCategories = Array.from(this.availableCategories).sort();
        sortedCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = categoryNames[category] || this.capitalizeFirst(category);
            categoryFilter.appendChild(option);
        });
    }
    
    goToPage(page) {
        const totalPages = Math.ceil(this.filteredData.length / CONFIG.ITEMS_PER_PAGE);
        if (page < 1 || page > totalPages) return;
        
        this.currentPage = page;
        this.uiRenderer.renderResults();
        
        // Scroll to top of results smoothly
        const searchSection = document.querySelector('.search-section');
        if (searchSection) {
            const offset = searchSection.offsetTop + searchSection.offsetHeight - 100;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        }
    }
    
    showLoading() {
        const loading = document.getElementById('loading');
        const resultsSection = document.getElementById('resultsSection');
        if (loading) loading.classList.remove('hidden');
        if (resultsSection) resultsSection.classList.add('hidden');
    }
    
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) loading.classList.add('hidden');
    }
    
    showError(message) {
        const resultsGrid = document.getElementById('resultsGrid');
        const resultsSection = document.getElementById('resultsSection');
        const noResults = document.getElementById('noResults');
        
        if (resultsGrid) {
            resultsGrid.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">
                        <i class="fas fa-exclamation-triangle"></i>
                    </div>
                    <h3>Oops! Something went wrong</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="search-btn" style="margin-top: 20px;">
                        <i class="fas fa-redo"></i> Reload Page
                    </button>
                </div>
            `;
        }
        
        if (resultsSection) resultsSection.classList.remove('hidden');
        if (noResults) noResults.classList.add('hidden');
    }
    
    setCurrentYear() {
        const yearEl = document.getElementById('currentYear');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }
    
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

/**
 * Nepal Services Directory - Theme Manager
 * Handles dark/light mode switching with animated toggle
 */
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('preferredTheme') || 'light';
    }
    
    init() {
        // Apply saved theme
        this.applyTheme(this.currentTheme);
        
        // Create toggle button
        this.createToggleButton();
        
        // Listen for system theme changes
        this.listenToSystemTheme();
    }
    
    createToggleButton() {
        // Remove existing toggle if any
        const existing = document.querySelector('.theme-toggle-container');
        if (existing) existing.remove();
        
        // Create container
        const container = document.createElement('div');
        container.className = 'theme-toggle-container';
        container.innerHTML = `
            <label class="theme-switch" for="themeToggle">
                <input type="checkbox" id="themeToggle" ${this.currentTheme === 'dark' ? 'checked' : ''}>
                <span class="theme-slider">
                    <span class="theme-slider-content">
                        <span class="sun-moon">
                            <span class="craters"></span>
                        </span>
                        <span class="stars">
                            <span class="star"></span>
                            <span class="star"></span>
                            <span class="star"></span>
                        </span>
                        <span class="clouds">
                            <span class="cloud"></span>
                            <span class="cloud"></span>
                        </span>
                    </span>
                </span>
            </label>
        `;
        
        // Append to body so it's fixed positioned relative to viewport
        document.body.appendChild(container);
        
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.addEventListener('change', () => this.toggleTheme());
        }
    }
    
    applyTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('preferredTheme', theme);
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.content = theme === 'dark' ? '#0f172a' : '#ffffff';
        }
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }
    
    listenToSystemTheme() {
        // Only auto-switch if user hasn't manually set a preference
        if (localStorage.getItem('preferredTheme')) return;
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = (e) => {
            const newTheme = e.matches ? 'dark' : 'light';
            this.applyTheme(newTheme);
            
            // Update toggle state
            const toggle = document.getElementById('themeToggle');
            if (toggle) {
                toggle.checked = newTheme === 'dark';
            }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        
        // Apply initial system preference
        if (mediaQuery.matches) {
            this.applyTheme('dark');
            const toggle = document.getElementById('themeToggle');
            if (toggle) toggle.checked = true;
        }
    }
}

// Simple client-side analytics tracking (stores in localStorage)
function trackPageView() {
    try {
        const today = new Date().toISOString().split('T')[0];
        const stats = JSON.parse(localStorage.getItem('nepalServicesStats') || '{"pageViews": {}, "searches": {}, "visits": []}');
        
        stats.pageViews[today] = (stats.pageViews[today] || 0) + 1;
        
        // Track unique session (30 min window)
        const lastVisit = localStorage.getItem('nepalServicesLastVisit');
        const now = Date.now();
        if (!lastVisit || (now - parseInt(lastVisit)) > 30 * 60 * 1000) {
            stats.visits.push({ date: today, timestamp: now });
        }
        localStorage.setItem('nepalServicesLastVisit', now);
        localStorage.setItem('nepalServicesStats', JSON.stringify(stats));
    } catch (e) {
        console.warn('Analytics tracking failed', e);
    }
}

function trackSearchQuery(term) {
    if (!term || term.trim().length < 2) return;
    try {
        const today = new Date().toISOString().split('T')[0];
        const stats = JSON.parse(localStorage.getItem('nepalServicesStats') || '{"pageViews": {}, "searches": {}, "visits": []}');
        stats.searches[today] = (stats.searches[today] || 0) + 1;
        localStorage.setItem('nepalServicesStats', JSON.stringify(stats));
    } catch (e) {
        console.warn('Search tracking failed', e);
    }
}

// Initialize app when DOM is ready
let app;
const themeManager = new ThemeManager();

document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
    app = new NepalServicesApp();
    app.init();
});

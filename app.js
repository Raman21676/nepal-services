/**
 * Nepal Services Directory - Main Application
 * Modular architecture with separated concerns
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
    }
    
    async init() {
        this.showLoading();
        
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
            
            // Setup UI
            this.populateFilters();
            this.uiRenderer.renderResults();
            this.uiRenderer.updateResultsCount();
            
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showError('Failed to load data. Please refresh the page.');
        }
        
        this.hideLoading();
    }
    
    populateFilters() {
        // Populate province filter
        const provinceFilter = document.getElementById('provinceFilter');
        const provinceNames = CONFIG.PROVINCE_NAMES;
        
        const sortedProvinces = Array.from(this.availableProvinces).sort();
        sortedProvinces.forEach(province => {
            const option = document.createElement('option');
            option.value = province;
            option.textContent = provinceNames[province] || province;
            provinceFilter.appendChild(option);
        });
        
        // Populate district filter
        const districtFilter = document.getElementById('districtFilter');
        const sortedDistricts = Array.from(this.availableDistricts).sort();
        sortedDistricts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district.charAt(0).toUpperCase() + district.slice(1);
            districtFilter.appendChild(option);
        });
        
        // Populate city filter
        const cityFilter = document.getElementById('cityFilter');
        const sortedCities = Array.from(this.availableCities).sort();
        sortedCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city.charAt(0).toUpperCase() + city.slice(1);
            cityFilter.appendChild(option);
        });
        
        // Populate category filter
        const categoryFilter = document.getElementById('categoryFilter');
        const categoryNames = CONFIG.CATEGORY_NAMES;
        
        // Clear existing options except "All Categories"
        while (categoryFilter.options.length > 1) {
            categoryFilter.remove(1);
        }
        
        const sortedCategories = Array.from(this.availableCategories).sort();
        sortedCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = categoryNames[category] || category;
            categoryFilter.appendChild(option);
        });
    }
    
    goToPage(page) {
        const totalPages = Math.ceil(this.filteredData.length / CONFIG.ITEMS_PER_PAGE);
        if (page < 1 || page > totalPages) return;
        
        this.currentPage = page;
        this.uiRenderer.renderResults();
        
        // Scroll to top of results
        document.getElementById('resultsContainer').scrollIntoView({ behavior: 'smooth' });
    }
    
    showLoading() {
        document.getElementById('loading').style.display = 'flex';
    }
    
    hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }
    
    showError(message) {
        document.getElementById('resultsContainer').innerHTML = `
            <div class="error-message">
                <p>⚠️ ${message}</p>
            </div>
        `;
    }
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new NepalServicesApp();
    app.init();
});

/**
 * Nepal Services Directory - Filters Module
 * Handles all filter-related functionality with Fuse.js fuzzy search
 */

class FilterManager {
    constructor(app) {
        this.app = app;
        this.fuse = null;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        const clearBtn = document.getElementById('clearSearch');
        let debounceTimer;
        
        // Search input with debounce
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            
            // Show/hide clear button
            if (e.target.value) {
                clearBtn.classList.remove('hidden');
            } else {
                clearBtn.classList.add('hidden');
            }
            
            debounceTimer = setTimeout(() => this.handleSearch(), 200);
        });
        
        // Clear search button
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearBtn.classList.add('hidden');
            searchInput.focus();
            this.handleSearch();
        });
        
        // Search button
        document.getElementById('searchBtn').addEventListener('click', () => this.handleSearch());
        
        // Filter dropdowns
        document.getElementById('provinceFilter').addEventListener('change', () => this.handleProvinceChange());
        document.getElementById('districtFilter').addEventListener('change', () => this.handleDistrictChange());
        document.getElementById('cityFilter').addEventListener('change', () => this.handleSearch());
        document.getElementById('categoryFilter').addEventListener('change', () => this.handleSearch());
        document.getElementById('typeFilter').addEventListener('change', () => this.handleSearch());
        
        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => this.resetFilters());
        
        // Quick filters
        document.querySelectorAll('.quick-filter').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleQuickFilter(e));
        });
        
        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleViewToggle(e));
        });
        
        // Search suggestions
        document.querySelectorAll('.suggestion-tag').forEach(tag => {
            tag.addEventListener('click', (e) => {
                const searchTerm = e.target.dataset.search;
                searchInput.value = searchTerm;
                clearBtn.classList.remove('hidden');
                this.handleSearch();
            });
        });
        
        // Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
    }
    
    initFuse() {
        // Initialize Fuse.js for fuzzy search with improved ranking
        const options = {
            keys: [
                { name: 'name', weight: 0.6 },                    // Highest weight for name
                { name: 'hospital_name', weight: 0.6 },
                { name: 'school_name', weight: 0.6 },
                { name: 'service_name', weight: 0.6 },
                { name: 'office_name', weight: 0.6 },
                { name: 'contact_name', weight: 0.6 },
                { name: 'address', weight: 0.1 },
                { name: 'type', weight: 0.1 },
                { name: '_city', weight: 0.05 },
                { name: '_district', weight: 0.05 },
                { name: 'specialties', weight: 0.1 },
                { name: 'services', weight: 0.1 },
                { name: 'programs', weight: 0.1 }
            ],
            threshold: 0.4,              // Match threshold (0.0 = exact, 1.0 = match anything)
            distance: 100,
            includeScore: true,          // Include match score for ranking
            minMatchCharLength: 2,       // Minimum 2 characters to match
            shouldSort: true,            // Sort by relevance score
            findAllMatches: true,
            ignoreLocation: false,       // Respect word location (matches at start score higher)
            useExtendedSearch: true,
            ignoreFieldNorm: false       // Consider field length in scoring
        };
        
        this.fuse = new Fuse(this.app.allData, options);
    }
    
    handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.trim();
        const provinceFilter = document.getElementById('provinceFilter').value;
        const districtFilter = document.getElementById('districtFilter').value;
        const cityFilter = document.getElementById('cityFilter').value;
        const categoryFilter = document.getElementById('categoryFilter').value;
        const typeFilter = document.getElementById('typeFilter').value;
        
        let results = [];
        let fuseResults = [];
        
        // If there's a search term, use Fuse.js for fuzzy search
        if (searchTerm) {
            if (!this.fuse) {
                this.initFuse();
            }
            fuseResults = this.fuse.search(searchTerm);
            results = fuseResults.map(r => ({...r.item, _matchScore: r.score}));
            
            // Sort by relevance: exact matches first, then by Fuse.js score
            const lowerSearchTerm = searchTerm.toLowerCase();
            results.sort((a, b) => {
                const nameA = (a.name || a.hospital_name || a.school_name || '').toLowerCase();
                const nameB = (b.name || b.hospital_name || b.school_name || '').toLowerCase();
                
                // Check if name starts with search term (highest priority)
                const aStartsWith = nameA.startsWith(lowerSearchTerm);
                const bStartsWith = nameB.startsWith(lowerSearchTerm);
                if (aStartsWith && !bStartsWith) return -1;
                if (!aStartsWith && bStartsWith) return 1;
                
                // Check if name contains search term as whole word (second priority)
                const aContainsWord = nameA.includes(' ' + lowerSearchTerm) || nameA.includes(lowerSearchTerm + ' ');
                const bContainsWord = nameB.includes(' ' + lowerSearchTerm) || nameB.includes(lowerSearchTerm + ' ');
                if (aContainsWord && !bContainsWord) return -1;
                if (!aContainsWord && bContainsWord) return 1;
                
                // Check if name contains search term anywhere (third priority)
                const aContains = nameA.includes(lowerSearchTerm);
                const bContains = nameB.includes(lowerSearchTerm);
                if (aContains && !bContains) return -1;
                if (!aContains && bContains) return 1;
                
                // Finally sort by Fuse.js match score (lower is better)
                return (a._matchScore || 1) - (b._matchScore || 1);
            });
        } else {
            results = [...this.app.allData];
        }
        
        // Apply additional filters
        results = results.filter(item => {
            if (provinceFilter !== 'all' && item._province !== provinceFilter) {
                return false;
            }
            
            if (districtFilter !== 'all' && item._district !== districtFilter) {
                return false;
            }
            
            if (cityFilter !== 'all' && item._city !== cityFilter) {
                return false;
            }
            
            if (categoryFilter !== 'all' && item._category !== categoryFilter) {
                return false;
            }
            
            if (typeFilter !== 'all') {
                const itemType = this.getItemType(item);
                if (itemType !== typeFilter) {
                    return false;
                }
            }
            
            return true;
        });
        
        this.app.filteredData = results;
        this.app.currentPage = 1;
        this.app.renderResults();
        this.app.updateResultsCount();
        
        // Update quick filter active state
        this.updateQuickFilterState(categoryFilter);
    }
    
    handleQuickFilter(e) {
        const category = e.currentTarget.dataset.category;
        const categoryFilter = document.getElementById('categoryFilter');
        
        // Toggle active state
        if (categoryFilter.value === category) {
            categoryFilter.value = 'all';
        } else {
            categoryFilter.value = category;
        }
        
        this.handleSearch();
    }
    
    updateQuickFilterState(activeCategory) {
        document.querySelectorAll('.quick-filter').forEach(btn => {
            if (btn.dataset.category === activeCategory) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    handleViewToggle(e) {
        const view = e.currentTarget.dataset.view;
        const resultsGrid = document.getElementById('resultsGrid');
        
        // Update button states
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
        
        // Update grid class
        if (view === 'list') {
            resultsGrid.classList.add('list-view');
        } else {
            resultsGrid.classList.remove('list-view');
        }
        
        // Store preference
        localStorage.setItem('preferredView', view);
    }
    
    getItemType(item) {
        if (item.type) return item.type.toLowerCase();
        if (item.ownership) return item.ownership.toLowerCase();
        if (item._category === 'ward' || item._category === 'emergency' || item._category === 'government') {
            return 'government';
        }
        return 'private';
    }
    
    handleProvinceChange() {
        const provinceFilter = document.getElementById('provinceFilter').value;
        const districtFilter = document.getElementById('districtFilter');
        const cityFilter = document.getElementById('cityFilter');
        
        // Reset district and city when province changes
        districtFilter.value = 'all';
        cityFilter.value = 'all';
        
        // Clear district and city options
        while (districtFilter.options.length > 1) {
            districtFilter.remove(1);
        }
        
        while (cityFilter.options.length > 1) {
            cityFilter.remove(1);
        }
        
        if (provinceFilter === 'all') {
            // Show all districts and cities
            this.populateAllOptions();
        } else {
            // Show only districts in selected province
            const districtsInProvince = new Set(
                this.app.allData
                    .filter(item => item._province === provinceFilter)
                    .map(item => item._district)
            );
            const sortedDistricts = Array.from(districtsInProvince).sort();
            sortedDistricts.forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = this.translateDistrict(district);
                districtFilter.appendChild(option);
            });
        }
        
        this.handleSearch();
    }
    
    handleDistrictChange() {
        const districtFilterValue = document.getElementById('districtFilter').value;
        const provinceFilter = document.getElementById('provinceFilter').value;
        const cityFilter = document.getElementById('cityFilter');
        
        // Reset city when district changes
        cityFilter.value = 'all';
        
        // Update city options based on district
        while (cityFilter.options.length > 1) {
            cityFilter.remove(1);
        }
        
        if (districtFilterValue === 'all') {
            // Show all cities (respecting province if selected)
            let cities;
            if (provinceFilter === 'all') {
                cities = this.app.availableCities;
            } else {
                cities = new Set(
                    this.app.allData
                        .filter(item => item._province === provinceFilter)
                        .map(item => item._city)
                );
            }
            const sortedCities = Array.from(cities).sort();
            sortedCities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = this.capitalizeFirst(city);
                cityFilter.appendChild(option);
            });
        } else {
            // Show only cities in selected district
            const citiesInDistrict = new Set(
                this.app.allData
                    .filter(item => item._district === districtFilterValue)
                    .map(item => item._city)
            );
            const sortedCities = Array.from(citiesInDistrict).sort();
            sortedCities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = this.capitalizeFirst(city);
                cityFilter.appendChild(option);
            });
        }
        
        this.handleSearch();
    }
    
    populateAllOptions() {
        const districtFilter = document.getElementById('districtFilter');
        const cityFilter = document.getElementById('cityFilter');
        
        // Clear existing options except "All"
        while (districtFilter.options.length > 1) {
            districtFilter.remove(1);
        }
        while (cityFilter.options.length > 1) {
            cityFilter.remove(1);
        }
        
        // Populate all districts
        const sortedDistricts = Array.from(this.app.availableDistricts).sort();
        sortedDistricts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = this.translateDistrict(district);
            districtFilter.appendChild(option);
        });
        
        // Populate all cities
        const sortedCities = Array.from(this.app.availableCities).sort();
        sortedCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = this.capitalizeFirst(city);
            cityFilter.appendChild(option);
        });
    }
    
    resetFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('clearSearch').classList.add('hidden');
        document.getElementById('provinceFilter').value = 'all';
        document.getElementById('districtFilter').value = 'all';
        document.getElementById('cityFilter').value = 'all';
        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('typeFilter').value = 'all';
        
        // Reset quick filters
        document.querySelectorAll('.quick-filter').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Repopulate all options
        this.populateAllOptions();
        
        this.app.filteredData = [...this.app.allData];
        this.app.currentPage = 1;
        this.app.renderResults();
        this.app.updateResultsCount();
        
        // Show toast
        this.showToast('Filters reset successfully', 'success');
    }
    
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    translateDistrict(districtKey) {
        if (typeof i18n !== 'undefined' && i18n.isLoaded) {
            return i18n.t(`districts.${districtKey}`);
        }
        return this.capitalizeFirst(districtKey);
    }
    
    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'success' ? 'check-circle' : 
                    type === 'error' ? 'exclamation-circle' : 'info-circle';
        
        toast.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    restoreViewPreference() {
        const preferredView = localStorage.getItem('preferredView') || 'grid';
        const btn = document.querySelector(`.view-btn[data-view="${preferredView}"]`);
        if (btn) {
            btn.click();
        }
    }
}

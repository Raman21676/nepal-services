/**
 * Nepal Services Directory - Filters Module
 * Handles all filter-related functionality
 */

class FilterManager {
    constructor(app) {
        this.app = app;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        let debounceTimer;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => this.handleSearch(), 300);
        });
        
        document.getElementById('searchBtn').addEventListener('click', () => this.handleSearch());
        document.getElementById('provinceFilter').addEventListener('change', () => this.handleProvinceChange());
        document.getElementById('districtFilter').addEventListener('change', () => this.handleDistrictChange());
        document.getElementById('cityFilter').addEventListener('change', () => this.handleSearch());
        document.getElementById('categoryFilter').addEventListener('change', () => this.handleSearch());
        document.getElementById('typeFilter').addEventListener('change', () => this.handleSearch());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetFilters());
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
    }
    
    handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        const provinceFilter = document.getElementById('provinceFilter').value;
        const districtFilter = document.getElementById('districtFilter').value;
        const cityFilter = document.getElementById('cityFilter').value;
        const categoryFilter = document.getElementById('categoryFilter').value;
        const typeFilter = document.getElementById('typeFilter').value;
        
        this.app.filteredData = this.app.allData.filter(item => {
            if (searchTerm && !item._searchText.includes(searchTerm)) {
                return false;
            }
            
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
        
        this.app.currentPage = 1;
        this.app.renderResults();
        this.app.updateResultsCount();
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
        
        // Update district options based on province
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
                option.textContent = district.charAt(0).toUpperCase() + district.slice(1);
                districtFilter.appendChild(option);
            });
        }
        
        this.handleSearch();
    }
    
    handleDistrictChange() {
        const districtFilter = document.getElementById('districtFilter').value;
        const cityFilter = document.getElementById('cityFilter');
        
        // Reset city when district changes
        cityFilter.value = 'all';
        
        // Update city options based on district
        while (cityFilter.options.length > 1) {
            cityFilter.remove(1);
        }
        
        if (districtFilter === 'all') {
            // Show all cities (respecting province if selected)
            const provinceFilter = document.getElementById('provinceFilter').value;
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
                option.textContent = city.charAt(0).toUpperCase() + city.slice(1);
                cityFilter.appendChild(option);
            });
        } else {
            // Show only cities in selected district
            const citiesInDistrict = new Set(
                this.app.allData
                    .filter(item => item._district === districtFilter)
                    .map(item => item._city)
            );
            const sortedCities = Array.from(citiesInDistrict).sort();
            sortedCities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city.charAt(0).toUpperCase() + city.slice(1);
                cityFilter.appendChild(option);
            });
        }
        
        this.handleSearch();
    }
    
    populateAllOptions() {
        const districtFilter = document.getElementById('districtFilter');
        const cityFilter = document.getElementById('cityFilter');
        
        // Populate all districts
        const sortedDistricts = Array.from(this.app.availableDistricts).sort();
        sortedDistricts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district.charAt(0).toUpperCase() + district.slice(1);
            districtFilter.appendChild(option);
        });
        
        // Populate all cities
        const sortedCities = Array.from(this.app.availableCities).sort();
        sortedCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city.charAt(0).toUpperCase() + city.slice(1);
            cityFilter.appendChild(option);
        });
    }
    
    resetFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('provinceFilter').value = 'all';
        document.getElementById('districtFilter').value = 'all';
        document.getElementById('cityFilter').value = 'all';
        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('typeFilter').value = 'all';
        
        // Repopulate all options
        const districtFilter = document.getElementById('districtFilter');
        const cityFilter = document.getElementById('cityFilter');
        
        while (districtFilter.options.length > 1) districtFilter.remove(1);
        while (cityFilter.options.length > 1) cityFilter.remove(1);
        
        this.populateAllOptions();
        
        this.app.filteredData = [...this.app.allData];
        this.app.currentPage = 1;
        this.app.renderResults();
        this.app.updateResultsCount();
    }
}

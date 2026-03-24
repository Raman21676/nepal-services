// Nepal Services Directory - Main Application
// Handles data loading, search, and filtering

class NepalServicesApp {
    constructor() {
        this.allData = [];
        this.filteredData = [];
        this.dataFiles = [
            'data/provinces/bagmati/kathmandu/kathmandu_hospitals.json',
            'data/provinces/bagmati/kathmandu/kathmandu_schools.json',
            'data/provinces/bagmati/kathmandu/kathmandu_ambulance_services.json',
            'data/provinces/bagmati/kathmandu/kathmandu_ward_offices.json',
            'data/provinces/province-1-koshi/morang/biratnagar_hospitals.json',
            'data/provinces/province-1-koshi/morang/biratnagar_schools.json',
            'data/provinces/province-1-koshi/morang/biratnagar_ambulance_services.json',
            'data/provinces/province-1-koshi/morang/biratnagar_ward_offices.json',
            'data/provinces/province-1-koshi/morang/biratnagar_emergency_contacts.json',
            'data/national/emergency_contacts.json'
        ];
        
        this.init();
    }
    
    async init() {
        this.setupEventListeners();
        await this.loadAllData();
        this.renderResults();
    }
    
    setupEventListeners() {
        // Search input with debounce
        const searchInput = document.getElementById('searchInput');
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => this.handleSearch(), 300);
        });
        
        // Search button
        document.getElementById('searchBtn').addEventListener('click', () => this.handleSearch());
        
        // Filters
        document.getElementById('cityFilter').addEventListener('change', () => this.handleSearch());
        document.getElementById('categoryFilter').addEventListener('change', () => this.handleSearch());
        document.getElementById('typeFilter').addEventListener('change', () => this.handleSearch());
        
        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => this.resetFilters());
        
        // Enter key on search
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
    }
    
    async loadAllData() {
        const loadingPromises = this.dataFiles.map(file => this.loadJSON(file));
        const results = await Promise.allSettled(loadingPromises);
        
        results.forEach((result, index) => {
            if (result.status === 'fulfilled' && result.value) {
                const fileName = this.dataFiles[index];
                const processedData = this.processData(result.value, fileName);
                this.allData.push(...processedData);
            }
        });
        
        this.filteredData = [...this.allData];
        this.updateResultsCount();
    }
    
    async loadJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.json();
        } catch (error) {
            console.warn(`Failed to load ${url}:`, error);
            return null;
        }
    }
    
    processData(data, fileName) {
        const records = [];
        const city = fileName.includes('kathmandu') ? 'kathmandu' : 
                     fileName.includes('morang') ? 'biratnagar' : 'other';
        
        let category = 'other';
        if (fileName.includes('hospital')) category = 'hospitals';
        else if (fileName.includes('school')) category = 'schools';
        else if (fileName.includes('ambulance')) category = 'ambulance';
        else if (fileName.includes('emergency')) category = 'emergency';
        else if (fileName.includes('ward')) category = 'ward';
        
        // Handle different data structures
        if (data.hospitals) {
            data.hospitals.forEach(item => {
                records.push(this.createRecord(item, city, category, 'hospital'));
            });
        } else if (data.schools) {
            data.schools.forEach(item => {
                records.push(this.createRecord(item, city, category, 'school'));
            });
        } else if (data.ambulance_services) {
            data.ambulance_services.forEach(item => {
                records.push(this.createRecord(item, city, category, 'ambulance'));
            });
        } else if (data.emergency_contacts) {
            data.emergency_contacts.forEach(item => {
                records.push(this.createRecord(item, city, category, 'emergency'));
            });
        } else if (data.ward_offices) {
            data.ward_offices.forEach(item => {
                records.push(this.createRecord(item, city, category, 'ward'));
            });
        }
        
        return records;
    }
    
    createRecord(item, city, category, type) {
        return {
            ...item,
            _city: city,
            _category: category,
            _type: type,
            _searchText: this.createSearchText(item)
        };
    }
    
    createSearchText(item) {
        // Create a searchable string from all item properties
        const values = Object.values(item).filter(v => 
            typeof v === 'string' || typeof v === 'number'
        );
        return values.join(' ').toLowerCase();
    }
    
    handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        const cityFilter = document.getElementById('cityFilter').value;
        const categoryFilter = document.getElementById('categoryFilter').value;
        const typeFilter = document.getElementById('typeFilter').value;
        
        this.filteredData = this.allData.filter(item => {
            // Search term filter
            if (searchTerm && !item._searchText.includes(searchTerm)) {
                return false;
            }
            
            // City filter
            if (cityFilter !== 'all' && item._city !== cityFilter) {
                return false;
            }
            
            // Category filter
            if (categoryFilter !== 'all' && item._category !== categoryFilter) {
                return false;
            }
            
            // Type filter
            if (typeFilter !== 'all') {
                const itemType = this.getItemType(item);
                if (itemType !== typeFilter) return false;
            }
            
            return true;
        });
        
        this.renderResults();
        this.updateResultsCount();
    }
    
    getItemType(item) {
        if (item.type) return item.type.toLowerCase();
        if (item.ownership) return item.ownership.toLowerCase();
        if (item._category === 'ward') return 'government';
        if (item._category === 'emergency') return 'government';
        return 'private';
    }
    
    resetFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('cityFilter').value = 'all';
        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('typeFilter').value = 'all';
        this.filteredData = [...this.allData];
        this.renderResults();
        this.updateResultsCount();
    }
    
    renderResults() {
        const grid = document.getElementById('resultsGrid');
        const noResults = document.getElementById('noResults');
        
        if (this.filteredData.length === 0) {
            grid.innerHTML = '';
            noResults.classList.remove('hidden');
            return;
        }
        
        noResults.classList.add('hidden');
        grid.innerHTML = this.filteredData.map(item => this.createCard(item)).join('');
    }
    
    createCard(item) {
        const cityBadge = item._city === 'kathmandu' ? 
            '<span class="badge badge-city-ktm">Kathmandu</span>' : 
            '<span class="badge badge-city-bir">Biratnagar</span>';
        
        const categoryBadge = this.getCategoryBadge(item._category);
        const isEmergency = item._category === 'emergency' || item.emergency === true;
        const emergencyClass = isEmergency ? 'emergency-card' : '';
        
        const title = this.getItemTitle(item);
        const subtitle = this.getItemSubtitle(item);
        const details = this.getItemDetails(item);
        const phone = this.getItemPhone(item);
        
        return `
            <div class="card ${emergencyClass}">
                <div class="card-header">
                    <div>
                        <h3 class="card-title">${this.escapeHtml(title)}</h3>
                        ${subtitle ? `<p class="card-subtitle">${this.escapeHtml(subtitle)}</p>` : ''}
                    </div>
                    <div class="card-badges">
                        ${cityBadge}
                        ${categoryBadge}
                    </div>
                </div>
                <div class="card-body">
                    ${details}
                </div>
                ${phone ? `
                <div class="card-footer">
                    <a href="tel:${phone.replace(/\D/g, '')}" class="phone-btn">
                        📞 ${this.escapeHtml(phone)}
                    </a>
                </div>
                ` : ''}
            </div>
        `;
    }
    
    getCategoryBadge(category) {
        const badges = {
            'hospitals': '<span class="badge badge-cat-hospital">Hospital</span>',
            'schools': '<span class="badge badge-cat-school">School</span>',
            'ambulance': '<span class="badge badge-cat-ambulance">Ambulance</span>',
            'emergency': '<span class="badge badge-cat-emergency emergency-badge">🚨 Emergency</span>',
            'ward': '<span class="badge badge-cat-ward">Ward Office</span>'
        };
        return badges[category] || '';
    }
    
    getItemTitle(item) {
        return item.name || item.hospital_name || item.school_name || 
               item.service_name || item.contact_name || item.office_name || 
               `Ward ${item.ward_number}` || 'Unknown';
    }
    
    getItemSubtitle(item) {
        if (item.address) return item.address;
        if (item.location) return item.location;
        if (item.ward_number && item._category === 'ward') return item.address || 'Biratnagar';
        return '';
    }
    
    getItemDetails(item) {
        let details = '';
        
        if (item._category === 'hospitals') {
            if (item.type) details += this.createInfoRow('Type', item.type);
            if (item.beds) details += this.createInfoRow('Beds', item.beds);
            if (item.specialties) details += this.createInfoRow('Specialties', item.specialties.join(', '));
            if (item.emergency_available) details += this.createInfoRow('Emergency', item.emergency_available ? 'Yes' : 'No');
        } else if (item._category === 'schools') {
            if (item.level) details += this.createInfoRow('Level', item.level);
            if (item.type) details += this.createInfoRow('Type', item.type);
            if (item.ward_number) details += this.createInfoRow('Ward', item.ward_number);
        } else if (item._category === 'ward') {
            if (item.secretary_name_english) details += this.createInfoRow('Secretary', item.secretary_name_english);
            if (item.email) details += this.createInfoRow('Email', `<a href="mailto:${item.email}">${item.email}</a>`);
        } else if (item._category === 'emergency') {
            if (item.department) details += this.createInfoRow('Department', item.department);
            if (item.description) details += this.createInfoRow('Description', item.description);
        }
        
        // Add additional info if available
        if (item.website && item.website !== 'N/A') {
            details += this.createInfoRow('Website', `<a href="${item.website}" target="_blank">Visit Website ↗</a>`);
        }
        
        return details;
    }
    
    createInfoRow(label, value) {
        if (!value || value === 'N/A') return '';
        const icons = {
            'Type': '🏷️',
            'Beds': '🛏️',
            'Specialties': '👨‍⚕️',
            'Emergency': '🚨',
            'Level': '🎓',
            'Ward': '📍',
            'Secretary': '👤',
            'Email': '✉️',
            'Department': '🏛️',
            'Description': '📝',
            'Website': '🌐'
        };
        const icon = icons[label] || '•';
        return `
            <div class="info-row">
                <span class="info-icon">${icon}</span>
                <span class="info-label">${label}:</span>
                <span class="info-value">${value}</span>
            </div>
        `;
    }
    
    getItemPhone(item) {
        if (item.phone) {
            return Array.isArray(item.phone) ? item.phone[0] : item.phone;
        }
        if (item.mobile) return item.mobile;
        if (item.contact_number) return item.contact_number;
        if (item.office_phone) return item.office_phone;
        if (item.ward_contact_number) return item.ward_contact_number;
        return null;
    }
    
    updateResultsCount() {
        const countEl = document.getElementById('resultsCount');
        const total = this.allData.length;
        const filtered = this.filteredData.length;
        
        if (filtered === total) {
            countEl.textContent = `Showing all ${total} services`;
        } else {
            countEl.textContent = `Showing ${filtered} of ${total} services`;
        }
    }
    
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NepalServicesApp();
});

/**
 * Nepal Services Directory - Renderer Module
 * Handles all UI rendering
 */

class UIRenderer {
    constructor(app) {
        this.app = app;
    }
    
    renderResults() {
        const resultsContainer = document.getElementById('resultsContainer');
        const start = (this.app.currentPage - 1) * CONFIG.ITEMS_PER_PAGE;
        const end = start + CONFIG.ITEMS_PER_PAGE;
        const pageData = this.app.filteredData.slice(start, end);
        
        if (pageData.length === 0) {
            resultsContainer.innerHTML = `
                <div class="no-results">
                    <p>No results found. Try adjusting your filters.</p>
                </div>
            `;
            this.renderPagination(0);
            return;
        }
        
        resultsContainer.innerHTML = pageData.map(item => this.createCard(item)).join('');
        this.renderPagination(this.app.filteredData.length);
    }
    
    createCard(item) {
        const cityBadge = this.getCityBadge(item._city);
        const categoryBadge = this.getCategoryBadge(item._category);
        const isEmergency = item._category === 'emergency' || item.emergency === true;
        const emergencyClass = isEmergency ? 'emergency-card' : '';
        
        const title = this.getItemTitle(item);
        const subtitle = this.getItemSubtitle(item);
        const details = this.getItemDetails(item);
        
        return `
            <div class="result-card ${emergencyClass}">
                <div class="card-header">
                    <h3>${title}</h3>
                    ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
                    <div class="card-badges">
                        ${cityBadge}
                        ${categoryBadge}
                    </div>
                </div>
                <div class="card-body">
                    ${details}
                </div>
            </div>
        `;
    }
    
    getCityBadge(city) {
        const badgeClass = CONFIG.CITY_BADGE_CLASSES[city] || 'badge-city-default';
        const cityName = city.charAt(0).toUpperCase() + city.slice(1);
        return `<span class="badge ${badgeClass}">${cityName}</span>`;
    }
    
    getCategoryBadge(category) {
        return CONFIG.CATEGORY_BADGES[category] || '';
    }
    
    getItemTitle(item) {
        return item.name || item.hospital_name || item.school_name || 
               item.service_name || item.contact_name || item.office_name || 
               'Unnamed Service';
    }
    
    getItemSubtitle(item) {
        if (item.name_np && item.name_np !== item.name) {
            return item.name_np;
        }
        return '';
    }
    
    getItemDetails(item) {
        let details = '';
        
        // Category-specific details
        switch (item._category) {
            case 'hospitals':
                details += this.renderHospitalDetails(item);
                break;
            case 'schools':
                details += this.renderSchoolDetails(item);
                break;
            case 'colleges':
                details += this.renderCollegeDetails(item);
                break;
            case 'clinics':
                details += this.renderClinicDetails(item);
                break;
            case 'pharmacies':
                details += this.renderPharmacyDetails(item);
                break;
            case 'blood_banks':
                details += this.renderBloodBankDetails(item);
                break;
            case 'ambulance':
                details += this.renderAmbulanceDetails(item);
                break;
            case 'emergency':
                details += this.renderEmergencyDetails(item);
                break;
            case 'veterinary':
                details += this.renderVeterinaryDetails(item);
                break;
            case 'government':
                details += this.renderGovernmentDetails(item);
                break;
            case 'ward':
                details += this.renderWardDetails(item);
                break;
        }
        
        // Common fields
        if (item.address) {
            details += this.createInfoRow('📍 Address', item.address);
        }
        
        if (item.phone) {
            details += this.createPhoneRow(item.phone);
        }
        
        if (item.email) {
            details += this.createInfoRow('✉️ Email', `<a href="mailto:${item.email}">${item.email}</a>`);
        }
        
        if (item.website) {
            const displayUrl = item.website.replace(/^https?:\/\//, '').replace(/\/$/, '');
            details += this.createInfoRow('🌐 Website', `<a href="${item.website}" target="_blank">${displayUrl}</a>`);
        }
        
        return details;
    }
    
    renderHospitalDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('Type', item.type);
        if (item.beds) details += this.createInfoRow('Beds', item.beds);
        if (item.specialties) {
            details += this.createInfoRow('Specialties', item.specialties.slice(0, 3).join(', ') + 
                (item.specialties.length > 3 ? '...' : ''));
        }
        if (item.emergency_available) details += this.createInfoRow('Emergency', 'Yes');
        return details;
    }
    
    renderSchoolDetails(item) {
        let details = '';
        if (item.level) details += this.createInfoRow('Level', item.level);
        if (item.type) details += this.createInfoRow('Type', item.type);
        if (item.curriculum) details += this.createInfoRow('Curriculum', item.curriculum);
        return details;
    }
    
    renderCollegeDetails(item) {
        let details = '';
        if (item.affiliation) details += this.createInfoRow('Affiliation', item.affiliation);
        if (item.programs) {
            details += this.createInfoRow('Programs', item.programs.slice(0, 3).join(', ') + 
                (item.programs.length > 3 ? '...' : ''));
        }
        if (item.type) details += this.createInfoRow('Type', item.type);
        return details;
    }
    
    renderClinicDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('Type', item.type);
        if (item.services) {
            details += this.createInfoRow('Services', item.services.slice(0, 3).join(', ') + 
                (item.services.length > 3 ? '...' : ''));
        }
        return details;
    }
    
    renderPharmacyDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('Type', item.type);
        if (item.hours) details += this.createInfoRow('Hours', item.hours);
        return details;
    }
    
    renderBloodBankDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('Type', item.type);
        if (item.hours) details += this.createInfoRow('Hours', item.hours);
        if (item.emergency) details += this.createInfoRow('Emergency', item.emergency);
        return details;
    }
    
    renderAmbulanceDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('Service Type', item.type);
        if (item.hours) details += this.createInfoRow('Hours', item.hours);
        return details;
    }
    
    renderEmergencyDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('Type', item.type);
        if (item.department) details += this.createInfoRow('Department', item.department);
        return details;
    }
    
    renderVeterinaryDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('Type', item.type);
        if (item.services) {
            details += this.createInfoRow('Services', item.services.slice(0, 3).join(', ') + 
                (item.services.length > 3 ? '...' : ''));
        }
        return details;
    }
    
    renderGovernmentDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('Office Type', item.type);
        return details;
    }
    
    renderWardDetails(item) {
        let details = '';
        if (item.chairperson) details += this.createInfoRow('Chairperson', item.chairperson);
        if (item.secretary_name_english) details += this.createInfoRow('Secretary', item.secretary_name_english);
        if (item.population) details += this.createInfoRow('Population', item.population.toLocaleString());
        return details;
    }
    
    createInfoRow(label, value) {
        return `
            <div class="info-row">
                <span class="info-label">${label}:</span>
                <span class="info-value">${value}</span>
            </div>
        `;
    }
    
    createPhoneRow(phone) {
        const cleanPhone = phone.replace(/\D/g, '');
        const displayPhone = phone;
        return `
            <div class="info-row phone-row">
                <span class="info-label">📞 Phone:</span>
                <span class="info-value">
                    <a href="tel:${cleanPhone}" class="phone-link">${displayPhone}</a>
                </span>
            </div>
        `;
    }
    
    renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / CONFIG.ITEMS_PER_PAGE);
        const paginationContainer = document.getElementById('pagination');
        
        if (totalPages <= 1) {
            paginationContainer.innerHTML = '';
            return;
        }
        
        let paginationHTML = `
            <button class="pagination-btn" ${this.app.currentPage === 1 ? 'disabled' : ''} 
                onclick="app.goToPage(${this.app.currentPage - 1})">← Previous</button>
            <span class="pagination-info">Page ${this.app.currentPage} of ${totalPages}</span>
            <button class="pagination-btn" ${this.app.currentPage === totalPages ? 'disabled' : ''} 
                onclick="app.goToPage(${this.app.currentPage + 1})">Next →</button>
        `;
        
        paginationContainer.innerHTML = paginationHTML;
    }
    
    updateResultsCount() {
        const count = this.app.filteredData.length;
        document.getElementById('resultsCount').textContent = 
            `Showing ${count} result${count !== 1 ? 's' : ''}`;
    }
}

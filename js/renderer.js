/**
 * Nepal Services Directory - Renderer Module
 * Handles all UI rendering with modern card design
 */

class UIRenderer {
    constructor(app) {
        this.app = app;
    }
    
    renderResults() {
        const resultsContainer = document.getElementById('resultsGrid');
        const resultsSection = document.getElementById('resultsSection');
        const loadingState = document.getElementById('loading');
        const noResults = document.getElementById('noResults');
        
        // Hide loading
        loadingState.classList.add('hidden');
        
        // Check if we have results
        if (this.app.filteredData.length === 0) {
            resultsSection.classList.add('hidden');
            noResults.classList.remove('hidden');
            return;
        }
        
        // Show results
        noResults.classList.add('hidden');
        resultsSection.classList.remove('hidden');
        
        // Paginate
        const start = (this.app.currentPage - 1) * CONFIG.ITEMS_PER_PAGE;
        const end = start + CONFIG.ITEMS_PER_PAGE;
        const pageData = this.app.filteredData.slice(start, end);
        
        // Render cards with animation delay
        resultsContainer.innerHTML = pageData.map((item, index) => 
            this.createCard(item, index)
        ).join('');
        
        this.renderPagination(this.app.filteredData.length);
        
        // Animate cards
        this.animateCards();
    }
    
    createCard(item, index = 0) {
        const cityBadge = this.getCityBadge(item._city);
        const categoryBadge = this.getCategoryBadge(item._category);
        const isEmergency = item._category === 'emergency' || item.emergency === true;
        const emergencyClass = isEmergency ? 'emergency' : '';
        
        const title = this.getItemTitle(item);
        const subtitle = this.getItemSubtitle(item);
        const details = this.getItemDetails(item);
        
        const animationDelay = Math.min(index * 50, 500);
        
        return `
            <article class="result-card ${emergencyClass}" style="animation-delay: ${animationDelay}ms">
                <div class="card-header">
                    <h3 class="card-title">${this.escapeHtml(title)}</h3>
                    ${subtitle ? `<p class="card-subtitle">${this.escapeHtml(subtitle)}</p>` : ''}
                    <div class="card-badges">
                        ${cityBadge}
                        ${categoryBadge}
                    </div>
                </div>
                <div class="card-body">
                    ${details}
                </div>
            </article>
        `;
    }
    
    getCityBadge(city) {
        const badgeClass = CONFIG.CITY_BADGE_CLASSES[city] || 'badge-city-default';
        const cityName = this.capitalizeFirst(city);
        return `<span class="badge ${badgeClass}">${this.escapeHtml(cityName)}</span>`;
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
        if (item.type && item.type !== 'Unknown') {
            return item.type;
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
            case 'forest':
                details += this.renderForestDetails(item);
                break;
        }
        
        // Common fields
        if (item.address) {
            details += this.createInfoRow('📍', 'Address', item.address);
        }
        
        if (item.phone) {
            details += this.createPhoneRow(item.phone);
        }
        
        if (item.email) {
            details += this.createInfoRow('✉️', 'Email', `<a href="mailto:${this.escapeHtml(item.email)}">${this.escapeHtml(item.email)}</a>`);
        }
        
        if (item.website) {
            const displayUrl = item.website.replace(/^https?:\/\//, '').replace(/\/$/, '');
            details += this.createInfoRow('🌐', 'Website', `<a href="${item.website}" target="_blank" rel="noopener">${this.escapeHtml(displayUrl)}</a>`);
        }
        
        return details;
    }
    
    renderHospitalDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('🏥', 'Type', item.type);
        if (item.beds) details += this.createInfoRow('🛏️', 'Beds', item.beds);
        if (item.specialties && item.specialties.length > 0) {
            const specialties = item.specialties.slice(0, 3).join(', ') + 
                (item.specialties.length > 3 ? ` <span class="more">+${item.specialties.length - 3} more</span>` : '');
            details += this.createInfoRow('⭐', 'Specialties', specialties);
        }
        if (item.emergency_available) details += this.createInfoRow('🚨', 'Emergency', '24/7 Available');
        return details;
    }
    
    renderSchoolDetails(item) {
        let details = '';
        if (item.level) details += this.createInfoRow('📚', 'Level', item.level);
        if (item.type) details += this.createInfoRow('🏫', 'Type', item.type);
        if (item.curriculum) details += this.createInfoRow('📖', 'Curriculum', item.curriculum);
        if (item.affiliation) details += this.createInfoRow('🎓', 'Affiliation', item.affiliation);
        if (item.programs && item.programs.length > 0) {
            const programs = item.programs.slice(0, 3).join(', ') + 
                (item.programs.length > 3 ? ` <span class="more">+${item.programs.length - 3} more</span>` : '');
            details += this.createInfoRow('📋', 'Programs', programs);
        }
        return details;
    }
    
    renderCollegeDetails(item) {
        let details = '';
        if (item.affiliation) details += this.createInfoRow('🎓', 'Affiliation', item.affiliation);
        if (item.programs && item.programs.length > 0) {
            const programs = item.programs.slice(0, 3).join(', ') + 
                (item.programs.length > 3 ? ` <span class="more">+${item.programs.length - 3} more</span>` : '');
            details += this.createInfoRow('📚', 'Programs', programs);
        }
        if (item.type) details += this.createInfoRow('🏛️', 'Type', item.type);
        return details;
    }
    
    renderClinicDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('🏥', 'Type', item.type);
        if (item.services && item.services.length > 0) {
            const services = item.services.slice(0, 3).join(', ') + 
                (item.services.length > 3 ? ` <span class="more">+${item.services.length - 3} more</span>` : '');
            details += this.createInfoRow('💉', 'Services', services);
        }
        return details;
    }
    
    renderPharmacyDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('💊', 'Type', item.type);
        if (item.hours) details += this.createInfoRow('🕐', 'Hours', item.hours);
        return details;
    }
    
    renderBloodBankDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('🩸', 'Type', item.type);
        if (item.hours) details += this.createInfoRow('🕐', 'Hours', item.hours);
        if (item.emergency) details += this.createInfoRow('🚨', 'Emergency', item.emergency);
        return details;
    }
    
    renderAmbulanceDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('🚑', 'Service Type', item.type);
        if (item.hours) details += this.createInfoRow('🕐', 'Hours', item.hours);
        return details;
    }
    
    renderEmergencyDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('🚨', 'Type', item.type);
        if (item.department) details += this.createInfoRow('🏢', 'Department', item.department);
        return details;
    }
    
    renderVeterinaryDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('🐾', 'Type', item.type);
        if (item.services && item.services.length > 0) {
            const services = item.services.slice(0, 3).join(', ') + 
                (item.services.length > 3 ? ` <span class="more">+${item.services.length - 3} more</span>` : '');
            details += this.createInfoRow('💉', 'Services', services);
        }
        return details;
    }
    
    renderGovernmentDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('🏛️', 'Office Type', item.type);
        if (item.officer_name) details += this.createInfoRow('👤', 'Officer', item.officer_name);
        return details;
    }
    
    renderWardDetails(item) {
        let details = '';
        if (item.chairperson) details += this.createInfoRow('👤', 'Chairperson', item.chairperson);
        if (item.secretary_name_english) details += this.createInfoRow('📋', 'Secretary', item.secretary_name_english);
        if (item.population) details += this.createInfoRow('👥', 'Population', item.population.toLocaleString());
        return details;
    }
    
    renderForestDetails(item) {
        let details = '';
        if (item.type) details += this.createInfoRow('🌲', 'Type', item.type);
        if (item.range) details += this.createInfoRow('📍', 'Range', item.range);
        return details;
    }
    
    createInfoRow(icon, label, value) {
        return `
            <div class="info-row">
                <span class="info-label">${icon} ${label}</span>
                <span class="info-value">${value}</span>
            </div>
        `;
    }
    
    createPhoneRow(phone) {
        // Handle array of phones
        if (Array.isArray(phone)) {
            return phone.map(p => this.createPhoneRow(p)).join('');
        }
        // Handle non-string phone
        if (typeof phone !== 'string') {
            phone = String(phone);
        }
        const cleanPhone = phone.replace(/\D/g, '');
        const displayPhone = this.escapeHtml(phone);
        return `
            <div class="info-row">
                <span class="info-label">📞 Phone</span>
                <span class="info-value">
                    <a href="tel:${cleanPhone}" class="phone-link">${displayPhone}</a>
                </span>
            </div>
        `;
    }
    
    renderPagination(totalItems) {
        const totalPages = Math.ceil(totalItems / CONFIG.ITEMS_PER_PAGE);
        const paginationContainer = document.getElementById('paginationContainer');
        
        if (!paginationContainer) return;
        
        if (totalPages <= 1) {
            paginationContainer.classList.add('hidden');
            paginationContainer.innerHTML = '';
            return;
        }
        
        paginationContainer.classList.remove('hidden');
        
        let paginationHTML = '<div class="pagination-wrapper">';
        
        // Previous button
        paginationHTML += `
            <button class="pagination-btn ${this.app.currentPage === 1 ? 'disabled' : ''}" 
                ${this.app.currentPage === 1 ? 'disabled' : `onclick="app.goToPage(${this.app.currentPage - 1})"`}>
                <i class="fas fa-chevron-left"></i>
            </button>
        `;
        
        // Page numbers
        const maxVisible = 5;
        let startPage = Math.max(1, this.app.currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        if (startPage > 1) {
            paginationHTML += `<button class="pagination-btn" onclick="app.goToPage(1)">1</button>`;
            if (startPage > 2) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`;
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="pagination-btn ${i === this.app.currentPage ? 'active' : ''}" 
                    onclick="app.goToPage(${i})">${i}</button>
            `;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                paginationHTML += `<span class="pagination-ellipsis">...</span>`;
            }
            paginationHTML += `<button class="pagination-btn" onclick="app.goToPage(${totalPages})">${totalPages}</button>`;
        }
        
        // Next button
        paginationHTML += `
            <button class="pagination-btn ${this.app.currentPage === totalPages ? 'disabled' : ''}" 
                ${this.app.currentPage === totalPages ? 'disabled' : `onclick="app.goToPage(${this.app.currentPage + 1})"`}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;
        
        paginationHTML += '</div>';
        
        paginationContainer.innerHTML = paginationHTML;
    }
    
    updateResultsCount() {
        const count = this.app.filteredData.length;
        const total = this.app.allData.length;
        const countEl = document.getElementById('resultsCount');
        
        if (count === total) {
            countEl.textContent = `Showing all ${count.toLocaleString()} services`;
        } else {
            countEl.textContent = `Showing ${count.toLocaleString()} of ${total.toLocaleString()} services`;
        }
        
        // Update stats in hero if needed
        this.updateHeroStats();
    }
    
    updateHeroStats() {
        const stats = {
            hospitals: this.app.allData.filter(i => i._category === 'hospitals').length,
            schools: this.app.allData.filter(i => i._category === 'schools').length,
            services: this.app.allData.length
        };
        
        // Animate numbers
        this.animateNumber('statHospitals', stats.hospitals);
        this.animateNumber('statSchools', stats.schools);
        this.animateNumber('statServices', stats.services);
    }
    
    animateNumber(elementId, target) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        const duration = 1500;
        const start = parseInt(element.textContent) || 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
    
    animateCards() {
        const cards = document.querySelectorAll('.result-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }
    
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

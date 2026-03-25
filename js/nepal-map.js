/**
 * Nepal Interactive Map Component
 * Handles province/district selection and filtering
 */

class NepalMap {
    constructor(app) {
        this.app = app;
        this.selectedProvince = null;
        this.selectedDistrict = null;
        
        // District data for each province
        this.provinceDistricts = {
            bagmati: [
                'Bhaktapur', 'Chitwan', 'Dhading', 'Dolakha', 'Kathmandu', 
                'Kavrepalanchok', 'Lalitpur', 'Makwanpur', 'Nuwakot', 
                'Ramechhap', 'Rasuwa', 'Sindhuli', 'Sindhupalchok'
            ],
            gandaki: [
                'Baglung', 'Gorkha', 'Kaski', 'Lamjung', 'Manang', 
                'Mustang', 'Myagdi', 'Nawalpur', 'Parbat', 'Syangja', 'Tanahun'
            ],
            koshi: [
                'Bhojpur', 'Dhankuta', 'Ilam', 'Jhapa', 'Khotang', 
                'Morang', 'Okhaldhunga', 'Panchthar', 'Sankhuwasabha', 
                'Solukhumbu', 'Sunsari', 'Taplejung', 'Terhathum', 'Udayapur'
            ],
            madhesh: [
                'Bara', 'Dhanusha', 'Mahottari', 'Parsa', 'Rautahat', 
                'Saptari', 'Sarlahi', 'Siraha'
            ],
            lumbini: [
                'Arghakhanchi', 'Banke', 'Bardiya', 'Dang', 'Gulmi', 
                'Kapilvastu', 'Parasi', 'Palpa', 'Pyuthan', 'Rolpa', 
                'Rupandehi', 'Eastern Rukum'
            ],
            karnali: [
                'Dailekh', 'Dolpa', 'Humla', 'Jajarkot', 'Jumla', 
                'Kalikot', 'Mugu', 'Salyan', 'Surkhet', 'Western Rukum'
            ],
            sudurpashchim: [
                'Achham', 'Baitadi', 'Bajhang', 'Bajura', 'Dadeldhura', 
                'Darchula', 'Doti', 'Kailali', 'Kanchanpur'
            ]
        };
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.bindEvents();
        this.updateDistrictCounts();
    }
    
    cacheElements() {
        this.map = document.getElementById('nepal-map');
        this.provinces = document.querySelectorAll('#nepal-map .province');
        this.legendItems = document.querySelectorAll('.legend-item');
        this.districtPanel = document.getElementById('districtPanel');
        this.districtList = document.getElementById('districtList');
        this.selectedProvinceName = document.getElementById('selectedProvinceName');
        this.districtStats = document.getElementById('districtStats');
        this.closePanelBtn = document.getElementById('closeDistrictPanel');
    }
    
    bindEvents() {
        // Province clicks on map
        this.provinces.forEach(province => {
            province.addEventListener('click', (e) => {
                const provinceKey = e.target.dataset.province;
                this.selectProvince(provinceKey);
            });
            
            // Hover effects
            province.addEventListener('mouseenter', (e) => {
                const provinceName = e.target.dataset.name;
                this.showTooltip(e, provinceName);
            });
            
            province.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
        
        // Legend clicks
        this.legendItems.forEach(item => {
            item.addEventListener('click', () => {
                const province = item.dataset.province;
                this.selectProvince(province);
            });
        });
        
        // Close panel
        this.closePanelBtn?.addEventListener('click', () => {
            this.closeDistrictPanel();
        });
    }
    
    selectProvince(provinceKey) {
        if (!provinceKey || !this.provinceDistricts[provinceKey]) return;
        
        this.selectedProvince = provinceKey;
        
        // Update visual state
        this.provinces.forEach(p => {
            p.classList.toggle('active', p.dataset.province === provinceKey);
        });
        
        this.legendItems.forEach(l => {
            l.classList.toggle('active', l.dataset.province === provinceKey);
        });
        
        // Show districts
        this.showDistricts(provinceKey);
        
        // Update main filter
        this.updateMainFilter(provinceKey);
    }
    
    showDistricts(provinceKey) {
        const districts = this.provinceDistricts[provinceKey];
        const provinceNames = {
            bagmati: 'Bagmati Province',
            gandaki: 'Gandaki Province',
            koshi: 'Koshi Province',
            madhesh: 'Madhesh Province',
            lumbini: 'Lumbini Province',
            karnali: 'Karnali Province',
            sudurpashchim: 'Sudurpashchim Province'
        };
        
        this.selectedProvinceName.textContent = provinceNames[provinceKey];
        
        // Build district list
        let html = '';
        districts.forEach(district => {
            const count = this.getDistrictServiceCount(district);
            html += `
                <div class="district-item" data-district="${district}">
                    <span class="district-name">${district}</span>
                    <span class="district-count">${count}</span>
                </div>
            `;
        });
        
        this.districtList.innerHTML = html;
        
        // Add click handlers to districts
        this.districtList.querySelectorAll('.district-item').forEach(item => {
            item.addEventListener('click', () => {
                const district = item.dataset.district;
                this.selectDistrict(district);
            });
        });
        
        // Show stats
        const totalServices = districts.reduce((sum, d) => sum + this.getDistrictServiceCount(d), 0);
        this.districtStats.innerHTML = `
            <div class="district-stat-row">
                <span class="district-stat-label">Districts</span>
                <span class="district-stat-value">${districts.length}</span>
            </div>
            <div class="district-stat-row">
                <span class="district-stat-label">Total Services</span>
                <span class="district-stat-value">${totalServices.toLocaleString()}</span>
            </div>
        `;
        
        // Show panel
        this.districtPanel.classList.add('active');
    }
    
    selectDistrict(district) {
        this.selectedDistrict = district;
        
        // Update district panel UI
        this.districtList.querySelectorAll('.district-item').forEach(item => {
            item.style.background = item.dataset.district === district ? 
                'rgba(37, 99, 235, 0.1)' : '';
            item.style.borderColor = item.dataset.district === district ? 
                'var(--primary)' : '';
        });
        
        // Update main filter and trigger search
        this.filterByDistrict(district);
        
        // Scroll to results
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }
    
    updateMainFilter(province) {
        const provinceSelect = document.getElementById('provinceFilter');
        if (provinceSelect) {
            // Format province name to match option text
            const provinceNames = {
                bagmati: 'Bagmati Province',
                gandaki: 'Gandaki Province',
                koshi: 'Koshi Province',
                madhesh: 'Madhesh Province',
                lumbini: 'Lumbini Province',
                karnali: 'Karnali Province',
                sudurpashchim: 'Sudurpashchim Province'
            };
            
            provinceSelect.value = province;
            
            // Trigger change event
            provinceSelect.dispatchEvent(new Event('change'));
            
            // Update app state
            if (this.app) {
                this.app.currentFilters.province = province;
                this.app.loadDistricts(province);
                this.app.applyFilters();
            }
        }
    }
    
    filterByDistrict(district) {
        const districtSelect = document.getElementById('districtFilter');
        const citySelect = document.getElementById('cityFilter');
        
        if (districtSelect) {
            districtSelect.value = district.toLowerCase();
            districtSelect.dispatchEvent(new Event('change'));
        }
        
        if (this.app) {
            this.app.currentFilters.district = district.toLowerCase();
            this.app.loadCities(this.app.currentFilters.province, district.toLowerCase());
            this.app.applyFilters();
        }
    }
    
    closeDistrictPanel() {
        this.selectedProvince = null;
        this.selectedDistrict = null;
        
        this.provinces.forEach(p => p.classList.remove('active'));
        this.legendItems.forEach(l => l.classList.remove('active'));
        
        this.selectedProvinceName.textContent = 'Select a Province';
        this.districtList.innerHTML = '<p class="district-hint">Click on a province in the map to see its districts</p>';
        this.districtStats.innerHTML = '';
    }
    
    getDistrictServiceCount(district) {
        if (!this.app?.allData) return 0;
        
        const districtLower = district.toLowerCase().replace(/ /g, '_');
        return this.app.allData.filter(item => 
            item.district?.toLowerCase().replace(/ /g, '_') === districtLower ||
            item._district?.toLowerCase().replace(/ /g, '_') === districtLower
        ).length;
    }
    
    updateDistrictCounts() {
        // Update counts after data is loaded
        if (this.selectedProvince) {
            this.showDistricts(this.selectedProvince);
        }
    }
    
    showTooltip(e, text) {
        // Simple tooltip implementation
        let tooltip = document.getElementById('map-tooltip');
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'map-tooltip';
            tooltip.style.cssText = `
                position: fixed;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 14px;
                pointer-events: none;
                z-index: 1000;
                font-weight: 500;
            `;
            document.body.appendChild(tooltip);
        }
        
        tooltip.textContent = text;
        tooltip.style.display = 'block';
        tooltip.style.left = e.clientX + 10 + 'px';
        tooltip.style.top = e.clientY - 30 + 'px';
    }
    
    hideTooltip() {
        const tooltip = document.getElementById('map-tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for app to be ready
    const checkApp = setInterval(() => {
        if (window.app) {
            clearInterval(checkApp);
            window.nepalMap = new NepalMap(window.app);
        }
    }, 100);
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NepalMap;
}

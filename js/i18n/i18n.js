/**
 * Nepal Services Directory - Internationalization (i18n) Module
 * Handles translations and language switching
 */

class I18n {
    constructor() {
        this.currentLang = localStorage.getItem('preferredLanguage') || 'en';
        this.translations = {};
        this.isLoaded = false;
    }
    
    async init() {
        // Load both language files
        try {
            const [enData, neData] = await Promise.all([
                fetch('js/i18n/en.json').then(r => r.json()),
                fetch('js/i18n/ne.json').then(r => r.json())
            ]);
            
            this.translations = {
                en: enData,
                ne: neData
            };
            
            this.isLoaded = true;
            
            // Ensure English is default if no preference set
            if (!localStorage.getItem('preferredLanguage')) {
                this.currentLang = 'en';
                localStorage.setItem('preferredLanguage', 'en');
            }
            
            this.applyTranslations();
            
            // Create simple flag toggle button
            this.createLanguageToggle();
            
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }
    
    createLanguageToggle() {
        // Check if toggle already exists
        if (document.getElementById('langToggle')) return;
        
        const toggle = document.createElement('div');
        toggle.className = 'lang-toggle-container';
        toggle.innerHTML = `
            <button id="langToggle" class="lang-toggle-btn" title="Toggle language">
                <span class="lang-flag">${this.currentLang === 'ne' ? '🇳🇵' : '🇬🇧'}</span>
            </button>
        `;
        
        document.body.appendChild(toggle);
        
        document.getElementById('langToggle').addEventListener('click', () => {
            this.toggleLanguage();
        });
    }
    
    toggleLanguage() {
        // Toggle between English and Nepali
        const newLang = this.currentLang === 'en' ? 'ne' : 'en';
        this.setLanguage(newLang);
    }
    
    updateLanguageSwitcher() {
        const btn = document.getElementById('langToggle');
        if (!btn) return;
        
        const flag = btn.querySelector('.lang-flag');
        if (flag) {
            flag.textContent = this.currentLang === 'ne' ? '🇳🇵' : '🇬🇧';
        }
    }
    
    setLanguage(lang) {
        if (!this.translations[lang]) return;
        
        this.currentLang = lang;
        localStorage.setItem('preferredLanguage', lang);
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Apply translations
        this.applyTranslations();
        
        // Update direction for RTL if needed (Nepali uses LTR)
        document.documentElement.dir = 'ltr';
        
        // Update language switcher
        this.updateLanguageSwitcher();
        
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
    }
    
    getText(key) {
        if (!this.isLoaded) return key;
        
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback to English
                value = this.translations['en'];
                for (const k2 of keys) {
                    if (value && typeof value === 'object' && k2 in value) {
                        value = value[k2];
                    } else {
                        return key;
                    }
                }
                return value;
            }
        }
        
        return value || key;
    }
    
    t(key, replacements = {}) {
        let text = this.getText(key);
        
        // Replace placeholders like {count}, {total}
        Object.keys(replacements).forEach(placeholder => {
            text = text.replace(new RegExp(`{${placeholder}}`, 'g'), replacements[placeholder]);
        });
        
        return text;
    }
    
    applyTranslations() {
        if (!this.isLoaded) return;
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const text = this.getText(key);
            
            if (el.tagName === 'INPUT' && el.type === 'text') {
                el.placeholder = text;
            } else if (el.tagName === 'META') {
                el.content = text;
            } else {
                el.textContent = text;
            }
        });
        
        // Update elements with data-i18n-html (for HTML content)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.dataset.i18nHtml;
            el.innerHTML = this.getText(key);
        });
        
        // Update title
        document.title = this.getText('meta.title');
        
        // Update dynamic content
        this.updateDynamicContent();
    }
    
    updateDynamicContent() {
        // Update filter options
        this.updateSelectOptions('provinceFilter', 'provinces');
        this.updateSelectOptions('districtFilter', 'districts');
        this.updateSelectOptions('cityFilter', 'cities');
        this.updateSelectOptions('categoryFilter', 'categories');
        this.updateSelectOptions('typeFilter', 'types');
        
        // Update results count
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount && window.app) {
            const count = window.app.filteredData.length;
            const total = window.app.allData.length;
            if (count === total) {
                resultsCount.textContent = this.t('filters.showingAll', { count });
            } else {
                resultsCount.textContent = this.t('filters.showing', { count, total });
            }
        }
    }
    
    updateSelectOptions(selectId, translationKey) {
        const select = document.getElementById(selectId);
        if (!select) return;
        
        const currentValue = select.value;
        
        // Map select IDs to correct translation keys (plural forms)
        const allKeyMap = {
            'provinceFilter': 'filters.allProvinces',
            'districtFilter': 'filters.allDistricts',
            'cityFilter': 'filters.allCities',
            'categoryFilter': 'filters.allCategories',
            'typeFilter': 'filters.allTypes'
        };
        
        // Update the first option (All...)
        if (select.options[0]) {
            const allKey = allKeyMap[selectId] || `filters.all${this.capitalizeFirst(selectId.replace('Filter', ''))}`;
            select.options[0].textContent = this.getText(allKey);
        }
        
        // Update other options
        for (let i = 1; i < select.options.length; i++) {
            const option = select.options[i];
            const value = option.value;
            const key = `${translationKey}.${value}`;
            const translated = this.getText(key);
            if (translated !== key) {
                option.textContent = translated;
            }
        }
        
        select.value = currentValue;
    }
    
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    // Quick translation helper for JS
    translate(key, replacements) {
        return this.t(key, replacements);
    }
}

// Create global instance
const i18n = new I18n();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
}

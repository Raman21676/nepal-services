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
            this.applyTranslations();
            
            // Create language switcher button
            this.createLanguageSwitcher();
            
            // Show language selector on first visit
            this.checkFirstVisit();
            
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }
    
    checkFirstVisit() {
        const hasSelectedLanguage = localStorage.getItem('hasSelectedLanguage');
        if (!hasSelectedLanguage) {
            this.showLanguageModal();
        }
    }
    
    showLanguageModal() {
        // Create modal if it doesn't exist
        let modal = document.getElementById('languageModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'languageModal';
            modal.className = 'language-modal';
            modal.innerHTML = `
                <div class="language-modal-backdrop"></div>
                <div class="language-modal-content">
                    <div class="language-modal-header">
                        <h2 data-i18n="language.select">Select Language / भाषा छान्नुहोस्</h2>
                        <p>Choose your preferred language for browsing</p>
                    </div>
                    <div class="language-options">
                        <button class="language-option" data-lang="en">
                            <span class="language-flag">🇬🇧</span>
                            <span class="language-name" data-i18n="language.english">English</span>
                        </button>
                        <button class="language-option" data-lang="ne">
                            <span class="language-flag">🇳🇵</span>
                            <span class="language-name" data-i18n="language.nepali">नेपाली</span>
                        </button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            // Add event listeners
            modal.querySelectorAll('.language-option').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const lang = e.currentTarget.dataset.lang;
                    this.setLanguage(lang);
                    localStorage.setItem('hasSelectedLanguage', 'true');
                    modal.classList.add('hidden');
                });
            });
        }
        
        modal.classList.remove('hidden');
    }
    
    createLanguageSwitcher() {
        // Check if switcher already exists
        if (document.getElementById('langSwitcher')) return;
        
        const switcher = document.createElement('div');
        switcher.className = 'lang-switcher';
        switcher.innerHTML = `
            <button id="langSwitcher" class="lang-switcher-btn" title="Change language">
                <span class="flag">${this.currentLang === 'ne' ? '🇳🇵' : '🇬🇧'}</span>
                <span class="lang-code">${this.currentLang.toUpperCase()}</span>
            </button>
        `;
        
        document.body.appendChild(switcher);
        
        document.getElementById('langSwitcher').addEventListener('click', () => {
            this.showLanguageModal();
        });
    }
    
    updateLanguageSwitcher() {
        const btn = document.getElementById('langSwitcher');
        if (!btn) return;
        
        const flag = btn.querySelector('.flag');
        const code = btn.querySelector('.lang-code');
        
        flag.textContent = this.currentLang === 'ne' ? '🇳🇵' : '🇬🇧';
        code.textContent = this.currentLang.toUpperCase();
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
        
        // Update the first option (All...)
        if (select.options[0]) {
            const allKey = `filters.all${this.capitalizeFirst(selectId.replace('Filter', ''))}`;
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

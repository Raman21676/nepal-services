/**
 * Nepal Services Directory - Theme Manager
 * Handles dark/light mode switching with animated toggle
 */

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('preferredTheme') || 'light';
        this.toggleBtn = null;
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
        // Check if button already exists
        if (document.getElementById('themeToggle')) return;
        
        const toggle = document.createElement('div');
        toggle.className = 'theme-toggle-container';
        toggle.innerHTML = `
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
        
        document.body.appendChild(toggle);
        
        this.toggleBtn = document.getElementById('themeToggle');
        
        this.toggleBtn.addEventListener('change', () => this.toggleTheme());
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
        
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        // No toast - the visual toggle is enough feedback
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
    
    showToast(message) {
        const container = document.getElementById('toastContainer');
        if (!container) return;
        
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i class="fas fa-palette"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
}

// Create global instance
const themeManager = new ThemeManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = themeManager;
}

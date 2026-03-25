/**
 * Nepal Services Directory - Theme Manager
 * Handles dark/light mode switching
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
        toggle.className = 'theme-toggle';
        toggle.innerHTML = `
            <button id="themeToggle" class="theme-toggle-btn" title="Toggle dark mode">
                <i class="fas fa-sun"></i>
            </button>
        `;
        
        document.body.appendChild(toggle);
        
        this.toggleBtn = document.getElementById('themeToggle');
        this.updateIcon();
        
        this.toggleBtn.addEventListener('click', () => this.toggleTheme());
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
        this.updateIcon();
        
        // Show toast notification
        this.showToast(newTheme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled');
    }
    
    updateIcon() {
        if (!this.toggleBtn) return;
        
        const icon = this.toggleBtn.querySelector('i');
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-moon';
            this.toggleBtn.title = 'Switch to light mode';
        } else {
            icon.className = 'fas fa-sun';
            this.toggleBtn.title = 'Switch to dark mode';
        }
    }
    
    listenToSystemTheme() {
        // Only auto-switch if user hasn't manually set a preference
        if (localStorage.getItem('preferredTheme')) return;
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleChange = (e) => {
            const newTheme = e.matches ? 'dark' : 'light';
            this.applyTheme(newTheme);
            this.updateIcon();
        };
        
        mediaQuery.addEventListener('change', handleChange);
        
        // Apply initial system preference
        if (mediaQuery.matches) {
            this.applyTheme('dark');
            this.updateIcon();
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

/**
 * Nepal Services Directory - Anti-Scraping Protection (LENIENT VERSION)
 * Protects data without blocking legitimate users
 */

class AntiScraping {
    constructor() {
        this.suspiciousScore = 0;
        this.sessionStart = Date.now();
        this.requestCount = 0;
        this.mouseMovements = 0;
        this.scrollEvents = 0;
        
        this.init();
    }
    
    init() {
        // Only detect obvious bots, don't block aggressively
        this.detectObviousBots();
        // Protect data without blocking users
        this.protectData();
        // Set up monitoring (non-blocking)
        this.setupMonitoring();
    }
    
    /**
     * Only detect OBVIOUS bots - very lenient
     */
    detectObviousBots() {
        const ua = navigator.userAgent.toLowerCase();
        
        // Only block KNOWN scraping tools (not browsers)
        const obviousScrapers = [
            'scrapy',
            'curl',
            'wget',
            'python-requests',
            'javahttp',
            'httpclient',
            'phantomjs'
        ];
        
        const isObviousScraper = obviousScrapers.some(s => ua.includes(s));
        
        // Check for automation flags
        const hasAutomationFlags = navigator.webdriver || 
                                   window.callPhantom || 
                                   window._phantom;
        
        // Only block if it's DEFINITELY a scraper
        if (isObviousScraper || hasAutomationFlags) {
            console.warn('[Security] Obvious scraper detected');
            this.showWarning('Automated access detected');
            // Don't block, just warn
        }
        
        // Check for headless (but don't block)
        if (navigator.plugins.length === 0 && !ua.includes('safari')) {
            console.log('[Security] Possible headless browser (not blocking)');
        }
    }
    
    /**
     * Protect data WITHOUT blocking legitimate users
     */
    protectData() {
        // Disable right-click only on data cards (not whole page)
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.result-card')) {
                // Just show a gentle warning, don't prevent
                if (this.requestCount > 50) {
                    e.preventDefault();
                    this.showToast('⚠️ Please don\'t scrape our data');
                }
            }
        });
        
        // Monitor request rate (but don't block)
        this.monitorRequestRate();
        
        // Setup honeypot (invisible to real users)
        this.setupHoneyPot();
    }
    
    /**
     * Monitor request rate (warning only, no blocking)
     */
    monitorRequestRate() {
        const originalFetch = window.fetch;
        const self = this;
        
        window.fetch = function(...args) {
            self.requestCount++;
            
            // Log excessive requests (but don't block)
            if (self.requestCount === 100) {
                console.warn('[Security] High request volume detected');
            }
            
            return originalFetch.apply(this, args);
        };
    }
    
    /**
     * Setup honeypot (traps scrapers, invisible to users)
     */
    setupHoneyPot() {
        // Create invisible honeypot
        const honeyPot = document.createElement('div');
        honeyPot.style.cssText = 'position:absolute;left:-9999px;opacity:0;pointer-events:none;';
        honeyPot.innerHTML = `
            <a href="/api/data.json" tabindex="-1">Data</a>
            <a href="/scrape-endpoint" tabindex="-1">Scrape</a>
        `;
        document.body.appendChild(honeyPot);
        
        // If honeypot is clicked, it's a bot
        honeyPot.querySelectorAll('a').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                console.error('[Security] Honeypot triggered - bot detected');
                // Log but don't block immediately
                this.logSecurityEvent('honeypot_triggered');
            });
        });
    }
    
    /**
     * Setup non-blocking monitoring
     */
    setupMonitoring() {
        // Track mouse movement (but don't use for blocking)
        document.addEventListener('mousemove', () => {
            this.mouseMovements++;
        }, { passive: true });
        
        document.addEventListener('scroll', () => {
            this.scrollEvents++;
        }, { passive: true });
        
        // Log suspicious patterns (but don't block)
        setInterval(() => {
            this.analyzePatterns();
        }, 10000);
    }
    
    /**
     * Analyze patterns (logging only)
     */
    analyzePatterns() {
        const timeElapsed = (Date.now() - this.sessionStart) / 1000;
        
        // Log potential scraping (but don't block)
        if (this.requestCount > 200 && timeElapsed < 60) {
            console.warn('[Security] Potential scraping pattern detected (logging only)');
            this.logSecurityEvent('high_request_rate', { 
                requests: this.requestCount, 
                time: timeElapsed 
            });
        }
    }
    
    /**
     * Log security events
     */
    logSecurityEvent(type, details = {}) {
        const event = {
            type,
            details,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        // Send to analytics (non-blocking)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'security_event', {
                event_type: type,
                ...details
            });
        }
        
        console.log('[Security Event]', event);
    }
    
    /**
     * Show warning toast (non-blocking)
     */
    showWarning(message) {
        console.warn(`[Security] ${message}`);
    }
    
    /**
     * Show toast notification
     */
    showToast(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #f59e0b;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-family: system-ui;
            font-size: 0.875rem;
            z-index: 9999;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.remove(), 3000);
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.antiScraping = new AntiScraping();
    });
} else {
    window.antiScraping = new AntiScraping();
}

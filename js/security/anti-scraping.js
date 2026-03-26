/**
 * Nepal Services Directory - Anti-Scraping Protection
 * Advanced detection and prevention of data scraping
 */

class AntiScraping {
    constructor() {
        this.suspiciousScore = 0;
        this.blocked = false;
        this.sessionStart = Date.now();
        this.requestCount = 0;
        this.lastRequestTime = Date.now();
        this.mouseMovements = 0;
        this.scrollEvents = 0;
        this.clickEvents = 0;
        
        this.init();
    }
    
    init() {
        this.detectBot();
        this.monitorBehavior();
        this.protectData();
        this.setupHoneyPot();
        this.enableEncryption();
    }
    
    detectBot() {
        const checks = {
            headless: () => {
                return navigator.webdriver || 
                       window.callPhantom || 
                       window._phantom ||
                       window.Buffer ||
                       window.emit ||
                       window.spawn;
            },
            
            automation: () => {
                return window.document.documentElement.getAttribute('webdriver') ||
                       navigator.plugins.length === 0 ||
                       navigator.languages === undefined ||
                       screen.width === 0 ||
                       screen.height === 0;
            },
            
            userAgent: () => {
                const ua = navigator.userAgent.toLowerCase();
                const scrapers = [
                    'scrapy', 'curl', 'wget', 'python', 'java', 'ruby', 'perl',
                    'scraping', 'bot', 'spider', 'crawler', 'phantomjs', 'selenium',
                    'puppeteer', 'playwright', 'headlesschrome', 'headless'
                ];
                return scrapers.some(s => ua.includes(s));
            },
            
            browserFeatures: () => {
                try {
                    return !window.localStorage || 
                           !window.sessionStorage ||
                           !window.indexedDB;
                } catch(e) {
                    return true;
                }
            },
            
            debugger: () => {
                const start = performance.now();
                debugger;
                const end = performance.now();
                return (end - start) > 100;
            }
        };
        
        let botScore = 0;
        
        for (const [name, check] of Object.entries(checks)) {
            try {
                if (check()) {
                    botScore += 25;
                    console.warn(`[Security] Bot detection: ${name}`);
                }
            } catch(e) {
                botScore += 10;
            }
        }
        
        if (botScore >= 50) {
            this.blockAccess('Bot detected', botScore);
        }
        
        this.suspiciousScore += botScore;
    }
    
    monitorBehavior() {
        document.addEventListener('mousemove', () => {
            this.mouseMovements++;
        }, { passive: true });
        
        document.addEventListener('scroll', () => {
            this.scrollEvents++;
        }, { passive: true });
        
        document.addEventListener('click', () => {
            this.clickEvents++;
        }, { passive: true });
        
        setInterval(() => {
            this.analyzeBehavior();
        }, 5000);
        
        this.enforceRateLimit();
    }
    
    analyzeBehavior() {
        const timeElapsed = (Date.now() - this.sessionStart) / 1000;
        
        if (timeElapsed > 10 && this.mouseMovements < 3) {
            this.suspiciousScore += 30;
        }
        
        if (timeElapsed > 15 && this.scrollEvents === 0 && window.scrollY === 0) {
            this.suspiciousScore += 20;
        }
        
        if (this.requestCount > 20 && timeElapsed < 60) {
            this.suspiciousScore += 40;
        }
        
        if (this.suspiciousScore >= 100 && !this.blocked) {
            this.blockAccess('Suspicious behavior pattern', this.suspiciousScore);
        }
        
        if (timeElapsed > 300) {
            this.requestCount = 0;
            this.sessionStart = Date.now();
        }
    }
    
    enforceRateLimit() {
        const originalFetch = window.fetch;
        const self = this;
        
        window.fetch = function(...args) {
            self.requestCount++;
            const now = Date.now();
            const timeSinceLastRequest = now - self.lastRequestTime;
            
            if (self.requestCount > 100 && timeSinceLastRequest < 60000) {
                self.blockAccess('Rate limit exceeded', self.requestCount);
                return Promise.reject(new Error('Access denied'));
            }
            
            self.lastRequestTime = now;
            return originalFetch.apply(this, args);
        };
        
        const originalXHR = window.XMLHttpRequest.prototype.open;
        window.XMLHttpRequest.prototype.open = function(...args) {
            self.requestCount++;
            return originalXHR.apply(this, args);
        };
    }
    
    protectData() {
        this.obfuscateDOM();
        
        document.addEventListener('contextmenu', (e) => {
            if (e.target.closest('.result-card, .service-data')) {
                e.preventDefault();
                this.showSecurityMessage('Right-click disabled for data protection');
            }
        });
        
        const style = document.createElement('style');
        style.textContent = `
            .result-card, .service-data {
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }
        `;
        document.head.appendChild(style);
        
        this.detectDevTools();
    }
    
    obfuscateDOM() {
        setTimeout(() => {
            const cards = document.querySelectorAll('.result-card');
            cards.forEach(card => {
                const phoneElements = card.querySelectorAll('.phone');
                phoneElements.forEach(el => {
                    const original = el.textContent;
                    el.setAttribute('data-original', original);
                    el.textContent = original.split('').join('\u200B');
                });
                
                if (Math.random() > 0.5) {
                    card.setAttribute('data-shuffle', Math.random());
                }
            });
        }, 1000);
    }
    
    setupHoneyPot() {
        const honeyPot = document.createElement('div');
        honeyPot.style.cssText = 'position:absolute;left:-9999px;opacity:0;';
        honeyPot.innerHTML = `
            <a href="/api/data.json" class="honeypot-link">Data</a>
            <a href="/data/services.json" class="honeypot-link">Services</a>
            <form action="/scrape-endpoint" class="honeypot-form">
                <input type="text" name="data" value="sensitive">
                <button type="submit">Submit</button>
            </form>
        `;
        document.body.appendChild(honeyPot);
        
        honeyPot.querySelectorAll('.honeypot-link, .honeypot-form').forEach(el => {
            el.addEventListener('click', (e) => {
                e.preventDefault();
                this.blockAccess('Honeypot triggered', 100);
            });
            
            el.addEventListener('submit', (e) => {
                e.preventDefault();
                this.blockAccess('Honeypot form triggered', 100);
            });
        });
    }
    
    enableEncryption() {
        window.encryptData = (data) => {
            const key = 'nepalservices2026';
            let encrypted = '';
            for (let i = 0; i < data.length; i++) {
                encrypted += String.fromCharCode(
                    data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                );
            }
            return btoa(encrypted);
        };
        
        window.decryptData = (encrypted) => {
            try {
                const key = 'nepalservices2026';
                const data = atob(encrypted);
                let decrypted = '';
                for (let i = 0; i < data.length; i++) {
                    decrypted += String.fromCharCode(
                        data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                    );
                }
                return decrypted;
            } catch(e) {
                return null;
            }
        };
    }
    
    detectDevTools() {
        const threshold = 160;
        
        const checkDevTools = () => {
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;
            
            if (widthThreshold || heightThreshold) {
                this.suspiciousScore += 30;
                console.warn('[Security] Developer tools detected');
            }
        };
        
        setInterval(checkDevTools, 1000);
        
        setInterval(() => {
            const start = performance.now();
            debugger;
            const end = performance.now();
            if (end - start > 100) {
                this.suspiciousScore += 50;
            }
        }, 2000);
    }
    
    blockAccess(reason, score) {
        if (this.blocked) return;
        this.blocked = true;
        
        console.error(`[Security] Access blocked: ${reason} (Score: ${score})`);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'security_block', {
                reason: reason,
                score: score,
                user_agent: navigator.userAgent
            });
        }
        
        document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #1e293b;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                color: white;
                font-family: system-ui, sans-serif;
                z-index: 999999;
            ">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🔒</div>
                <h1 style="font-size: 2rem; margin-bottom: 1rem;">Access Denied</h1>
                <p style="color: #94a3b8; max-width: 400px; text-align: center; line-height: 1.6;">
                    Suspicious activity detected. If you believe this is an error, 
                    please contact us at security@nepalservice.online
                </p>
                <p style="color: #64748b; font-size: 0.875rem; margin-top: 2rem;">
                    Reference: ${btoa(Date.now().toString()).slice(0, 16)}
                </p>
            </div>
        `;
        
        throw new Error('Access denied');
    }
    
    showSecurityMessage(message) {
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            font-family: system-ui;
            font-size: 0.875rem;
            z-index: 999999;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            animation: slideIn 0.3s ease;
        `;
        toast.textContent = `🔒 ${message}`;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.antiScraping = new AntiScraping();
    });
} else {
    window.antiScraping = new AntiScraping();
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AntiScraping;
}

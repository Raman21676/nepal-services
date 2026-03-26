/**
 * Nepal Services Directory - Security Monitoring
 * Real-time monitoring and alerting for suspicious activity
 */

class SecurityMonitor {
    constructor() {
        this.events = [];
        this.suspiciousIPs = new Set();
        this.blockedRequests = 0;
        this.init();
    }
    
    init() {
        this.monitorRequests();
        this.monitorDataAccess();
        this.setupAlertSystem();
        this.reportToServer();
    }
    
    monitorRequests() {
        // Monitor all fetch requests
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const [url, options] = args;
            const timestamp = new Date().toISOString();
            
            this.logEvent({
                type: 'fetch',
                url: url.toString(),
                method: options?.method || 'GET',
                timestamp,
                userAgent: navigator.userAgent
            });
            
            return originalFetch.apply(this, args);
        };
        
        // Monitor XMLHttpRequest
        const originalXHR = window.XMLHttpRequest.prototype.send;
        window.XMLHttpRequest.prototype.send = function(body) {
            this.addEventListener('load', () => {
                securityMonitor.logEvent({
                    type: 'xhr',
                    url: this.responseURL,
                    status: this.status,
                    timestamp: new Date().toISOString()
                });
            });
            return originalXHR.apply(this, arguments);
        };
    }
    
    monitorDataAccess() {
        // Monitor attempts to access data files
        const dataPatterns = [
            /data.*\.json/i,
            /api/i,
            /services.*\.json/i,
            /database/i
        ];
        
        // Check URL patterns
        const url = window.location.href;
        dataPatterns.forEach(pattern => {
            if (pattern.test(url)) {
                this.alert('Suspicious URL pattern detected', { url, pattern: pattern.toString() });
            }
        });
        
        // Monitor console for data dumping
        const originalConsoleLog = console.log;
        console.log = (...args) => {
            const logString = args.join(' ');
            if (this.containsSensitiveData(logString)) {
                this.alert('Potential data leak via console', { log: logString.slice(0, 100) });
            }
            return originalConsoleLog.apply(console, args);
        };
    }
    
    containsSensitiveData(text) {
        const patterns = [
            /\{.*name.*phone.*address.*\}/i,
            /\[.*\{.*hospital.*\}.*\]/i,
            /\[.*\{.*school.*\}.*\]/i,
            /phone.*:.*\d{7,}/,
            /email.*:.*@/
        ];
        return patterns.some(p => p.test(text));
    }
    
    setupAlertSystem() {
        // Alert on multiple rapid page loads
        let pageLoads = parseInt(sessionStorage.getItem('pageLoads') || '0');
        pageLoads++;
        sessionStorage.setItem('pageLoads', pageLoads);
        
        if (pageLoads > 10) {
            this.alert('Excessive page reloads detected', { count: pageLoads });
        }
        
        // Alert on copy/paste of large data
        document.addEventListener('copy', (e) => {
            const selection = window.getSelection().toString();
            if (selection.length > 1000) {
                this.alert('Large data copy detected', { length: selection.length });
            }
        });
    }
    
    logEvent(event) {
        this.events.push(event);
        
        // Keep only last 100 events
        if (this.events.length > 100) {
            this.events.shift();
        }
        
        // Check for suspicious patterns
        this.analyzePatterns();
    }
    
    analyzePatterns() {
        const recentEvents = this.events.slice(-20);
        
        // Check for rapid sequential requests
        if (recentEvents.length >= 10) {
            const timeSpan = new Date(recentEvents[recentEvents.length - 1].timestamp) - 
                            new Date(recentEvents[0].timestamp);
            
            if (timeSpan < 5000) { // 10 requests in 5 seconds
                this.alert('Rapid request pattern detected', { 
                    requests: recentEvents.length, 
                    timeSpan 
                });
            }
        }
        
        // Check for data harvesting pattern
        const dataRequests = recentEvents.filter(e => 
            e.url && (e.url.includes('data') || e.url.includes('json'))
        );
        
        if (dataRequests.length > 5) {
            this.alert('Possible data harvesting detected', { 
                dataRequests: dataRequests.length 
            });
        }
    }
    
    alert(message, details = {}) {
        const alert = {
            message,
            details,
            timestamp: new Date().toISOString(),
            ip: 'client-side',
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.warn('[Security Alert]', alert);
        
        // Send to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'security_alert', {
                message: message.slice(0, 100),
                ...details
            });
        }
        
        // Store locally for review
        const alerts = JSON.parse(localStorage.getItem('securityAlerts') || '[]');
        alerts.push(alert);
        localStorage.setItem('securityAlerts', JSON.stringify(alerts.slice(-50)));
    }
    
    reportToServer() {
        // Send periodic reports to server
        setInterval(() => {
            const report = {
                timestamp: new Date().toISOString(),
                events: this.events.length,
                alerts: JSON.parse(localStorage.getItem('securityAlerts') || '[]').length,
                blockedRequests: this.blockedRequests,
                userAgent: navigator.userAgent,
                url: window.location.href
            };
            
            // Send beacon when user leaves
            window.addEventListener('beforeunload', () => {
                navigator.sendBeacon('/api/security-report', JSON.stringify(report));
            });
        }, 60000); // Every minute
    }
    
    // Public API for security checks
    static checkIntegrity() {
        return {
            timestamp: new Date().toISOString(),
            secure: true,
            checks: {
                https: window.location.protocol === 'https:',
                botProtection: !!window.antiScraping,
                csp: !!document.querySelector('meta[http-equiv="Content-Security-Policy"]')
            }
        };
    }
}

// Initialize
window.securityMonitor = new SecurityMonitor();

// Expose for debugging (remove in production)
if (location.hostname === 'localhost') {
    window.SecurityMonitor = SecurityMonitor;
}

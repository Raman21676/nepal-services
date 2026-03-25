/**
 * Nepal Services Directory - Data Loader
 * Loads data from all provinces
 */

// Combine all province manifests
const DATA_MANIFEST = [
    // Bagmati Province (13 districts, 15 cities)
    ...BAGMATI_MANIFEST,
    
    // Koshi Province (14 districts, 16 cities)
    ...KOSHI_MANIFEST,
    
    // Madhesh Province (8 districts, 8 cities)
    ...MADHESH_MANIFEST,
    
    // Gandaki Province (11 districts, 11 cities)
    ...GANDAKI_MANIFEST,
    
    // Lumbini Province (10 districts, 12 cities)
    ...LUMBINI_MANIFEST,
    
    // Karnali Province (9 districts, 9 cities)
    ...KARNALI_MANIFEST,
    
    // Sudurpashchim Province (9 districts, 9 cities)
    ...SUDURPASHCHIM_MANIFEST
];

// Data Loader Class
class DataLoader {
    constructor() {
        this.cache = new Map();
    }
    
    async loadJSON(entry) {
        // Check cache first
        if (this.cache.has(entry.path)) {
            return { data: this.cache.get(entry.path), meta: entry };
        }
        
        try {
            const response = await fetch(entry.path);
            if (!response.ok) {
                console.warn(`Failed to load ${entry.path}: ${response.status}`);
                return null;
            }
            const data = await response.json();
            
            // Cache the result
            this.cache.set(entry.path, data);
            
            return { data, meta: entry };
        } catch (error) {
            console.warn(`Error loading ${entry.path}:`, error);
            return null;
        }
    }
    
    async loadAllData(manifest = DATA_MANIFEST) {
        const loadingPromises = manifest.map(entry => this.loadJSON(entry));
        const results = await Promise.allSettled(loadingPromises);
        
        const allData = [];
        const availableCities = new Set();
        const availableDistricts = new Set();
        const availableProvinces = new Set();
        const availableCategories = new Set();
        
        results.forEach((result) => {
            if (result.status === 'fulfilled' && result.value) {
                const { data, meta } = result.value;
                const processedData = this.processData(data, meta);
                allData.push(...processedData);
                availableCities.add(meta.city);
                availableDistricts.add(meta.district);
                availableProvinces.add(meta.province);
                availableCategories.add(meta.type);
            }
        });
        
        return {
            allData,
            availableCities,
            availableDistricts,
            availableProvinces,
            availableCategories
        };
    }
    
    processData(data, meta) {
        const records = [];
        const arrayKey = this.getArrayKey(meta.type);
        
        if (data[arrayKey]) {
            data[arrayKey].forEach(item => {
                records.push(this.createRecord(item, meta));
            });
        }
        
        return records;
    }
    
    getArrayKey(type) {
        return CONFIG.ARRAY_KEY_MAP[type] || type;
    }
    
    createRecord(item, meta) {
        return {
            ...item,
            _province: meta.province,
            _district: meta.district,
            _city: meta.city,
            _category: meta.type,
            _searchText: this.createSearchText(item)
        };
    }
    
    createSearchText(item) {
        const searchFields = [
            item.name,
            item.name_np,
            item.address,
            item.type,
            item.services?.join(' '),
            item.specialties?.join(' ')
        ].filter(Boolean).join(' ').toLowerCase();
        
        return searchFields;
    }
}

// Create global instance
const dataLoader = new DataLoader();

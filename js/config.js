/**
 * Nepal Services Directory - Configuration
 * Central configuration and constants
 */

const CONFIG = {
    // Pagination settings
    ITEMS_PER_PAGE: 12,
    
    // Province names mapping
    PROVINCE_NAMES: {
        'bagmati': 'Bagmati Province',
        'koshi': 'Koshi Province',
        'madhesh': 'Madhesh Province',
        'gandaki': 'Gandaki Province',
        'lumbini': 'Lumbini Province',
        'karnali': 'Karnali Province',
        'sudurpashchim': 'Sudurpashchim Province'
    },
    
    // Category display names
    CATEGORY_NAMES: {
        'hospitals': 'Hospitals',
        'clinics': 'Clinics',
        'pharmacies': 'Pharmacies',
        'schools': 'Schools',
        'colleges': 'Colleges',
        'blood_banks': 'Blood Banks',
        'ambulance': 'Ambulance',
        'emergency': 'Emergency',
        'veterinary': 'Veterinary',
        'ward': 'Ward Offices',
        'government': 'Government Offices',
        'forest': 'Forest Offices',
        'hotels': 'Hotels',
        'tourism': 'Tourism'
    },
    
    // Array key mapping for JSON data
    ARRAY_KEY_MAP: {
        'hospitals': 'hospitals',
        'schools': 'schools',
        'ambulance': 'ambulance',
        'emergency': 'emergency',
        'ward': 'ward_offices',
        'clinics': 'clinics',
        'blood_banks': 'blood_banks',
        'colleges': 'colleges',
        'pharmacies': 'pharmacies',
        'veterinary': 'veterinary',
        'government': 'government_offices',
        'forest': 'forest_offices',
        'hotels': 'hotels',
        'tourism': 'tourism'
    },
    
    // Badge colors for categories
    CATEGORY_BADGES: {
        'hospitals': '<span class="badge badge-cat-hospital">Hospital</span>',
        'schools': '<span class="badge badge-cat-school">School</span>',
        'ambulance': '<span class="badge badge-cat-ambulance">Ambulance</span>',
        'emergency': '<span class="badge badge-cat-emergency emergency-badge">🚨 Emergency</span>',
        'ward': '<span class="badge badge-cat-ward">Ward Office</span>',
        'clinics': '<span class="badge badge-cat-clinic">Clinic</span>',
        'blood_banks': '<span class="badge badge-cat-blood">🩸 Blood Bank</span>',
        'colleges': '<span class="badge badge-cat-college">College</span>',
        'pharmacies': '<span class="badge badge-cat-pharmacy">💊 Pharmacy</span>',
        'veterinary': '<span class="badge badge-cat-vet">🐾 Veterinary</span>',
        'government': '<span class="badge badge-cat-gov">🏛️ Government</span>',
        'forest': '<span class="badge badge-cat-forest">🌲 Forest Office</span>',
        'hotels': '<span class="badge badge-cat-hotel">🏨 Hotel</span>',
        'tourism': '<span class="badge badge-cat-tourism">🎯 Tourism</span>'
    },
    
    // City badge CSS classes
    CITY_BADGE_CLASSES: {
        'kathmandu': 'badge-city-ktm',
        'lalitpur': 'badge-city-lalitpur',
        'bhaktapur': 'badge-city-bhaktapur',
        'pokhara': 'badge-city-pkr',
        'biratnagar': 'badge-city-bir',
        'bharatpur': 'badge-city-default',
        'birgunj': 'badge-city-default',
        'janakpur': 'badge-city-default',
        'hetauda': 'badge-city-default',
        'dharan': 'badge-city-dharan',
        'butwal': 'badge-city-butwal'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

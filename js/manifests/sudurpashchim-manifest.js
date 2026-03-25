/**
 * Sudurpashchim Province Data Manifest
 * Last updated: 2025-01-20
 */

const sudurpashchimData = {
    province: 'sudurpashchim',
    provinceName: 'Sudurpashchim Province',
    districts: {
        'achham': {
            name: 'Achham',
            cities: {
                'mangalsen': 'data/provinces/sudurpashchim/achham/mangalsen.json'
            }
        },
        'baitadi': {
            name: 'Baitadi',
            cities: {
                'baitadi': 'data/provinces/sudurpashchim/baitadi/baitadi.json'
            }
        },
        'bajhang': {
            name: 'Bajhang',
            cities: {
                'chainpur': 'data/provinces/sudurpashchim/bajhang/chainpur.json'
            }
        },
        'bajura': {
            name: 'Bajura',
            cities: {
                'martadi': 'data/provinces/sudurpashchim/bajura/martadi.json'
            }
        },
        'dadeldhura': {
            name: 'Dadeldhura',
            cities: {
                'dadeldhura': 'data/provinces/sudurpashchim/dadeldhura/dadeldhura.json'
            }
        },
        'darchula': {
            name: 'Darchula',
            cities: {
                'darchula': 'data/provinces/sudurpashchim/darchula/darchula.json'
            }
        },
        'doti': {
            name: 'Doti',
            cities: {
                'silgadhi': 'data/provinces/sudurpashchim/doti/silgadhi.json'
            }
        },
        'kailali': {
            name: 'Kailali',
            cities: {
                'dhangadhi': 'data/provinces/sudurpashchim/kailali/dhangadhi.json'
            }
        },
        'kanchanpur': {
            name: 'Kanchanpur',
            cities: {
                'mahendranagar': 'data/provinces/sudurpashchim/kanchanpur/mahendranagar.json'
            }
        }
    }
};

// Register with data loader
if (typeof dataLoader !== 'undefined') {
    dataLoader.registerProvinceManifest(sudurpashchimData);
}
    
    // Forest Offices - Sudurpashchim Province
    { path: 'data/provinces/sudurpashchim/achham/mangalsen_forest_offices.json', province: 'sudurpashchim', district: 'achham', city: 'mangalsen', type: 'forest' },
    { path: 'data/provinces/sudurpashchim/baitadi/baitadi_forest_offices.json', province: 'sudurpashchim', district: 'baitadi', city: 'baitadi', type: 'forest' },
    { path: 'data/provinces/sudurpashchim/bajhang/chainpur_forest_offices.json', province: 'sudurpashchim', district: 'bajhang', city: 'chainpur', type: 'forest' },
    { path: 'data/provinces/sudurpashchim/bajura/martadi_forest_offices.json', province: 'sudurpashchim', district: 'bajura', city: 'martadi', type: 'forest' },
    { path: 'data/provinces/sudurpashchim/dadeldhura/dadeldhura_forest_offices.json', province: 'sudurpashchim', district: 'dadeldhura', city: 'dadeldhura', type: 'forest' },
    { path: 'data/provinces/sudurpashchim/darchula/darchula_forest_offices.json', province: 'sudurpashchim', district: 'darchula', city: 'darchula', type: 'forest' },
    
    // Kailali Secondary City - Tikapur
    { path: 'data/provinces/sudurpashchim/kailali/tikapur/tikapur_hospitals.json', province: 'sudurpashchim', district: 'kailali', city: 'tikapur', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/kailali/tikapur/tikapur_colleges.json', province: 'sudurpashchim', district: 'kailali', city: 'tikapur', type: 'colleges' },
    { path: 'data/provinces/sudurpashchim/kailali/tikapur/tikapur_schools.json', province: 'sudurpashchim', district: 'kailali', city: 'tikapur', type: 'schools' },
    { path: 'data/provinces/sudurpashchim/kailali/tikapur/tikapur_clinics.json', province: 'sudurpashchim', district: 'kailali', city: 'tikapur', type: 'clinics' },
    { path: 'data/provinces/sudurpashchim/kailali/tikapur/tikapur_pharmacies.json', province: 'sudurpashchim', district: 'kailali', city: 'tikapur', type: 'pharmacies' },
    { path: 'data/provinces/sudurpashchim/kailali/tikapur/tikapur_ambulance.json', province: 'sudurpashchim', district: 'kailali', city: 'tikapur', type: 'ambulance' },
    { path: 'data/provinces/sudurpashchim/kailali/tikapur/tikapur_blood_banks.json', province: 'sudurpashchim', district: 'kailali', city: 'tikapur', type: 'blood_banks' },
    { path: 'data/provinces/sudurpashchim/kailali/tikapur/tikapur_emergency.json', province: 'sudurpashchim', district: 'kailali', city: 'tikapur', type: 'emergency' },
    { path: 'data/provinces/sudurpashchim/kailali/tikapur/tikapur_government.json', province: 'sudurpashchim', district: 'kailali', city: 'tikapur', type: 'government' },
    { path: 'data/provinces/sudurpashchim/kailali/tikapur/tikapur_veterinary.json', province: 'sudurpashchim', district: 'kailali', city: 'tikapur', type: 'veterinary' },
    
    // Kailali Secondary City - Lamki
    { path: 'data/provinces/sudurpashchim/kailali/lamki/lamki_hospitals.json', province: 'sudurpashchim', district: 'kailali', city: 'lamki', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/kailali/lamki/lamki_colleges.json', province: 'sudurpashchim', district: 'kailali', city: 'lamki', type: 'colleges' },
    { path: 'data/provinces/sudurpashchim/kailali/lamki/lamki_schools.json', province: 'sudurpashchim', district: 'kailali', city: 'lamki', type: 'schools' },
    { path: 'data/provinces/sudurpashchim/kailali/lamki/lamki_clinics.json', province: 'sudurpashchim', district: 'kailali', city: 'lamki', type: 'clinics' },
    { path: 'data/provinces/sudurpashchim/kailali/lamki/lamki_pharmacies.json', province: 'sudurpashchim', district: 'kailali', city: 'lamki', type: 'pharmacies' },
    { path: 'data/provinces/sudurpashchim/kailali/lamki/lamki_ambulance.json', province: 'sudurpashchim', district: 'kailali', city: 'lamki', type: 'ambulance' },
    { path: 'data/provinces/sudurpashchim/kailali/lamki/lamki_blood_banks.json', province: 'sudurpashchim', district: 'kailali', city: 'lamki', type: 'blood_banks' },
    { path: 'data/provinces/sudurpashchim/kailali/lamki/lamki_emergency.json', province: 'sudurpashchim', district: 'kailali', city: 'lamki', type: 'emergency' },
    { path: 'data/provinces/sudurpashchim/kailali/lamki/lamki_government.json', province: 'sudurpashchim', district: 'kailali', city: 'lamki', type: 'government' },
    { path: 'data/provinces/sudurpashchim/kailali/lamki/lamki_veterinary.json', province: 'sudurpashchim', district: 'kailali', city: 'lamki', type: 'veterinary' },
];

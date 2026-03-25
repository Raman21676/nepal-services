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
    { path: 'data/provinces/sudurpashchim/doti/dipayal_forest_offices.json', province: 'sudurpashchim', district: 'doti', city: 'dipayal', type: 'forest' },
    { path: 'data/provinces/sudurpashchim/kailali/dhangadhi_forest_offices.json', province: 'sudurpashchim', district: 'kailali', city: 'dhangadhi', type: 'forest' },
    { path: 'data/provinces/sudurpashchim/kanchanpur/mahendranagar_forest_offices.json', province: 'sudurpashchim', district: 'kanchanpur', city: 'mahendranagar', type: 'forest' },
];

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

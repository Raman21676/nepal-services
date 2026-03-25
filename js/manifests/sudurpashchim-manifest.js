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
    { path: 'data/provinces/sudurpashchim/achham/mangalsen_forest_offices.json', province: 'sudurpashchim', district: 'achham', city: 'mangalsen', type: 'forest_offices' },
    { path: 'data/provinces/sudurpashchim/baitadi/baitadi_forest_offices.json', province: 'sudurpashchim', district: 'baitadi', city: 'baitadi', type: 'forest_offices' },
    { path: 'data/provinces/sudurpashchim/bajhang/chainpur_forest_offices.json', province: 'sudurpashchim', district: 'bajhang', city: 'chainpur', type: 'forest_offices' },
    { path: 'data/provinces/sudurpashchim/bajura/martadi_forest_offices.json', province: 'sudurpashchim', district: 'bajura', city: 'martadi', type: 'forest_offices' },
    { path: 'data/provinces/sudurpashchim/dadeldhura/dadeldhura_forest_offices.json', province: 'sudurpashchim', district: 'dadeldhura', city: 'dadeldhura', type: 'forest_offices' },
    { path: 'data/provinces/sudurpashchim/darchula/darchula_forest_offices.json', province: 'sudurpashchim', district: 'darchula', city: 'darchula', type: 'forest_offices' },
    
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
    { path: 'data/provinces/sudurpashchim/achham/mangalsen_ambulance.json', province: 'sudurpashchim', district: 'achham', city: 'mangalsen', type: 'ambulance' },
    { path: 'data/provinces/sudurpashchim/achham/mangalsen_blood_banks.json', province: 'sudurpashchim', district: 'achham', city: 'mangalsen', type: 'blood_banks' },
    { path: 'data/provinces/sudurpashchim/achham/mangalsen_clinics.json', province: 'sudurpashchim', district: 'achham', city: 'mangalsen', type: 'clinics' },
    { path: 'data/provinces/sudurpashchim/achham/mangalsen_colleges.json', province: 'sudurpashchim', district: 'achham', city: 'mangalsen', type: 'colleges' },
    { path: 'data/provinces/sudurpashchim/achham/mangalsen_emergency_contacts.json', province: 'sudurpashchim', district: 'achham', city: 'mangalsen_emergency', type: 'emergency' },
    { path: 'data/provinces/sudurpashchim/achham/mangalsen_government.json', province: 'sudurpashchim', district: 'achham', city: 'mangalsen', type: 'government' },
    { path: 'data/provinces/sudurpashchim/achham/mangalsen_hospitals.json', province: 'sudurpashchim', district: 'achham', city: 'mangalsen', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/achham/mangalsen_pharmacies.json', province: 'sudurpashchim', district: 'achham', city: 'mangalsen', type: 'pharmacies' },
    { path: 'data/provinces/sudurpashchim/achham/mangalsen_schools.json', province: 'sudurpashchim', district: 'achham', city: 'mangalsen', type: 'schools' },
    { path: 'data/provinces/sudurpashchim/achham/mangalsen_veterinary.json', province: 'sudurpashchim', district: 'achham', city: 'mangalsen', type: 'veterinary' },
    { path: 'data/provinces/sudurpashchim/baitadi/baitadi_hospitals.json', province: 'sudurpashchim', district: 'baitadi', city: 'baitadi', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/baitadi/dasharathchand_ambulance.json', province: 'sudurpashchim', district: 'baitadi', city: 'dasharathchand', type: 'ambulance' },
    { path: 'data/provinces/sudurpashchim/baitadi/dasharathchand_blood_banks.json', province: 'sudurpashchim', district: 'baitadi', city: 'dasharathchand', type: 'blood_banks' },
    { path: 'data/provinces/sudurpashchim/baitadi/dasharathchand_clinics.json', province: 'sudurpashchim', district: 'baitadi', city: 'dasharathchand', type: 'clinics' },
    { path: 'data/provinces/sudurpashchim/baitadi/dasharathchand_colleges.json', province: 'sudurpashchim', district: 'baitadi', city: 'dasharathchand', type: 'colleges' },
    { path: 'data/provinces/sudurpashchim/baitadi/dasharathchand_emergency.json', province: 'sudurpashchim', district: 'baitadi', city: 'dasharathchand', type: 'emergency' },
    { path: 'data/provinces/sudurpashchim/baitadi/dasharathchand_government.json', province: 'sudurpashchim', district: 'baitadi', city: 'dasharathchand', type: 'government' },
    { path: 'data/provinces/sudurpashchim/baitadi/dasharathchand_pharmacies.json', province: 'sudurpashchim', district: 'baitadi', city: 'dasharathchand', type: 'pharmacies' },
    { path: 'data/provinces/sudurpashchim/baitadi/dasharathchand_schools.json', province: 'sudurpashchim', district: 'baitadi', city: 'dasharathchand', type: 'schools' },
    { path: 'data/provinces/sudurpashchim/baitadi/dasharathchand_veterinary.json', province: 'sudurpashchim', district: 'baitadi', city: 'dasharathchand', type: 'veterinary' },
    { path: 'data/provinces/sudurpashchim/bajhang/chainpur_ambulance.json', province: 'sudurpashchim', district: 'bajhang', city: 'chainpur', type: 'ambulance' },
    { path: 'data/provinces/sudurpashchim/bajhang/chainpur_blood_banks.json', province: 'sudurpashchim', district: 'bajhang', city: 'chainpur', type: 'blood_banks' },
    { path: 'data/provinces/sudurpashchim/bajhang/chainpur_clinics.json', province: 'sudurpashchim', district: 'bajhang', city: 'chainpur', type: 'clinics' },
    { path: 'data/provinces/sudurpashchim/bajhang/chainpur_colleges.json', province: 'sudurpashchim', district: 'bajhang', city: 'chainpur', type: 'colleges' },
    { path: 'data/provinces/sudurpashchim/bajhang/chainpur_emergency.json', province: 'sudurpashchim', district: 'bajhang', city: 'chainpur', type: 'emergency' },
    { path: 'data/provinces/sudurpashchim/bajhang/chainpur_government.json', province: 'sudurpashchim', district: 'bajhang', city: 'chainpur', type: 'government' },
    { path: 'data/provinces/sudurpashchim/bajhang/chainpur_hospitals.json', province: 'sudurpashchim', district: 'bajhang', city: 'chainpur', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/bajhang/chainpur_pharmacies.json', province: 'sudurpashchim', district: 'bajhang', city: 'chainpur', type: 'pharmacies' },
    { path: 'data/provinces/sudurpashchim/bajhang/chainpur_schools.json', province: 'sudurpashchim', district: 'bajhang', city: 'chainpur', type: 'schools' },
    { path: 'data/provinces/sudurpashchim/bajhang/chainpur_veterinary.json', province: 'sudurpashchim', district: 'bajhang', city: 'chainpur', type: 'veterinary' },
    { path: 'data/provinces/sudurpashchim/bajura/martadi_ambulance.json', province: 'sudurpashchim', district: 'bajura', city: 'martadi', type: 'ambulance' },
    { path: 'data/provinces/sudurpashchim/bajura/martadi_blood_banks.json', province: 'sudurpashchim', district: 'bajura', city: 'martadi', type: 'blood_banks' },
    { path: 'data/provinces/sudurpashchim/bajura/martadi_clinics.json', province: 'sudurpashchim', district: 'bajura', city: 'martadi', type: 'clinics' },
    { path: 'data/provinces/sudurpashchim/bajura/martadi_colleges.json', province: 'sudurpashchim', district: 'bajura', city: 'martadi', type: 'colleges' },
    { path: 'data/provinces/sudurpashchim/bajura/martadi_emergency.json', province: 'sudurpashchim', district: 'bajura', city: 'martadi', type: 'emergency' },
    { path: 'data/provinces/sudurpashchim/bajura/martadi_government.json', province: 'sudurpashchim', district: 'bajura', city: 'martadi', type: 'government' },
    { path: 'data/provinces/sudurpashchim/bajura/martadi_hospitals.json', province: 'sudurpashchim', district: 'bajura', city: 'martadi', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/bajura/martadi_pharmacies.json', province: 'sudurpashchim', district: 'bajura', city: 'martadi', type: 'pharmacies' },
    { path: 'data/provinces/sudurpashchim/bajura/martadi_schools.json', province: 'sudurpashchim', district: 'bajura', city: 'martadi', type: 'schools' },
    { path: 'data/provinces/sudurpashchim/bajura/martadi_veterinary.json', province: 'sudurpashchim', district: 'bajura', city: 'martadi', type: 'veterinary' },
    { path: 'data/provinces/sudurpashchim/dadeldhura/dadeldhura_ambulance.json', province: 'sudurpashchim', district: 'dadeldhura', city: 'dadeldhura', type: 'ambulance' },
    { path: 'data/provinces/sudurpashchim/dadeldhura/dadeldhura_blood_banks.json', province: 'sudurpashchim', district: 'dadeldhura', city: 'dadeldhura', type: 'blood_banks' },
    { path: 'data/provinces/sudurpashchim/dadeldhura/dadeldhura_clinics.json', province: 'sudurpashchim', district: 'dadeldhura', city: 'dadeldhura', type: 'clinics' },
    { path: 'data/provinces/sudurpashchim/dadeldhura/dadeldhura_colleges.json', province: 'sudurpashchim', district: 'dadeldhura', city: 'dadeldhura', type: 'colleges' },
    { path: 'data/provinces/sudurpashchim/dadeldhura/dadeldhura_emergency.json', province: 'sudurpashchim', district: 'dadeldhura', city: 'dadeldhura', type: 'emergency' },
    { path: 'data/provinces/sudurpashchim/dadeldhura/dadeldhura_government.json', province: 'sudurpashchim', district: 'dadeldhura', city: 'dadeldhura', type: 'government' },
    { path: 'data/provinces/sudurpashchim/dadeldhura/dadeldhura_hospitals.json', province: 'sudurpashchim', district: 'dadeldhura', city: 'dadeldhura', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/dadeldhura/dadeldhura_pharmacies.json', province: 'sudurpashchim', district: 'dadeldhura', city: 'dadeldhura', type: 'pharmacies' },
    { path: 'data/provinces/sudurpashchim/dadeldhura/dadeldhura_schools.json', province: 'sudurpashchim', district: 'dadeldhura', city: 'dadeldhura', type: 'schools' },
    { path: 'data/provinces/sudurpashchim/dadeldhura/dadeldhura_veterinary.json', province: 'sudurpashchim', district: 'dadeldhura', city: 'dadeldhura', type: 'veterinary' },
    { path: 'data/provinces/sudurpashchim/darchula/darchula_ambulance.json', province: 'sudurpashchim', district: 'darchula', city: 'darchula', type: 'ambulance' },
    { path: 'data/provinces/sudurpashchim/darchula/darchula_blood_banks.json', province: 'sudurpashchim', district: 'darchula', city: 'darchula', type: 'blood_banks' },
    { path: 'data/provinces/sudurpashchim/darchula/darchula_clinics.json', province: 'sudurpashchim', district: 'darchula', city: 'darchula', type: 'clinics' },
    { path: 'data/provinces/sudurpashchim/darchula/darchula_colleges.json', province: 'sudurpashchim', district: 'darchula', city: 'darchula', type: 'colleges' },
    { path: 'data/provinces/sudurpashchim/darchula/darchula_emergency.json', province: 'sudurpashchim', district: 'darchula', city: 'darchula', type: 'emergency' },
    { path: 'data/provinces/sudurpashchim/darchula/darchula_government.json', province: 'sudurpashchim', district: 'darchula', city: 'darchula', type: 'government' },
    { path: 'data/provinces/sudurpashchim/darchula/darchula_hospitals.json', province: 'sudurpashchim', district: 'darchula', city: 'darchula', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/darchula/darchula_pharmacies.json', province: 'sudurpashchim', district: 'darchula', city: 'darchula', type: 'pharmacies' },
    { path: 'data/provinces/sudurpashchim/darchula/darchula_schools.json', province: 'sudurpashchim', district: 'darchula', city: 'darchula', type: 'schools' },
    { path: 'data/provinces/sudurpashchim/darchula/darchula_veterinary.json', province: 'sudurpashchim', district: 'darchula', city: 'darchula', type: 'veterinary' },
    { path: 'data/provinces/sudurpashchim/doti/dipayal_ambulance.json', province: 'sudurpashchim', district: 'doti', city: 'silgadhi', type: 'ambulance' },
    { path: 'data/provinces/sudurpashchim/doti/dipayal_blood_banks.json', province: 'sudurpashchim', district: 'doti', city: 'dipayal', type: 'blood_banks' },
    { path: 'data/provinces/sudurpashchim/doti/dipayal_clinics.json', province: 'sudurpashchim', district: 'doti', city: 'dipayal', type: 'clinics' },
    { path: 'data/provinces/sudurpashchim/doti/dipayal_colleges.json', province: 'sudurpashchim', district: 'doti', city: 'dipayal', type: 'colleges' },
    { path: 'data/provinces/sudurpashchim/doti/dipayal_emergency.json', province: 'sudurpashchim', district: 'doti', city: 'dipayal', type: 'emergency' },
    { path: 'data/provinces/sudurpashchim/doti/dipayal_emergency_contacts.json', province: 'sudurpashchim', district: 'doti', city: 'dipayal_emergency', type: 'emergency' },
    { path: 'data/provinces/sudurpashchim/doti/dipayal_forest_offices.json', province: 'sudurpashchim', district: 'doti', city: 'dipayal', type: 'forest_offices' },
    { path: 'data/provinces/sudurpashchim/doti/dipayal_government.json', province: 'sudurpashchim', district: 'doti', city: 'dipayal', type: 'government' },
    { path: 'data/provinces/sudurpashchim/doti/dipayal_hospitals.json', province: 'sudurpashchim', district: 'doti', city: 'dipayal', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/doti/dipayal_pharmacies.json', province: 'sudurpashchim', district: 'doti', city: 'dipayal', type: 'pharmacies' },
    { path: 'data/provinces/sudurpashchim/doti/dipayal_schools.json', province: 'sudurpashchim', district: 'doti', city: 'dipayal', type: 'schools' },
    { path: 'data/provinces/sudurpashchim/doti/dipayal_veterinary.json', province: 'sudurpashchim', district: 'doti', city: 'dipayal', type: 'veterinary' },
    { path: 'data/provinces/sudurpashchim/kailali/dhangadhi_blood_banks.json', province: 'sudurpashchim', district: 'kailali', city: 'dhangadhi', type: 'blood_banks' },
    { path: 'data/provinces/sudurpashchim/kailali/dhangadhi_clinics.json', province: 'sudurpashchim', district: 'kailali', city: 'dhangadhi', type: 'clinics' },
    { path: 'data/provinces/sudurpashchim/kailali/dhangadhi_colleges.json', province: 'sudurpashchim', district: 'kailali', city: 'dhangadhi', type: 'colleges' },
    { path: 'data/provinces/sudurpashchim/kailali/dhangadhi_emergency_contacts.json', province: 'sudurpashchim', district: 'kailali', city: 'dhangadhi_emergency', type: 'emergency' },
    { path: 'data/provinces/sudurpashchim/kailali/dhangadhi_forest_offices.json', province: 'sudurpashchim', district: 'kailali', city: 'dhangadhi', type: 'forest_offices' },
    { path: 'data/provinces/sudurpashchim/kailali/dhangadhi_hospitals.json', province: 'sudurpashchim', district: 'kailali', city: 'dhangadhi', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/kailali/dhangadhi_pharmacies.json', province: 'sudurpashchim', district: 'kailali', city: 'dhangadhi', type: 'pharmacies' },
    { path: 'data/provinces/sudurpashchim/kailali/dhangadhi_schools.json', province: 'sudurpashchim', district: 'kailali', city: 'dhangadhi', type: 'schools' },
    { path: 'data/provinces/sudurpashchim/kailali/dhangadhi_veterinary.json', province: 'sudurpashchim', district: 'kailali', city: 'dhangadhi', type: 'veterinary' },
    { path: 'data/provinces/sudurpashchim/kanchanpur/bhimdatta_ambulance.json', province: 'sudurpashchim', district: 'kanchanpur', city: 'mahendranagar', type: 'ambulance' },
    { path: 'data/provinces/sudurpashchim/kanchanpur/bhimdatta_blood_banks.json', province: 'sudurpashchim', district: 'kanchanpur', city: 'bhimdatta', type: 'blood_banks' },
    { path: 'data/provinces/sudurpashchim/kanchanpur/bhimdatta_clinics.json', province: 'sudurpashchim', district: 'kanchanpur', city: 'bhimdatta', type: 'clinics' },
    { path: 'data/provinces/sudurpashchim/kanchanpur/bhimdatta_colleges.json', province: 'sudurpashchim', district: 'kanchanpur', city: 'bhimdatta', type: 'colleges' },
    { path: 'data/provinces/sudurpashchim/kanchanpur/bhimdatta_government.json', province: 'sudurpashchim', district: 'kanchanpur', city: 'bhimdatta', type: 'government' },
    { path: 'data/provinces/sudurpashchim/kanchanpur/bhimdatta_pharmacies.json', province: 'sudurpashchim', district: 'kanchanpur', city: 'bhimdatta', type: 'pharmacies' },
    { path: 'data/provinces/sudurpashchim/kanchanpur/bhimdatta_schools.json', province: 'sudurpashchim', district: 'kanchanpur', city: 'bhimdatta', type: 'schools' },
    { path: 'data/provinces/sudurpashchim/kanchanpur/bhimdatta_veterinary.json', province: 'sudurpashchim', district: 'kanchanpur', city: 'bhimdatta', type: 'veterinary' },
    { path: 'data/provinces/sudurpashchim/kanchanpur/mahendranagar_emergency_contacts.json', province: 'sudurpashchim', district: 'kanchanpur', city: 'mahendranagar_emergency', type: 'emergency' },
    { path: 'data/provinces/sudurpashchim/kanchanpur/mahendranagar_forest_offices.json', province: 'sudurpashchim', district: 'kanchanpur', city: 'mahendranagar', type: 'forest_offices' },
    { path: 'data/provinces/sudurpashchim/kanchanpur/mahendranagar_hospitals.json', province: 'sudurpashchim', district: 'kanchanpur', city: 'mahendranagar', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/baitadi/baitadi.json', province: 'sudurpashchim', district: 'baitadi', city: 'dasharathchand', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/bajhang/chainpur.json', province: 'sudurpashchim', district: 'bajhang', city: 'chainpur', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/dadeldhura/dadeldhura.json', province: 'sudurpashchim', district: 'dadeldhura', city: 'dadeldhura', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/darchula/darchula.json', province: 'sudurpashchim', district: 'darchula', city: 'darchula', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/kailali/dhangadhi.json', province: 'sudurpashchim', district: 'kailali', city: 'dhangadhi', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/kanchanpur/mahendranagar.json', province: 'sudurpashchim', district: 'kanchanpur', city: 'bhimdatta', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/achham/mangalsen.json', province: 'sudurpashchim', district: 'achham', city: 'mangalsen', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/bajura/martadi.json', province: 'sudurpashchim', district: 'bajura', city: 'martadi', type: 'hospitals' },
    { path: 'data/provinces/sudurpashchim/doti/silgadhi.json', province: 'sudurpashchim', district: 'doti', city: 'silgadhi', type: 'hospitals' }
];

/**
 * Gandaki Province Data Manifest
 * All data files for Gandaki Province (11 districts, 11 cities)
 */

const GANDAKI_MANIFEST = [
    // Pokhara (Kaski)
    { path: 'data/provinces/gandaki/kaski/pokhara_hospitals.json', province: 'gandaki', district: 'kaski', city: 'pokhara', type: 'hospitals' },
    { path: 'data/provinces/gandaki/kaski/pokhara_schools.json', province: 'gandaki', district: 'kaski', city: 'pokhara', type: 'schools' },
    { path: 'data/provinces/gandaki/kaski/pokhara_colleges.json', province: 'gandaki', district: 'kaski', city: 'pokhara', type: 'colleges' },
    { path: 'data/provinces/gandaki/kaski/pokhara_clinics.json', province: 'gandaki', district: 'kaski', city: 'pokhara', type: 'clinics' },
    { path: 'data/provinces/gandaki/kaski/pokhara_pharmacies.json', province: 'gandaki', district: 'kaski', city: 'pokhara', type: 'pharmacies' },
    { path: 'data/provinces/gandaki/kaski/pokhara_veterinary.json', province: 'gandaki', district: 'kaski', city: 'pokhara', type: 'veterinary' },
    { path: 'data/provinces/gandaki/kaski/pokhara_blood_banks.json', province: 'gandaki', district: 'kaski', city: 'pokhara', type: 'blood_banks' },
    { path: 'data/provinces/gandaki/kaski/pokhara_ambulance_services.json', province: 'gandaki', district: 'kaski', city: 'pokhara', type: 'ambulance' },
    { path: 'data/provinces/gandaki/kaski/pokhara_emergency_contacts.json', province: 'gandaki', district: 'kaski', city: 'pokhara', type: 'emergency' },
    { path: 'data/provinces/gandaki/kaski/pokhara_ward_offices.json', province: 'gandaki', district: 'kaski', city: 'pokhara', type: 'ward' },
    { path: 'data/provinces/gandaki/kaski/pokhara_government.json', province: 'gandaki', district: 'kaski', city: 'pokhara', type: 'government' },
    
    // Gorkha
    { path: 'data/provinces/gandaki/gorkha/gorkha.json', province: 'gandaki', district: 'gorkha', city: 'gorkha', type: 'hospitals' },
    { path: 'data/provinces/gandaki/gorkha/gorkha_clinics.json', province: 'gandaki', district: 'gorkha', city: 'gorkha', type: 'clinics' },
    { path: 'data/provinces/gandaki/gorkha/gorkha_pharmacies.json', province: 'gandaki', district: 'gorkha', city: 'gorkha', type: 'pharmacies' },
    { path: 'data/provinces/gandaki/gorkha/gorkha_schools.json', province: 'gandaki', district: 'gorkha', city: 'gorkha', type: 'schools' },
    { path: 'data/provinces/gandaki/gorkha/gorkha_colleges.json', province: 'gandaki', district: 'gorkha', city: 'gorkha', type: 'colleges' },
    { path: 'data/provinces/gandaki/gorkha/gorkha_blood_banks.json', province: 'gandaki', district: 'gorkha', city: 'gorkha', type: 'blood_banks' },
    { path: 'data/provinces/gandaki/gorkha/gorkha_ambulance.json', province: 'gandaki', district: 'gorkha', city: 'gorkha', type: 'ambulance' },
    { path: 'data/provinces/gandaki/gorkha/gorkha_emergency.json', province: 'gandaki', district: 'gorkha', city: 'gorkha', type: 'emergency' },
    { path: 'data/provinces/gandaki/gorkha/gorkha_veterinary.json', province: 'gandaki', district: 'gorkha', city: 'gorkha', type: 'veterinary' },
    { path: 'data/provinces/gandaki/gorkha/gorkha_government.json', province: 'gandaki', district: 'gorkha', city: 'gorkha', type: 'government' },
    
    // Besisahar (Lamjung)
    { path: 'data/provinces/gandaki/lamjung/besisahar.json', province: 'gandaki', district: 'lamjung', city: 'besisahar', type: 'hospitals' },
    { path: 'data/provinces/gandaki/lamjung/besisahar_clinics.json', province: 'gandaki', district: 'lamjung', city: 'besisahar', type: 'clinics' },
    { path: 'data/provinces/gandaki/lamjung/besisahar_pharmacies.json', province: 'gandaki', district: 'lamjung', city: 'besisahar', type: 'pharmacies' },
    { path: 'data/provinces/gandaki/lamjung/besisahar_schools.json', province: 'gandaki', district: 'lamjung', city: 'besisahar', type: 'schools' },
    { path: 'data/provinces/gandaki/lamjung/besisahar_colleges.json', province: 'gandaki', district: 'lamjung', city: 'besisahar', type: 'colleges' },
    { path: 'data/provinces/gandaki/lamjung/besisahar_blood_banks.json', province: 'gandaki', district: 'lamjung', city: 'besisahar', type: 'blood_banks' },
    { path: 'data/provinces/gandaki/lamjung/besisahar_ambulance.json', province: 'gandaki', district: 'lamjung', city: 'besisahar', type: 'ambulance' },
    { path: 'data/provinces/gandaki/lamjung/besisahar_emergency.json', province: 'gandaki', district: 'lamjung', city: 'besisahar', type: 'emergency' },
    { path: 'data/provinces/gandaki/lamjung/besisahar_veterinary.json', province: 'gandaki', district: 'lamjung', city: 'besisahar', type: 'veterinary' },
    { path: 'data/provinces/gandaki/lamjung/besisahar_government.json', province: 'gandaki', district: 'lamjung', city: 'besisahar', type: 'government' },
    
    // Damauli (Tanahun)
    { path: 'data/provinces/gandaki/tanahun/damauli.json', province: 'gandaki', district: 'tanahun', city: 'damauli', type: 'hospitals' },
    { path: 'data/provinces/gandaki/tanahun/damauli_clinics.json', province: 'gandaki', district: 'tanahun', city: 'damauli', type: 'clinics' },
    { path: 'data/provinces/gandaki/tanahun/damauli_pharmacies.json', province: 'gandaki', district: 'tanahun', city: 'damauli', type: 'pharmacies' },
    { path: 'data/provinces/gandaki/tanahun/damauli_schools.json', province: 'gandaki', district: 'tanahun', city: 'damauli', type: 'schools' },
    { path: 'data/provinces/gandaki/tanahun/damauli_colleges.json', province: 'gandaki', district: 'tanahun', city: 'damauli', type: 'colleges' },
    { path: 'data/provinces/gandaki/tanahun/damauli_blood_banks.json', province: 'gandaki', district: 'tanahun', city: 'damauli', type: 'blood_banks' },
    { path: 'data/provinces/gandaki/tanahun/damauli_ambulance.json', province: 'gandaki', district: 'tanahun', city: 'damauli', type: 'ambulance' },
    { path: 'data/provinces/gandaki/tanahun/damauli_emergency.json', province: 'gandaki', district: 'tanahun', city: 'damauli', type: 'emergency' },
    { path: 'data/provinces/gandaki/tanahun/damauli_veterinary.json', province: 'gandaki', district: 'tanahun', city: 'damauli', type: 'veterinary' },
    { path: 'data/provinces/gandaki/tanahun/damauli_government.json', province: 'gandaki', district: 'tanahun', city: 'damauli', type: 'government' },
    
    // Syangja
    { path: 'data/provinces/gandaki/syangja/syangja.json', province: 'gandaki', district: 'syangja', city: 'syangja', type: 'hospitals' },
    { path: 'data/provinces/gandaki/syangja/syangja_clinics.json', province: 'gandaki', district: 'syangja', city: 'syangja', type: 'clinics' },
    { path: 'data/provinces/gandaki/syangja/syangja_pharmacies.json', province: 'gandaki', district: 'syangja', city: 'syangja', type: 'pharmacies' },
    { path: 'data/provinces/gandaki/syangja/syangja_schools.json', province: 'gandaki', district: 'syangja', city: 'syangja', type: 'schools' },
    { path: 'data/provinces/gandaki/syangja/syangja_colleges.json', province: 'gandaki', district: 'syangja', city: 'syangja', type: 'colleges' },
    { path: 'data/provinces/gandaki/syangja/syangja_blood_banks.json', province: 'gandaki', district: 'syangja', city: 'syangja', type: 'blood_banks' },
    { path: 'data/provinces/gandaki/syangja/syangja_ambulance.json', province: 'gandaki', district: 'syangja', city: 'syangja', type: 'ambulance' },
    { path: 'data/provinces/gandaki/syangja/syangja_emergency.json', province: 'gandaki', district: 'syangja', city: 'syangja', type: 'emergency' },
    { path: 'data/provinces/gandaki/syangja/syangja_veterinary.json', province: 'gandaki', district: 'syangja', city: 'syangja', type: 'veterinary' },
    { path: 'data/provinces/gandaki/syangja/syangja_government.json', province: 'gandaki', district: 'syangja', city: 'syangja', type: 'government' },
    
    // Tansen (Palpa)
    { path: 'data/provinces/gandaki/palpa/tansen.json', province: 'gandaki', district: 'palpa', city: 'tansen', type: 'hospitals' },
    { path: 'data/provinces/gandaki/palpa/tansen_clinics.json', province: 'gandaki', district: 'palpa', city: 'tansen', type: 'clinics' },
    { path: 'data/provinces/gandaki/palpa/tansen_pharmacies.json', province: 'gandaki', district: 'palpa', city: 'tansen', type: 'pharmacies' },
    { path: 'data/provinces/gandaki/palpa/tansen_schools.json', province: 'gandaki', district: 'palpa', city: 'tansen', type: 'schools' },
    { path: 'data/provinces/gandaki/palpa/tansen_colleges.json', province: 'gandaki', district: 'palpa', city: 'tansen', type: 'colleges' },
    { path: 'data/provinces/gandaki/palpa/tansen_blood_banks.json', province: 'gandaki', district: 'palpa', city: 'tansen', type: 'blood_banks' },
    { path: 'data/provinces/gandaki/palpa/tansen_ambulance.json', province: 'gandaki', district: 'palpa', city: 'tansen', type: 'ambulance' },
    { path: 'data/provinces/gandaki/palpa/tansen_emergency.json', province: 'gandaki', district: 'palpa', city: 'tansen', type: 'emergency' },
    { path: 'data/provinces/gandaki/palpa/tansen_veterinary.json', province: 'gandaki', district: 'palpa', city: 'tansen', type: 'veterinary' },
    { path: 'data/provinces/gandaki/palpa/tansen_government.json', province: 'gandaki', district: 'palpa', city: 'tansen', type: 'government' },
    
    // Kaski Secondary City - Lekhnath
    { path: 'data/provinces/gandaki/kaski/lekhnath/lekhnath_hospitals.json', province: 'gandaki', district: 'kaski', city: 'lekhnath', type: 'hospitals' },
    { path: 'data/provinces/gandaki/kaski/lekhnath/lekhnath_colleges.json', province: 'gandaki', district: 'kaski', city: 'lekhnath', type: 'colleges' },
    { path: 'data/provinces/gandaki/kaski/lekhnath/lekhnath_schools.json', province: 'gandaki', district: 'kaski', city: 'lekhnath', type: 'schools' },
    { path: 'data/provinces/gandaki/kaski/lekhnath/lekhnath_clinics.json', province: 'gandaki', district: 'kaski', city: 'lekhnath', type: 'clinics' },
    { path: 'data/provinces/gandaki/kaski/lekhnath/lekhnath_pharmacies.json', province: 'gandaki', district: 'kaski', city: 'lekhnath', type: 'pharmacies' },
    { path: 'data/provinces/gandaki/kaski/lekhnath/lekhnath_ambulance.json', province: 'gandaki', district: 'kaski', city: 'lekhnath', type: 'ambulance' },
    { path: 'data/provinces/gandaki/kaski/lekhnath/lekhnath_blood_banks.json', province: 'gandaki', district: 'kaski', city: 'lekhnath', type: 'blood_banks' },
    { path: 'data/provinces/gandaki/kaski/lekhnath/lekhnath_emergency.json', province: 'gandaki', district: 'kaski', city: 'lekhnath', type: 'emergency' },
    { path: 'data/provinces/gandaki/kaski/lekhnath/lekhnath_government.json', province: 'gandaki', district: 'kaski', city: 'lekhnath', type: 'government' },
    { path: 'data/provinces/gandaki/kaski/lekhnath/lekhnath_veterinary.json', province: 'gandaki', district: 'kaski', city: 'lekhnath', type: 'veterinary' },
];

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
    
    // Kawasoti (Nawalpur)
    { path: 'data/provinces/gandaki/nawalpur/kawasoti.json', province: 'gandaki', district: 'nawalpur', city: 'kawasoti', type: 'hospitals' },
    { path: 'data/provinces/gandaki/nawalpur/kawasoti_clinics.json', province: 'gandaki', district: 'nawalpur', city: 'kawasoti', type: 'clinics' },
    { path: 'data/provinces/gandaki/nawalpur/kawasoti_pharmacies.json', province: 'gandaki', district: 'nawalpur', city: 'kawasoti', type: 'pharmacies' },
    { path: 'data/provinces/gandaki/nawalpur/kawasoti_schools.json', province: 'gandaki', district: 'nawalpur', city: 'kawasoti', type: 'schools' },
    { path: 'data/provinces/gandaki/nawalpur/kawasoti_colleges.json', province: 'gandaki', district: 'nawalpur', city: 'kawasoti', type: 'colleges' },
    { path: 'data/provinces/gandaki/nawalpur/kawasoti_blood_banks.json', province: 'gandaki', district: 'nawalpur', city: 'kawasoti', type: 'blood_banks' },
    { path: 'data/provinces/gandaki/nawalpur/kawasoti_ambulance.json', province: 'gandaki', district: 'nawalpur', city: 'kawasoti', type: 'ambulance' },
    { path: 'data/provinces/gandaki/nawalpur/kawasoti_emergency.json', province: 'gandaki', district: 'nawalpur', city: 'kawasoti', type: 'emergency' },
    { path: 'data/provinces/gandaki/nawalpur/kawasoti_veterinary.json', province: 'gandaki', district: 'nawalpur', city: 'kawasoti', type: 'veterinary' },
    { path: 'data/provinces/gandaki/nawalpur/kawasoti_government.json', province: 'gandaki', district: 'nawalpur', city: 'kawasoti', type: 'government' },
    
    // Baglung
    { path: 'data/provinces/gandaki/baglung/baglung.json', province: 'gandaki', district: 'baglung', city: 'baglung', type: 'hospitals' },
    { path: 'data/provinces/gandaki/baglung/baglung_clinics.json', province: 'gandaki', district: 'baglung', city: 'baglung', type: 'clinics' },
    { path: 'data/provinces/gandaki/baglung/baglung_pharmacies.json', province: 'gandaki', district: 'baglung', city: 'baglung', type: 'pharmacies' },
    { path: 'data/provinces/gandaki/baglung/baglung_schools.json', province: 'gandaki', district: 'baglung', city: 'baglung', type: 'schools' },
    { path: 'data/provinces/gandaki/baglung/baglung_colleges.json', province: 'gandaki', district: 'baglung', city: 'baglung', type: 'colleges' },
    { path: 'data/provinces/gandaki/baglung/baglung_blood_banks.json', province: 'gandaki', district: 'baglung', city: 'baglung', type: 'blood_banks' },
    { path: 'data/provinces/gandaki/baglung/baglung_ambulance.json', province: 'gandaki', district: 'baglung', city: 'baglung', type: 'ambulance' },
    { path: 'data/provinces/gandaki/baglung/baglung_emergency.json', province: 'gandaki', district: 'baglung', city: 'baglung', type: 'emergency' },
    { path: 'data/provinces/gandaki/baglung/baglung_veterinary.json', province: 'gandaki', district: 'baglung', city: 'baglung', type: 'veterinary' },
    { path: 'data/provinces/gandaki/baglung/baglung_government.json', province: 'gandaki', district: 'baglung', city: 'baglung', type: 'government' },
    
    // Beni (Myagdi)
    { path: 'data/provinces/gandaki/myagdi/beni.json', province: 'gandaki', district: 'myagdi', city: 'beni', type: 'hospitals' },
    { path: 'data/provinces/gandaki/myagdi/beni_clinics.json', province: 'gandaki', district: 'myagdi', city: 'beni', type: 'clinics' },
    { path: 'data/provinces/gandaki/myagdi/beni_pharmacies.json', province: 'gandaki', district: 'myagdi', city: 'beni', type: 'pharmacies' },
    { path: 'data/provinces/gandaki/myagdi/beni_schools.json', province: 'gandaki', district: 'myagdi', city: 'beni', type: 'schools' },
    { path: 'data/provinces/gandaki/myagdi/beni_colleges.json', province: 'gandaki', district: 'myagdi', city: 'beni', type: 'colleges' },
    { path: 'data/provinces/gandaki/myagdi/beni_blood_banks.json', province: 'gandaki', district: 'myagdi', city: 'beni', type: 'blood_banks' },
    { path: 'data/provinces/gandaki/myagdi/beni_ambulance.json', province: 'gandaki', district: 'myagdi', city: 'beni', type: 'ambulance' },
    { path: 'data/provinces/gandaki/myagdi/beni_emergency.json', province: 'gandaki', district: 'myagdi', city: 'beni', type: 'emergency' },
    { path: 'data/provinces/gandaki/myagdi/beni_veterinary.json', province: 'gandaki', district: 'myagdi', city: 'beni', type: 'veterinary' },
    { path: 'data/provinces/gandaki/myagdi/beni_government.json', province: 'gandaki', district: 'myagdi', city: 'beni', type: 'government' },
    
    // Kusma (Parbat)
    { path: 'data/provinces/gandaki/parbat/kusma.json', province: 'gandaki', district: 'parbat', city: 'kusma', type: 'hospitals' },
    { path: 'data/provinces/gandaki/parbat/kusma_clinics.json', province: 'gandaki', district: 'parbat', city: 'kusma', type: 'clinics' },
    { path: 'data/provinces/gandaki/parbat/kusma_pharmacies.json', province: 'gandaki', district: 'parbat', city: 'kusma', type: 'pharmacies' },
    { path: 'data/provinces/gandaki/parbat/kusma_schools.json', province: 'gandaki', district: 'parbat', city: 'kusma', type: 'schools' },
    { path: 'data/provinces/gandaki/parbat/kusma_colleges.json', province: 'gandaki', district: 'parbat', city: 'kusma', type: 'colleges' },
    { path: 'data/provinces/gandaki/parbat/kusma_blood_banks.json', province: 'gandaki', district: 'parbat', city: 'kusma', type: 'blood_banks' },
    { path: 'data/provinces/gandaki/parbat/kusma_ambulance.json', province: 'gandaki', district: 'parbat', city: 'kusma', type: 'ambulance' },
    { path: 'data/provinces/gandaki/parbat/kusma_emergency.json', province: 'gandaki', district: 'parbat', city: 'kusma', type: 'emergency' },
    { path: 'data/provinces/gandaki/parbat/kusma_veterinary.json', province: 'gandaki', district: 'parbat', city: 'kusma', type: 'veterinary' },
    { path: 'data/provinces/gandaki/parbat/kusma_government.json', province: 'gandaki', district: 'parbat', city: 'kusma', type: 'government' },
    
    // Jomsom (Mustang)
    { path: 'data/provinces/gandaki/mustang/jomsom.json', province: 'gandaki', district: 'mustang', city: 'jomsom', type: 'hospitals' },
    { path: 'data/provinces/gandaki/mustang/jomsom_clinics.json', province: 'gandaki', district: 'mustang', city: 'jomsom', type: 'clinics' },
    { path: 'data/provinces/gandaki/mustang/jomsom_pharmacies.json', province: 'gandaki', district: 'mustang', city: 'jomsom', type: 'pharmacies' },
    { path: 'data/provinces/gandaki/mustang/jomsom_schools.json', province: 'gandaki', district: 'mustang', city: 'jomsom', type: 'schools' },
    { path: 'data/provinces/gandaki/mustang/jomsom_colleges.json', province: 'gandaki', district: 'mustang', city: 'jomsom', type: 'colleges' },
    { path: 'data/provinces/gandaki/mustang/jomsom_blood_banks.json', province: 'gandaki', district: 'mustang', city: 'jomsom', type: 'blood_banks' },
    { path: 'data/provinces/gandaki/mustang/jomsom_ambulance.json', province: 'gandaki', district: 'mustang', city: 'jomsom', type: 'ambulance' },
    { path: 'data/provinces/gandaki/mustang/jomsom_emergency.json', province: 'gandaki', district: 'mustang', city: 'jomsom', type: 'emergency' },
    { path: 'data/provinces/gandaki/mustang/jomsom_veterinary.json', province: 'gandaki', district: 'mustang', city: 'jomsom', type: 'veterinary' },
    { path: 'data/provinces/gandaki/mustang/jomsom_government.json', province: 'gandaki', district: 'mustang', city: 'jomsom', type: 'government' }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GANDAKI_MANIFEST;
}

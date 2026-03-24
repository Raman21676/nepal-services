// Nepal Services Directory - Scalable Architecture for 77 Districts
// Auto-discovers data from province/district folder structure

class NepalServicesApp {
    constructor() {
        this.allData = [];
        this.filteredData = [];
        this.availableCities = new Set();
        this.availableDistricts = new Set();
        this.availableProvinces = new Set();
        this.availableCategories = new Set();
        
        // Pagination settings
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.totalPages = 1;
        
        // Data manifest - auto-generated from folder structure
        // Format: province/district/city_name_file_type.json
        this.dataManifest = [
            // Bagmati Province - Kathmandu
            { path: 'data/provinces/bagmati/kathmandu/kathmandu_hospitals.json', province: 'bagmati', district: 'kathmandu', city: 'kathmandu', type: 'hospitals' },
            { path: 'data/provinces/bagmati/kathmandu/kathmandu_schools.json', province: 'bagmati', district: 'kathmandu', city: 'kathmandu', type: 'schools' },
            { path: 'data/provinces/bagmati/kathmandu/kathmandu_colleges.json', province: 'bagmati', district: 'kathmandu', city: 'kathmandu', type: 'colleges' },
            { path: 'data/provinces/bagmati/kathmandu/kathmandu_clinics.json', province: 'bagmati', district: 'kathmandu', city: 'kathmandu', type: 'clinics' },
            { path: 'data/provinces/bagmati/kathmandu/kathmandu_blood_banks.json', province: 'bagmati', district: 'kathmandu', city: 'kathmandu', type: 'blood_banks' },
            { path: 'data/provinces/bagmati/kathmandu/kathmandu_pharmacies.json', province: 'bagmati', district: 'kathmandu', city: 'kathmandu', type: 'pharmacies' },
            { path: 'data/provinces/bagmati/kathmandu/kathmandu_veterinary.json', province: 'bagmati', district: 'kathmandu', city: 'kathmandu', type: 'veterinary' },
            { path: 'data/provinces/bagmati/kathmandu/kathmandu_ambulance_services.json', province: 'bagmati', district: 'kathmandu', city: 'kathmandu', type: 'ambulance' },
            { path: 'data/provinces/bagmati/kathmandu/kathmandu_ward_offices.json', province: 'bagmati', district: 'kathmandu', city: 'kathmandu', type: 'ward' },
            
            // Bagmati Province - Lalitpur
            { path: 'data/provinces/bagmati/lalitpur/lalitpur_hospitals.json', province: 'bagmati', district: 'lalitpur', city: 'lalitpur', type: 'hospitals' },
            { path: 'data/provinces/bagmati/lalitpur/lalitpur_schools.json', province: 'bagmati', district: 'lalitpur', city: 'lalitpur', type: 'schools' },
            { path: 'data/provinces/bagmati/lalitpur/lalitpur_colleges.json', province: 'bagmati', district: 'lalitpur', city: 'lalitpur', type: 'colleges' },
            { path: 'data/provinces/bagmati/lalitpur/lalitpur_clinics.json', province: 'bagmati', district: 'lalitpur', city: 'lalitpur', type: 'clinics' },
            { path: 'data/provinces/bagmati/lalitpur/lalitpur_pharmacies.json', province: 'bagmati', district: 'lalitpur', city: 'lalitpur', type: 'pharmacies' },
            { path: 'data/provinces/bagmati/lalitpur/lalitpur_veterinary.json', province: 'bagmati', district: 'lalitpur', city: 'lalitpur', type: 'veterinary' },
            { path: 'data/provinces/bagmati/lalitpur/lalitpur_blood_banks.json', province: 'bagmati', district: 'lalitpur', city: 'lalitpur', type: 'blood_banks' },
            { path: 'data/provinces/bagmati/lalitpur/lalitpur_ambulance_services.json', province: 'bagmati', district: 'lalitpur', city: 'lalitpur', type: 'ambulance' },
            { path: 'data/provinces/bagmati/lalitpur/lalitpur_emergency_contacts.json', province: 'bagmati', district: 'lalitpur', city: 'lalitpur', type: 'emergency' },
            { path: 'data/provinces/bagmati/lalitpur/lalitpur_ward_offices.json', province: 'bagmati', district: 'lalitpur', city: 'lalitpur', type: 'ward' },
            
            // Bagmati Province - Bhaktapur
            { path: 'data/provinces/bagmati/bhaktapur/bhaktapur.json', province: 'bagmati', district: 'bhaktapur', city: 'bhaktapur', type: 'hospitals' },
            { path: 'data/provinces/bagmati/bhaktapur/bhaktapur_schools.json', province: 'bagmati', district: 'bhaktapur', city: 'bhaktapur', type: 'schools' },
            { path: 'data/provinces/bagmati/bhaktapur/bhaktapur_colleges.json', province: 'bagmati', district: 'bhaktapur', city: 'bhaktapur', type: 'colleges' },
            { path: 'data/provinces/bagmati/bhaktapur/bhaktapur_clinics.json', province: 'bagmati', district: 'bhaktapur', city: 'bhaktapur', type: 'clinics' },
            { path: 'data/provinces/bagmati/bhaktapur/bhaktapur_pharmacies.json', province: 'bagmati', district: 'bhaktapur', city: 'bhaktapur', type: 'pharmacies' },
            { path: 'data/provinces/bagmati/bhaktapur/bhaktapur_veterinary.json', province: 'bagmati', district: 'bhaktapur', city: 'bhaktapur', type: 'veterinary' },
            { path: 'data/provinces/bagmati/bhaktapur/bhaktapur_blood_banks.json', province: 'bagmati', district: 'bhaktapur', city: 'bhaktapur', type: 'blood_banks' },
            { path: 'data/provinces/bagmati/bhaktapur/bhaktapur_ambulance_services.json', province: 'bagmati', district: 'bhaktapur', city: 'bhaktapur', type: 'ambulance' },
            { path: 'data/provinces/bagmati/bhaktapur/bhaktapur_emergency_contacts.json', province: 'bagmati', district: 'bhaktapur', city: 'bhaktapur', type: 'emergency' },
            { path: 'data/provinces/bagmati/bhaktapur/bhaktapur_ward_offices.json', province: 'bagmati', district: 'bhaktapur', city: 'bhaktapur', type: 'ward' },
            
            // Bagmati Province - Bharatpur (Chitwan)
            { path: 'data/provinces/bagmati/chitwan/bharatpur.json', province: 'bagmati', district: 'chitwan', city: 'bharatpur', type: 'hospitals' },
            { path: 'data/provinces/bagmati/chitwan/bharatpur_schools.json', province: 'bagmati', district: 'chitwan', city: 'bharatpur', type: 'schools' },
            { path: 'data/provinces/bagmati/chitwan/bharatpur_colleges.json', province: 'bagmati', district: 'chitwan', city: 'bharatpur', type: 'colleges' },
            { path: 'data/provinces/bagmati/chitwan/bharatpur_clinics.json', province: 'bagmati', district: 'chitwan', city: 'bharatpur', type: 'clinics' },
            { path: 'data/provinces/bagmati/chitwan/bharatpur_pharmacies.json', province: 'bagmati', district: 'chitwan', city: 'bharatpur', type: 'pharmacies' },
            { path: 'data/provinces/bagmati/chitwan/bharatpur_veterinary.json', province: 'bagmati', district: 'chitwan', city: 'bharatpur', type: 'veterinary' },
            { path: 'data/provinces/bagmati/chitwan/bharatpur_blood_banks.json', province: 'bagmati', district: 'chitwan', city: 'bharatpur', type: 'blood_banks' },
            { path: 'data/provinces/bagmati/chitwan/bharatpur_ambulance_services.json', province: 'bagmati', district: 'chitwan', city: 'bharatpur', type: 'ambulance' },
            { path: 'data/provinces/bagmati/chitwan/bharatpur_ward_offices.json', province: 'bagmati', district: 'chitwan', city: 'bharatpur', type: 'ward' },
            { path: 'data/provinces/bagmati/chitwan/bharatpur_emergency_contacts.json', province: 'bagmati', district: 'chitwan', city: 'bharatpur', type: 'emergency' },
            
            // Bagmati Province - Hetauda (Makwanpur)
            { path: 'data/provinces/bagmati/makwanpur/hetauda.json', province: 'bagmati', district: 'makwanpur', city: 'hetauda', type: 'hospitals' },
            { path: 'data/provinces/bagmati/makwanpur/hetauda_schools.json', province: 'bagmati', district: 'makwanpur', city: 'hetauda', type: 'schools' },
            
            // Bagmati Province - Government Offices (Kathmandu Valley)
            { path: 'data/provinces/bagmati/kathmandu/kathmandu_government.json', province: 'bagmati', district: 'kathmandu', city: 'kathmandu', type: 'government' },
            { path: 'data/provinces/bagmati/lalitpur/lalitpur_government.json', province: 'bagmati', district: 'lalitpur', city: 'lalitpur', type: 'government' },
            { path: 'data/provinces/bagmati/bhaktapur/bhaktapur_government.json', province: 'bagmati', district: 'bhaktapur', city: 'bhaktapur', type: 'government' },
            { path: 'data/provinces/bagmati/chitwan/bharatpur_government.json', province: 'bagmati', district: 'chitwan', city: 'bharatpur', type: 'government' },
            { path: 'data/provinces/bagmati/makwanpur/hetauda_government.json', province: 'bagmati', district: 'makwanpur', city: 'hetauda', type: 'government' },
            
            // Bagmati Province - Other Districts
            { path: 'data/provinces/bagmati/dhading/dhadingbesi.json', province: 'bagmati', district: 'dhading', city: 'dhadingbesi', type: 'hospitals' },
            { path: 'data/provinces/bagmati/dhading/dhadingbesi_government.json', province: 'bagmati', district: 'dhading', city: 'dhadingbesi', type: 'government' },
            { path: 'data/provinces/bagmati/kavrepalanchok/dhulikhel.json', province: 'bagmati', district: 'kavrepalanchok', city: 'dhulikhel', type: 'hospitals' },
            { path: 'data/provinces/bagmati/kavrepalanchok/dhulikhel_government.json', province: 'bagmati', district: 'kavrepalanchok', city: 'dhulikhel', type: 'government' },
            { path: 'data/provinces/bagmati/dolakha/charikot.json', province: 'bagmati', district: 'dolakha', city: 'charikot', type: 'hospitals' },
            { path: 'data/provinces/bagmati/dolakha/charikot_government.json', province: 'bagmati', district: 'dolakha', city: 'charikot', type: 'government' },
            { path: 'data/provinces/bagmati/nuwakot/bidur.json', province: 'bagmati', district: 'nuwakot', city: 'bidur', type: 'hospitals' },
            { path: 'data/provinces/bagmati/nuwakot/bidur_government.json', province: 'bagmati', district: 'nuwakot', city: 'bidur', type: 'government' },
            { path: 'data/provinces/bagmati/ramechhap/manthali.json', province: 'bagmati', district: 'ramechhap', city: 'manthali', type: 'hospitals' },
            { path: 'data/provinces/bagmati/ramechhap/manthali_government.json', province: 'bagmati', district: 'ramechhap', city: 'manthali', type: 'government' },
            { path: 'data/provinces/bagmati/rasuwa/dhunche.json', province: 'bagmati', district: 'rasuwa', city: 'dhunche', type: 'hospitals' },
            { path: 'data/provinces/bagmati/rasuwa/dhunche_government.json', province: 'bagmati', district: 'rasuwa', city: 'dhunche', type: 'government' },
            { path: 'data/provinces/bagmati/sindhuli/sindhulimadi.json', province: 'bagmati', district: 'sindhuli', city: 'sindhulimadi', type: 'hospitals' },
            { path: 'data/provinces/bagmati/sindhuli/sindhulimadi_government.json', province: 'bagmati', district: 'sindhuli', city: 'sindhulimadi', type: 'government' },
            { path: 'data/provinces/bagmati/sindhupalchok/chautara.json', province: 'bagmati', district: 'sindhupalchok', city: 'chautara', type: 'hospitals' },
            { path: 'data/provinces/bagmati/sindhupalchok/chautara_government.json', province: 'bagmati', district: 'sindhupalchok', city: 'chautara', type: 'government' },
            
            // Koshi Province - Major Cities
            { path: 'data/provinces/koshi/morang/biratnagar.json', province: 'koshi', district: 'morang', city: 'biratnagar', type: 'hospitals' },
            { path: 'data/provinces/koshi/morang/biratnagar_clinics.json', province: 'koshi', district: 'morang', city: 'biratnagar', type: 'clinics' },
            { path: 'data/provinces/koshi/morang/biratnagar_pharmacies.json', province: 'koshi', district: 'morang', city: 'biratnagar', type: 'pharmacies' },
            { path: 'data/provinces/koshi/morang/biratnagar_schools.json', province: 'koshi', district: 'morang', city: 'biratnagar', type: 'schools' },
            { path: 'data/provinces/koshi/morang/biratnagar_colleges.json', province: 'koshi', district: 'morang', city: 'biratnagar', type: 'colleges' },
            { path: 'data/provinces/koshi/morang/biratnagar_blood_banks.json', province: 'koshi', district: 'morang', city: 'biratnagar', type: 'blood_banks' },
            { path: 'data/provinces/koshi/morang/biratnagar_ambulance.json', province: 'koshi', district: 'morang', city: 'biratnagar', type: 'ambulance' },
            { path: 'data/provinces/koshi/morang/biratnagar_emergency.json', province: 'koshi', district: 'morang', city: 'biratnagar', type: 'emergency' },
            { path: 'data/provinces/koshi/morang/biratnagar_veterinary.json', province: 'koshi', district: 'morang', city: 'biratnagar', type: 'veterinary' },
            { path: 'data/provinces/koshi/morang/biratnagar_ward.json', province: 'koshi', district: 'morang', city: 'biratnagar', type: 'ward' },
            { path: 'data/provinces/koshi/morang/biratnagar_government.json', province: 'koshi', district: 'morang', city: 'biratnagar', type: 'government' },
            { path: 'data/provinces/koshi/sunsari/dharan.json', province: 'koshi', district: 'sunsari', city: 'dharan', type: 'hospitals' },
            { path: 'data/provinces/koshi/sunsari/dharan_government.json', province: 'koshi', district: 'sunsari', city: 'dharan', type: 'government' },
            { path: 'data/provinces/koshi/sunsari/dharan_clinics.json', province: 'koshi', district: 'sunsari', city: 'dharan', type: 'clinics' },
            { path: 'data/provinces/koshi/sunsari/dharan_pharmacies.json', province: 'koshi', district: 'sunsari', city: 'dharan', type: 'pharmacies' },
            { path: 'data/provinces/koshi/sunsari/dharan_schools.json', province: 'koshi', district: 'sunsari', city: 'dharan', type: 'schools' },
            { path: 'data/provinces/koshi/sunsari/dharan_colleges.json', province: 'koshi', district: 'sunsari', city: 'dharan', type: 'colleges' },
            { path: 'data/provinces/koshi/sunsari/dharan_blood_banks.json', province: 'koshi', district: 'sunsari', city: 'dharan', type: 'blood_banks' },
            { path: 'data/provinces/koshi/sunsari/dharan_ambulance.json', province: 'koshi', district: 'sunsari', city: 'dharan', type: 'ambulance' },
            { path: 'data/provinces/koshi/sunsari/dharan_emergency.json', province: 'koshi', district: 'sunsari', city: 'dharan', type: 'emergency' },
            { path: 'data/provinces/koshi/sunsari/dharan_veterinary.json', province: 'koshi', district: 'sunsari', city: 'dharan', type: 'veterinary' },
            { path: 'data/provinces/koshi/sunsari/itahari.json', province: 'koshi', district: 'sunsari', city: 'itahari', type: 'hospitals' },
            { path: 'data/provinces/koshi/sunsari/itahari_government.json', province: 'koshi', district: 'sunsari', city: 'itahari', type: 'government' },
            { path: 'data/provinces/koshi/sunsari/itahari_clinics.json', province: 'koshi', district: 'sunsari', city: 'itahari', type: 'clinics' },
            { path: 'data/provinces/koshi/sunsari/itahari_pharmacies.json', province: 'koshi', district: 'sunsari', city: 'itahari', type: 'pharmacies' },
            { path: 'data/provinces/koshi/sunsari/itahari_schools.json', province: 'koshi', district: 'sunsari', city: 'itahari', type: 'schools' },
            { path: 'data/provinces/koshi/sunsari/itahari_colleges.json', province: 'koshi', district: 'sunsari', city: 'itahari', type: 'colleges' },
            { path: 'data/provinces/koshi/sunsari/itahari_blood_banks.json', province: 'koshi', district: 'sunsari', city: 'itahari', type: 'blood_banks' },
            { path: 'data/provinces/koshi/sunsari/itahari_ambulance.json', province: 'koshi', district: 'sunsari', city: 'itahari', type: 'ambulance' },
            { path: 'data/provinces/koshi/sunsari/itahari_emergency.json', province: 'koshi', district: 'sunsari', city: 'itahari', type: 'emergency' },
            { path: 'data/provinces/koshi/sunsari/itahari_veterinary.json', province: 'koshi', district: 'sunsari', city: 'itahari', type: 'veterinary' },
            { path: 'data/provinces/koshi/jhapa/birtamod.json', province: 'koshi', district: 'jhapa', city: 'birtamod', type: 'hospitals' },
            { path: 'data/provinces/koshi/jhapa/birtamod_government.json', province: 'koshi', district: 'jhapa', city: 'birtamod', type: 'government' },
            { path: 'data/provinces/koshi/jhapa/birtamod_clinics.json', province: 'koshi', district: 'jhapa', city: 'birtamod', type: 'clinics' },
            { path: 'data/provinces/koshi/jhapa/birtamod_pharmacies.json', province: 'koshi', district: 'jhapa', city: 'birtamod', type: 'pharmacies' },
            { path: 'data/provinces/koshi/jhapa/birtamod_schools.json', province: 'koshi', district: 'jhapa', city: 'birtamod', type: 'schools' },
            { path: 'data/provinces/koshi/jhapa/birtamod_colleges.json', province: 'koshi', district: 'jhapa', city: 'birtamod', type: 'colleges' },
            { path: 'data/provinces/koshi/jhapa/birtamod_blood_banks.json', province: 'koshi', district: 'jhapa', city: 'birtamod', type: 'blood_banks' },
            { path: 'data/provinces/koshi/jhapa/birtamod_ambulance.json', province: 'koshi', district: 'jhapa', city: 'birtamod', type: 'ambulance' },
            { path: 'data/provinces/koshi/jhapa/birtamod_emergency.json', province: 'koshi', district: 'jhapa', city: 'birtamod', type: 'emergency' },
            { path: 'data/provinces/koshi/jhapa/birtamod_veterinary.json', province: 'koshi', district: 'jhapa', city: 'birtamod', type: 'veterinary' },
            { path: 'data/provinces/koshi/jhapa/damak.json', province: 'koshi', district: 'jhapa', city: 'damak', type: 'hospitals' },
            { path: 'data/provinces/koshi/jhapa/damak_government.json', province: 'koshi', district: 'jhapa', city: 'damak', type: 'government' },
            { path: 'data/provinces/koshi/jhapa/damak_clinics.json', province: 'koshi', district: 'jhapa', city: 'damak', type: 'clinics' },
            { path: 'data/provinces/koshi/jhapa/damak_pharmacies.json', province: 'koshi', district: 'jhapa', city: 'damak', type: 'pharmacies' },
            { path: 'data/provinces/koshi/jhapa/damak_schools.json', province: 'koshi', district: 'jhapa', city: 'damak', type: 'schools' },
            { path: 'data/provinces/koshi/jhapa/damak_colleges.json', province: 'koshi', district: 'jhapa', city: 'damak', type: 'colleges' },
            { path: 'data/provinces/koshi/jhapa/damak_blood_banks.json', province: 'koshi', district: 'jhapa', city: 'damak', type: 'blood_banks' },
            { path: 'data/provinces/koshi/jhapa/damak_ambulance.json', province: 'koshi', district: 'jhapa', city: 'damak', type: 'ambulance' },
            { path: 'data/provinces/koshi/jhapa/damak_emergency.json', province: 'koshi', district: 'jhapa', city: 'damak', type: 'emergency' },
            { path: 'data/provinces/koshi/jhapa/damak_veterinary.json', province: 'koshi', district: 'jhapa', city: 'damak', type: 'veterinary' },
            { path: 'data/provinces/koshi/jhapa/bhadrapur.json', province: 'koshi', district: 'jhapa', city: 'bhadrapur', type: 'hospitals' },
            { path: 'data/provinces/koshi/jhapa/bhadrapur_government.json', province: 'koshi', district: 'jhapa', city: 'bhadrapur', type: 'government' },
            { path: 'data/provinces/koshi/jhapa/bhadrapur_clinics.json', province: 'koshi', district: 'jhapa', city: 'bhadrapur', type: 'clinics' },
            { path: 'data/provinces/koshi/jhapa/bhadrapur_pharmacies.json', province: 'koshi', district: 'jhapa', city: 'bhadrapur', type: 'pharmacies' },
            { path: 'data/provinces/koshi/jhapa/bhadrapur_schools.json', province: 'koshi', district: 'jhapa', city: 'bhadrapur', type: 'schools' },
            { path: 'data/provinces/koshi/jhapa/bhadrapur_colleges.json', province: 'koshi', district: 'jhapa', city: 'bhadrapur', type: 'colleges' },
            { path: 'data/provinces/koshi/jhapa/bhadrapur_blood_banks.json', province: 'koshi', district: 'jhapa', city: 'bhadrapur', type: 'blood_banks' },
            { path: 'data/provinces/koshi/jhapa/bhadrapur_ambulance.json', province: 'koshi', district: 'jhapa', city: 'bhadrapur', type: 'ambulance' },
            { path: 'data/provinces/koshi/jhapa/bhadrapur_emergency.json', province: 'koshi', district: 'jhapa', city: 'bhadrapur', type: 'emergency' },
            { path: 'data/provinces/koshi/jhapa/bhadrapur_veterinary.json', province: 'koshi', district: 'jhapa', city: 'bhadrapur', type: 'veterinary' },
            
            // Koshi Province - District Headquarters
            { path: 'data/provinces/koshi/ilam/ilam.json', province: 'koshi', district: 'ilam', city: 'ilam', type: 'hospitals' },
            { path: 'data/provinces/koshi/ilam/ilam_government.json', province: 'koshi', district: 'ilam', city: 'ilam', type: 'government' },
            { path: 'data/provinces/koshi/ilam/ilam_clinics.json', province: 'koshi', district: 'ilam', city: 'ilam', type: 'clinics' },
            { path: 'data/provinces/koshi/ilam/ilam_pharmacies.json', province: 'koshi', district: 'ilam', city: 'ilam', type: 'pharmacies' },
            { path: 'data/provinces/koshi/ilam/ilam_schools.json', province: 'koshi', district: 'ilam', city: 'ilam', type: 'schools' },
            { path: 'data/provinces/koshi/ilam/ilam_colleges.json', province: 'koshi', district: 'ilam', city: 'ilam', type: 'colleges' },
            { path: 'data/provinces/koshi/ilam/ilam_blood_banks.json', province: 'koshi', district: 'ilam', city: 'ilam', type: 'blood_banks' },
            { path: 'data/provinces/koshi/ilam/ilam_ambulance.json', province: 'koshi', district: 'ilam', city: 'ilam', type: 'ambulance' },
            { path: 'data/provinces/koshi/ilam/ilam_emergency.json', province: 'koshi', district: 'ilam', city: 'ilam', type: 'emergency' },
            { path: 'data/provinces/koshi/ilam/ilam_veterinary.json', province: 'koshi', district: 'ilam', city: 'ilam', type: 'veterinary' },
            { path: 'data/provinces/koshi/dhankuta/dhankuta.json', province: 'koshi', district: 'dhankuta', city: 'dhankuta', type: 'hospitals' },
            { path: 'data/provinces/koshi/dhankuta/dhankuta_government.json', province: 'koshi', district: 'dhankuta', city: 'dhankuta', type: 'government' },
            { path: 'data/provinces/koshi/dhankuta/dhankuta_clinics.json', province: 'koshi', district: 'dhankuta', city: 'dhankuta', type: 'clinics' },
            { path: 'data/provinces/koshi/dhankuta/dhankuta_pharmacies.json', province: 'koshi', district: 'dhankuta', city: 'dhankuta', type: 'pharmacies' },
            { path: 'data/provinces/koshi/dhankuta/dhankuta_schools.json', province: 'koshi', district: 'dhankuta', city: 'dhankuta', type: 'schools' },
            { path: 'data/provinces/koshi/dhankuta/dhankuta_colleges.json', province: 'koshi', district: 'dhankuta', city: 'dhankuta', type: 'colleges' },
            { path: 'data/provinces/koshi/dhankuta/dhankuta_blood_banks.json', province: 'koshi', district: 'dhankuta', city: 'dhankuta', type: 'blood_banks' },
            { path: 'data/provinces/koshi/dhankuta/dhankuta_ambulance.json', province: 'koshi', district: 'dhankuta', city: 'dhankuta', type: 'ambulance' },
            { path: 'data/provinces/koshi/dhankuta/dhankuta_emergency.json', province: 'koshi', district: 'dhankuta', city: 'dhankuta', type: 'emergency' },
            { path: 'data/provinces/koshi/dhankuta/dhankuta_veterinary.json', province: 'koshi', district: 'dhankuta', city: 'dhankuta', type: 'veterinary' },
            { path: 'data/provinces/koshi/bhojpur/bhojpur.json', province: 'koshi', district: 'bhojpur', city: 'bhojpur', type: 'hospitals' },
            { path: 'data/provinces/koshi/bhojpur/bhojpur_government.json', province: 'koshi', district: 'bhojpur', city: 'bhojpur', type: 'government' },
            { path: 'data/provinces/koshi/bhojpur/bhojpur_clinics.json', province: 'koshi', district: 'bhojpur', city: 'bhojpur', type: 'clinics' },
            { path: 'data/provinces/koshi/bhojpur/bhojpur_pharmacies.json', province: 'koshi', district: 'bhojpur', city: 'bhojpur', type: 'pharmacies' },
            { path: 'data/provinces/koshi/bhojpur/bhojpur_schools.json', province: 'koshi', district: 'bhojpur', city: 'bhojpur', type: 'schools' },
            { path: 'data/provinces/koshi/bhojpur/bhojpur_colleges.json', province: 'koshi', district: 'bhojpur', city: 'bhojpur', type: 'colleges' },
            { path: 'data/provinces/koshi/bhojpur/bhojpur_blood_banks.json', province: 'koshi', district: 'bhojpur', city: 'bhojpur', type: 'blood_banks' },
            { path: 'data/provinces/koshi/bhojpur/bhojpur_ambulance.json', province: 'koshi', district: 'bhojpur', city: 'bhojpur', type: 'ambulance' },
            { path: 'data/provinces/koshi/bhojpur/bhojpur_emergency.json', province: 'koshi', district: 'bhojpur', city: 'bhojpur', type: 'emergency' },
            { path: 'data/provinces/koshi/bhojpur/bhojpur_veterinary.json', province: 'koshi', district: 'bhojpur', city: 'bhojpur', type: 'veterinary' },
            { path: 'data/provinces/koshi/khotang/diktel.json', province: 'koshi', district: 'khotang', city: 'diktel', type: 'hospitals' },
            { path: 'data/provinces/koshi/khotang/diktel_government.json', province: 'koshi', district: 'khotang', city: 'diktel', type: 'government' },
            { path: 'data/provinces/koshi/khotang/diktel_clinics.json', province: 'koshi', district: 'khotang', city: 'diktel', type: 'clinics' },
            { path: 'data/provinces/koshi/khotang/diktel_pharmacies.json', province: 'koshi', district: 'khotang', city: 'diktel', type: 'pharmacies' },
            { path: 'data/provinces/koshi/khotang/diktel_schools.json', province: 'koshi', district: 'khotang', city: 'diktel', type: 'schools' },
            { path: 'data/provinces/koshi/khotang/diktel_colleges.json', province: 'koshi', district: 'khotang', city: 'diktel', type: 'colleges' },
            { path: 'data/provinces/koshi/khotang/diktel_blood_banks.json', province: 'koshi', district: 'khotang', city: 'diktel', type: 'blood_banks' },
            { path: 'data/provinces/koshi/khotang/diktel_ambulance.json', province: 'koshi', district: 'khotang', city: 'diktel', type: 'ambulance' },
            { path: 'data/provinces/koshi/khotang/diktel_emergency.json', province: 'koshi', district: 'khotang', city: 'diktel', type: 'emergency' },
            { path: 'data/provinces/koshi/khotang/diktel_veterinary.json', province: 'koshi', district: 'khotang', city: 'diktel', type: 'veterinary' },
            { path: 'data/provinces/koshi/okhaldhunga/okhaldhunga.json', province: 'koshi', district: 'okhaldhunga', city: 'okhaldhunga', type: 'hospitals' },
            { path: 'data/provinces/koshi/okhaldhunga/okhaldhunga_government.json', province: 'koshi', district: 'okhaldhunga', city: 'okhaldhunga', type: 'government' },
            { path: 'data/provinces/koshi/okhaldhunga/okhaldhunga_clinics.json', province: 'koshi', district: 'okhaldhunga', city: 'okhaldhunga', type: 'clinics' },
            { path: 'data/provinces/koshi/okhaldhunga/okhaldhunga_pharmacies.json', province: 'koshi', district: 'okhaldhunga', city: 'okhaldhunga', type: 'pharmacies' },
            { path: 'data/provinces/koshi/okhaldhunga/okhaldhunga_schools.json', province: 'koshi', district: 'okhaldhunga', city: 'okhaldhunga', type: 'schools' },
            { path: 'data/provinces/koshi/okhaldhunga/okhaldhunga_colleges.json', province: 'koshi', district: 'okhaldhunga', city: 'okhaldhunga', type: 'colleges' },
            { path: 'data/provinces/koshi/okhaldhunga/okhaldhunga_blood_banks.json', province: 'koshi', district: 'okhaldhunga', city: 'okhaldhunga', type: 'blood_banks' },
            { path: 'data/provinces/koshi/okhaldhunga/okhaldhunga_ambulance.json', province: 'koshi', district: 'okhaldhunga', city: 'okhaldhunga', type: 'ambulance' },
            { path: 'data/provinces/koshi/okhaldhunga/okhaldhunga_emergency.json', province: 'koshi', district: 'okhaldhunga', city: 'okhaldhunga', type: 'emergency' },
            { path: 'data/provinces/koshi/okhaldhunga/okhaldhunga_veterinary.json', province: 'koshi', district: 'okhaldhunga', city: 'okhaldhunga', type: 'veterinary' },
            { path: 'data/provinces/koshi/udayapur/gaighat.json', province: 'koshi', district: 'udayapur', city: 'gaighat', type: 'hospitals' },
            { path: 'data/provinces/koshi/udayapur/gaighat_government.json', province: 'koshi', district: 'udayapur', city: 'gaighat', type: 'government' },
            { path: 'data/provinces/koshi/udayapur/gaighat_clinics.json', province: 'koshi', district: 'udayapur', city: 'gaighat', type: 'clinics' },
            { path: 'data/provinces/koshi/udayapur/gaighat_pharmacies.json', province: 'koshi', district: 'udayapur', city: 'gaighat', type: 'pharmacies' },
            { path: 'data/provinces/koshi/udayapur/gaighat_schools.json', province: 'koshi', district: 'udayapur', city: 'gaighat', type: 'schools' },
            { path: 'data/provinces/koshi/udayapur/gaighat_colleges.json', province: 'koshi', district: 'udayapur', city: 'gaighat', type: 'colleges' },
            { path: 'data/provinces/koshi/udayapur/gaighat_blood_banks.json', province: 'koshi', district: 'udayapur', city: 'gaighat', type: 'blood_banks' },
            { path: 'data/provinces/koshi/udayapur/gaighat_ambulance.json', province: 'koshi', district: 'udayapur', city: 'gaighat', type: 'ambulance' },
            { path: 'data/provinces/koshi/udayapur/gaighat_emergency.json', province: 'koshi', district: 'udayapur', city: 'gaighat', type: 'emergency' },
            { path: 'data/provinces/koshi/udayapur/gaighat_veterinary.json', province: 'koshi', district: 'udayapur', city: 'gaighat', type: 'veterinary' },
            { path: 'data/provinces/koshi/sankhuwasabha/khandbari.json', province: 'koshi', district: 'sankhuwasabha', city: 'khandbari', type: 'hospitals' },
            { path: 'data/provinces/koshi/sankhuwasabha/khandbari_government.json', province: 'koshi', district: 'sankhuwasabha', city: 'khandbari', type: 'government' },
            { path: 'data/provinces/koshi/sankhuwasabha/khandbari_clinics.json', province: 'koshi', district: 'sankhuwasabha', city: 'khandbari', type: 'clinics' },
            { path: 'data/provinces/koshi/sankhuwasabha/khandbari_pharmacies.json', province: 'koshi', district: 'sankhuwasabha', city: 'khandbari', type: 'pharmacies' },
            { path: 'data/provinces/koshi/sankhuwasabha/khandbari_schools.json', province: 'koshi', district: 'sankhuwasabha', city: 'khandbari', type: 'schools' },
            { path: 'data/provinces/koshi/sankhuwasabha/khandbari_colleges.json', province: 'koshi', district: 'sankhuwasabha', city: 'khandbari', type: 'colleges' },
            { path: 'data/provinces/koshi/sankhuwasabha/khandbari_blood_banks.json', province: 'koshi', district: 'sankhuwasabha', city: 'khandbari', type: 'blood_banks' },
            { path: 'data/provinces/koshi/sankhuwasabha/khandbari_ambulance.json', province: 'koshi', district: 'sankhuwasabha', city: 'khandbari', type: 'ambulance' },
            { path: 'data/provinces/koshi/sankhuwasabha/khandbari_emergency.json', province: 'koshi', district: 'sankhuwasabha', city: 'khandbari', type: 'emergency' },
            { path: 'data/provinces/koshi/sankhuwasabha/khandbari_veterinary.json', province: 'koshi', district: 'sankhuwasabha', city: 'khandbari', type: 'veterinary' },
            { path: 'data/provinces/koshi/solukhumbu/salleri.json', province: 'koshi', district: 'solukhumbu', city: 'salleri', type: 'hospitals' },
            { path: 'data/provinces/koshi/solukhumbu/salleri_government.json', province: 'koshi', district: 'solukhumbu', city: 'salleri', type: 'government' },
            { path: 'data/provinces/koshi/solukhumbu/salleri_clinics.json', province: 'koshi', district: 'solukhumbu', city: 'salleri', type: 'clinics' },
            { path: 'data/provinces/koshi/solukhumbu/salleri_pharmacies.json', province: 'koshi', district: 'solukhumbu', city: 'salleri', type: 'pharmacies' },
            { path: 'data/provinces/koshi/solukhumbu/salleri_schools.json', province: 'koshi', district: 'solukhumbu', city: 'salleri', type: 'schools' },
            { path: 'data/provinces/koshi/solukhumbu/salleri_colleges.json', province: 'koshi', district: 'solukhumbu', city: 'salleri', type: 'colleges' },
            { path: 'data/provinces/koshi/solukhumbu/salleri_blood_banks.json', province: 'koshi', district: 'solukhumbu', city: 'salleri', type: 'blood_banks' },
            { path: 'data/provinces/koshi/solukhumbu/salleri_ambulance.json', province: 'koshi', district: 'solukhumbu', city: 'salleri', type: 'ambulance' },
            { path: 'data/provinces/koshi/solukhumbu/salleri_emergency.json', province: 'koshi', district: 'solukhumbu', city: 'salleri', type: 'emergency' },
            { path: 'data/provinces/koshi/solukhumbu/salleri_veterinary.json', province: 'koshi', district: 'solukhumbu', city: 'salleri', type: 'veterinary' },
            { path: 'data/provinces/koshi/terhathum/manglung.json', province: 'koshi', district: 'terhathum', city: 'manglung', type: 'hospitals' },
            { path: 'data/provinces/koshi/terhathum/manglung_government.json', province: 'koshi', district: 'terhathum', city: 'manglung', type: 'government' },
            { path: 'data/provinces/koshi/terhathum/manglung_clinics.json', province: 'koshi', district: 'terhathum', city: 'manglung', type: 'clinics' },
            { path: 'data/provinces/koshi/terhathum/manglung_pharmacies.json', province: 'koshi', district: 'terhathum', city: 'manglung', type: 'pharmacies' },
            { path: 'data/provinces/koshi/terhathum/manglung_schools.json', province: 'koshi', district: 'terhathum', city: 'manglung', type: 'schools' },
            { path: 'data/provinces/koshi/terhathum/manglung_colleges.json', province: 'koshi', district: 'terhathum', city: 'manglung', type: 'colleges' },
            { path: 'data/provinces/koshi/terhathum/manglung_blood_banks.json', province: 'koshi', district: 'terhathum', city: 'manglung', type: 'blood_banks' },
            { path: 'data/provinces/koshi/terhathum/manglung_ambulance.json', province: 'koshi', district: 'terhathum', city: 'manglung', type: 'ambulance' },
            { path: 'data/provinces/koshi/terhathum/manglung_emergency.json', province: 'koshi', district: 'terhathum', city: 'manglung', type: 'emergency' },
            { path: 'data/provinces/koshi/terhathum/manglung_veterinary.json', province: 'koshi', district: 'terhathum', city: 'manglung', type: 'veterinary' },
            { path: 'data/provinces/koshi/panchthar/phidim.json', province: 'koshi', district: 'panchthar', city: 'phidim', type: 'hospitals' },
            { path: 'data/provinces/koshi/panchthar/phidim_government.json', province: 'koshi', district: 'panchthar', city: 'phidim', type: 'government' },
            { path: 'data/provinces/koshi/panchthar/phidim_clinics.json', province: 'koshi', district: 'panchthar', city: 'phidim', type: 'clinics' },
            { path: 'data/provinces/koshi/panchthar/phidim_pharmacies.json', province: 'koshi', district: 'panchthar', city: 'phidim', type: 'pharmacies' },
            { path: 'data/provinces/koshi/panchthar/phidim_schools.json', province: 'koshi', district: 'panchthar', city: 'phidim', type: 'schools' },
            { path: 'data/provinces/koshi/panchthar/phidim_colleges.json', province: 'koshi', district: 'panchthar', city: 'phidim', type: 'colleges' },
            { path: 'data/provinces/koshi/panchthar/phidim_blood_banks.json', province: 'koshi', district: 'panchthar', city: 'phidim', type: 'blood_banks' },
            { path: 'data/provinces/koshi/panchthar/phidim_ambulance.json', province: 'koshi', district: 'panchthar', city: 'phidim', type: 'ambulance' },
            { path: 'data/provinces/koshi/panchthar/phidim_emergency.json', province: 'koshi', district: 'panchthar', city: 'phidim', type: 'emergency' },
            { path: 'data/provinces/koshi/panchthar/phidim_veterinary.json', province: 'koshi', district: 'panchthar', city: 'phidim', type: 'veterinary' },
            { path: 'data/provinces/koshi/taplejung/taplejung.json', province: 'koshi', district: 'taplejung', city: 'taplejung', type: 'hospitals' },
            { path: 'data/provinces/koshi/taplejung/taplejung_government.json', province: 'koshi', district: 'taplejung', city: 'taplejung', type: 'government' },
            { path: 'data/provinces/koshi/taplejung/taplejung_clinics.json', province: 'koshi', district: 'taplejung', city: 'taplejung', type: 'clinics' },
            { path: 'data/provinces/koshi/taplejung/taplejung_pharmacies.json', province: 'koshi', district: 'taplejung', city: 'taplejung', type: 'pharmacies' },
            { path: 'data/provinces/koshi/taplejung/taplejung_schools.json', province: 'koshi', district: 'taplejung', city: 'taplejung', type: 'schools' },
            { path: 'data/provinces/koshi/taplejung/taplejung_colleges.json', province: 'koshi', district: 'taplejung', city: 'taplejung', type: 'colleges' },
            { path: 'data/provinces/koshi/taplejung/taplejung_blood_banks.json', province: 'koshi', district: 'taplejung', city: 'taplejung', type: 'blood_banks' },
            { path: 'data/provinces/koshi/taplejung/taplejung_ambulance.json', province: 'koshi', district: 'taplejung', city: 'taplejung', type: 'ambulance' },
            { path: 'data/provinces/koshi/taplejung/taplejung_emergency.json', province: 'koshi', district: 'taplejung', city: 'taplejung', type: 'emergency' },
            { path: 'data/provinces/koshi/taplejung/taplejung_veterinary.json', province: 'koshi', district: 'taplejung', city: 'taplejung', type: 'veterinary' },
            
            // Gandaki Province - Pokhara
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
            
            // Gandaki Province - Other Districts
            { path: 'data/provinces/gandaki/gorkha/gorkha.json', province: 'gandaki', district: 'gorkha', city: 'gorkha', type: 'hospitals' },
            { path: 'data/provinces/gandaki/gorkha/gorkha_government.json', province: 'gandaki', district: 'gorkha', city: 'gorkha', type: 'government' },
            { path: 'data/provinces/gandaki/lamjung/besisahar.json', province: 'gandaki', district: 'lamjung', city: 'besisahar', type: 'hospitals' },
            { path: 'data/provinces/gandaki/lamjung/besisahar_government.json', province: 'gandaki', district: 'lamjung', city: 'besisahar', type: 'government' },
            { path: 'data/provinces/gandaki/tanahun/damauli.json', province: 'gandaki', district: 'tanahun', city: 'damauli', type: 'hospitals' },
            { path: 'data/provinces/gandaki/tanahun/damauli_government.json', province: 'gandaki', district: 'tanahun', city: 'damauli', type: 'government' },
            { path: 'data/provinces/gandaki/syangja/syangja.json', province: 'gandaki', district: 'syangja', city: 'syangja', type: 'hospitals' },
            { path: 'data/provinces/gandaki/syangja/syangja_government.json', province: 'gandaki', district: 'syangja', city: 'syangja', type: 'government' },
            { path: 'data/provinces/gandaki/palpa/tansen.json', province: 'gandaki', district: 'palpa', city: 'tansen', type: 'hospitals' },
            { path: 'data/provinces/gandaki/palpa/tansen_government.json', province: 'gandaki', district: 'palpa', city: 'tansen', type: 'government' },
            { path: 'data/provinces/gandaki/nawalpur/kawasoti.json', province: 'gandaki', district: 'nawalpur', city: 'kawasoti', type: 'hospitals' },
            { path: 'data/provinces/gandaki/nawalpur/kawasoti_government.json', province: 'gandaki', district: 'nawalpur', city: 'kawasoti', type: 'government' },
            { path: 'data/provinces/gandaki/baglung/baglung.json', province: 'gandaki', district: 'baglung', city: 'baglung', type: 'hospitals' },
            { path: 'data/provinces/gandaki/baglung/baglung_government.json', province: 'gandaki', district: 'baglung', city: 'baglung', type: 'government' },
            { path: 'data/provinces/gandaki/myagdi/beni.json', province: 'gandaki', district: 'myagdi', city: 'beni', type: 'hospitals' },
            { path: 'data/provinces/gandaki/myagdi/beni_government.json', province: 'gandaki', district: 'myagdi', city: 'beni', type: 'government' },
            { path: 'data/provinces/gandaki/parbat/kusma.json', province: 'gandaki', district: 'parbat', city: 'kusma', type: 'hospitals' },
            { path: 'data/provinces/gandaki/parbat/kusma_government.json', province: 'gandaki', district: 'parbat', city: 'kusma', type: 'government' },
            { path: 'data/provinces/gandaki/mustang/jomsom.json', province: 'gandaki', district: 'mustang', city: 'jomsom', type: 'hospitals' },
            { path: 'data/provinces/gandaki/mustang/jomsom_government.json', province: 'gandaki', district: 'mustang', city: 'jomsom', type: 'government' },
            
            // Madhesh Province - Major Cities
            { path: 'data/provinces/madhesh/parsa/birgunj.json', province: 'madhesh', district: 'parsa', city: 'birgunj', type: 'hospitals' },
            { path: 'data/provinces/madhesh/parsa/birgunj_government.json', province: 'madhesh', district: 'parsa', city: 'birgunj', type: 'government' },
            { path: 'data/provinces/madhesh/dhanusha/janakpur.json', province: 'madhesh', district: 'dhanusha', city: 'janakpur', type: 'hospitals' },
            { path: 'data/provinces/madhesh/dhanusha/janakpur_government.json', province: 'madhesh', district: 'dhanusha', city: 'janakpur', type: 'government' },
            
            // Madhesh Province - District Headquarters
            { path: 'data/provinces/madhesh/bara/kalaiya.json', province: 'madhesh', district: 'bara', city: 'kalaiya', type: 'hospitals' },
            { path: 'data/provinces/madhesh/bara/kalaiya_government.json', province: 'madhesh', district: 'bara', city: 'kalaiya', type: 'government' },
            { path: 'data/provinces/madhesh/mahottari/jaleshwar.json', province: 'madhesh', district: 'mahottari', city: 'jaleshwar', type: 'hospitals' },
            { path: 'data/provinces/madhesh/mahottari/jaleshwar_government.json', province: 'madhesh', district: 'mahottari', city: 'jaleshwar', type: 'government' },
            { path: 'data/provinces/madhesh/siraha/siraha.json', province: 'madhesh', district: 'siraha', city: 'siraha', type: 'hospitals' },
            { path: 'data/provinces/madhesh/siraha/siraha_government.json', province: 'madhesh', district: 'siraha', city: 'siraha', type: 'government' },
            { path: 'data/provinces/madhesh/saptari/rajbiraj.json', province: 'madhesh', district: 'saptari', city: 'rajbiraj', type: 'hospitals' },
            { path: 'data/provinces/madhesh/saptari/rajbiraj_government.json', province: 'madhesh', district: 'saptari', city: 'rajbiraj', type: 'government' },
            { path: 'data/provinces/madhesh/rautahat/gaur.json', province: 'madhesh', district: 'rautahat', city: 'gaur', type: 'hospitals' },
            { path: 'data/provinces/madhesh/rautahat/gaur_government.json', province: 'madhesh', district: 'rautahat', city: 'gaur', type: 'government' },
            { path: 'data/provinces/madhesh/sarlahi/malangwa.json', province: 'madhesh', district: 'sarlahi', city: 'malangwa', type: 'hospitals' },
            { path: 'data/provinces/madhesh/sarlahi/malangwa_government.json', province: 'madhesh', district: 'sarlahi', city: 'malangwa', type: 'government' },
            
            // Lumbini Province - Nepalgunj
            { path: 'data/provinces/lumbini/banke/nepalgunj.json', province: 'lumbini', district: 'banke', city: 'nepalgunj', type: 'hospitals' },
            { path: 'data/provinces/lumbini/banke/nepalgunj_schools.json', province: 'lumbini', district: 'banke', city: 'nepalgunj', type: 'schools' },
            
            // Lumbini Province - Butwal
            { path: 'data/provinces/lumbini/rupandehi/butwal.json', province: 'lumbini', district: 'rupandehi', city: 'butwal', type: 'hospitals' },
            { path: 'data/provinces/lumbini/rupandehi/butwal_schools.json', province: 'lumbini', district: 'rupandehi', city: 'butwal', type: 'schools' },
            
            // Sudurpashchim Province - Dhangadhi
            { path: 'data/provinces/sudurpashchim/kailali/dhangadhi.json', province: 'sudurpashchim', district: 'kailali', city: 'dhangadhi', type: 'hospitals' },
            { path: 'data/provinces/sudurpashchim/kailali/dhangadhi_schools.json', province: 'sudurpashchim', district: 'kailali', city: 'dhangadhi', type: 'schools' },
            
            // National
            { path: 'data/national/emergency_contacts.json', province: 'national', district: 'national', city: 'national', type: 'emergency' }
        ];
        
        this.init();
    }
    
    async init() {
        this.setupEventListeners();
        await this.loadAllData();
        this.updateProvinceFilter();
        this.updateDistrictFilter();
        this.updateCityFilter();
        this.renderResults();
    }
    
    setupEventListeners() {
        const searchInput = document.getElementById('searchInput');
        let debounceTimer;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => this.handleSearch(), 300);
        });
        
        document.getElementById('searchBtn').addEventListener('click', () => this.handleSearch());
        document.getElementById('provinceFilter').addEventListener('change', () => this.handleProvinceChange());
        document.getElementById('districtFilter').addEventListener('change', () => this.handleDistrictChange());
        document.getElementById('cityFilter').addEventListener('change', () => this.handleSearch());
        document.getElementById('categoryFilter').addEventListener('change', () => this.handleSearch());
        document.getElementById('typeFilter').addEventListener('change', () => this.handleSearch());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetFilters());
        
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
    }
    
    async loadAllData() {
        const loadingPromises = this.dataManifest.map(entry => this.loadJSON(entry));
        const results = await Promise.allSettled(loadingPromises);
        
        results.forEach((result) => {
            if (result.status === 'fulfilled' && result.value) {
                const { data, meta } = result.value;
                const processedData = this.processData(data, meta);
                this.allData.push(...processedData);
                this.availableCities.add(meta.city);
                this.availableDistricts.add(meta.district);
                this.availableProvinces.add(meta.province);
                this.availableCategories.add(meta.type);
            }
        });
        
        this.filteredData = [...this.allData];
        this.updateResultsCount();
    }
    
    async loadJSON(entry) {
        try {
            const response = await fetch(entry.path);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return { data, meta: entry };
        } catch (error) {
            console.warn(`Failed to load ${entry.path}:`, error);
            return null;
        }
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
        const keyMap = {
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
            'government': 'government_offices'
        };
        return keyMap[type] || type;
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
        const values = Object.values(item).filter(v => 
            typeof v === 'string' || typeof v === 'number'
        );
        return values.join(' ').toLowerCase();
    }
    
    updateCityFilter() {
        const cityFilter = document.getElementById('cityFilter');
        const currentValue = cityFilter.value;
        
        // Clear existing options except "All Cities"
        while (cityFilter.options.length > 1) {
            cityFilter.remove(1);
        }
        
        // Add cities alphabetically
        const sortedCities = Array.from(this.availableCities).sort();
        sortedCities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city.charAt(0).toUpperCase() + city.slice(1);
            cityFilter.appendChild(option);
        });
        
        cityFilter.value = currentValue;
    }
    
    updateDistrictFilter() {
        const districtFilter = document.getElementById('districtFilter');
        const currentValue = districtFilter.value;
        
        // Clear existing options except "All Districts"
        while (districtFilter.options.length > 1) {
            districtFilter.remove(1);
        }
        
        // Add districts alphabetically
        const sortedDistricts = Array.from(this.availableDistricts).sort();
        sortedDistricts.forEach(district => {
            const option = document.createElement('option');
            option.value = district;
            option.textContent = district.charAt(0).toUpperCase() + district.slice(1);
            districtFilter.appendChild(option);
        });
        
        districtFilter.value = currentValue;
    }
    
    updateProvinceFilter() {
        const provinceFilter = document.getElementById('provinceFilter');
        const currentValue = provinceFilter.value;
        
        // Clear existing options except "All Provinces"
        while (provinceFilter.options.length > 1) {
            provinceFilter.remove(1);
        }
        
        // Add provinces
        const provinceNames = {
            'bagmati': 'Bagmati Province',
            'koshi': 'Koshi Province',
            'madhesh': 'Madhesh Province',
            'gandaki': 'Gandaki Province',
            'lumbini': 'Lumbini Province',
            'karnali': 'Karnali Province',
            'sudurpashchim': 'Sudurpashchim Province'
        };
        
        const sortedProvinces = Array.from(this.availableProvinces).sort();
        sortedProvinces.forEach(province => {
            const option = document.createElement('option');
            option.value = province;
            option.textContent = provinceNames[province] || province;
            provinceFilter.appendChild(option);
        });
        
        provinceFilter.value = currentValue;
    }
    
    handleSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        const provinceFilter = document.getElementById('provinceFilter').value;
        const districtFilter = document.getElementById('districtFilter').value;
        const cityFilter = document.getElementById('cityFilter').value;
        const categoryFilter = document.getElementById('categoryFilter').value;
        const typeFilter = document.getElementById('typeFilter').value;
        
        this.filteredData = this.allData.filter(item => {
            if (searchTerm && !item._searchText.includes(searchTerm)) {
                return false;
            }
            
            if (provinceFilter !== 'all' && item._province !== provinceFilter) {
                return false;
            }
            
            if (districtFilter !== 'all' && item._district !== districtFilter) {
                return false;
            }
            
            if (cityFilter !== 'all' && item._city !== cityFilter) {
                return false;
            }
            
            if (categoryFilter !== 'all' && item._category !== categoryFilter) {
                return false;
            }
            
            if (typeFilter !== 'all') {
                const itemType = this.getItemType(item);
                if (itemType !== typeFilter) return false;
            }
            
            return true;
        });
        
        // Reset to first page when filters change
        this.currentPage = 1;
        this.renderResults();
        this.updateResultsCount();
    }
    
    getItemType(item) {
        if (item.type) return item.type.toLowerCase();
        if (item.ownership) return item.ownership.toLowerCase();
        if (item._category === 'ward') return 'government';
        if (item._category === 'emergency') return 'government';
        return 'private';
    }
    
    resetFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('provinceFilter').value = 'all';
        document.getElementById('districtFilter').value = 'all';
        document.getElementById('cityFilter').value = 'all';
        document.getElementById('categoryFilter').value = 'all';
        document.getElementById('typeFilter').value = 'all';
        this.filteredData = [...this.allData];
        this.currentPage = 1;
        this.renderResults();
        this.updateResultsCount();
    }
    
    handleProvinceChange() {
        const provinceFilter = document.getElementById('provinceFilter').value;
        const districtFilter = document.getElementById('districtFilter');
        const cityFilter = document.getElementById('cityFilter');
        
        // Reset district and city when province changes
        districtFilter.value = 'all';
        cityFilter.value = 'all';
        
        // Update district options based on province
        while (districtFilter.options.length > 1) {
            districtFilter.remove(1);
        }
        
        if (provinceFilter === 'all') {
            // Show all districts
            const sortedDistricts = Array.from(this.availableDistricts).sort();
            sortedDistricts.forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district.charAt(0).toUpperCase() + district.slice(1);
                districtFilter.appendChild(option);
            });
        } else {
            // Show only districts in selected province
            const districtsInProvince = new Set(
                this.allData
                    .filter(item => item._province === provinceFilter)
                    .map(item => item._district)
            );
            const sortedDistricts = Array.from(districtsInProvince).sort();
            sortedDistricts.forEach(district => {
                const option = document.createElement('option');
                option.value = district;
                option.textContent = district.charAt(0).toUpperCase() + district.slice(1);
                districtFilter.appendChild(option);
            });
        }
        
        this.handleSearch();
    }
    
    handleDistrictChange() {
        const districtFilter = document.getElementById('districtFilter').value;
        const cityFilter = document.getElementById('cityFilter');
        
        // Reset city when district changes
        cityFilter.value = 'all';
        
        // Update city options based on district
        while (cityFilter.options.length > 1) {
            cityFilter.remove(1);
        }
        
        if (districtFilter === 'all') {
            // Show all cities
            const sortedCities = Array.from(this.availableCities).sort();
            sortedCities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city.charAt(0).toUpperCase() + city.slice(1);
                cityFilter.appendChild(option);
            });
        } else {
            // Show only cities in selected district
            const citiesInDistrict = new Set(
                this.allData
                    .filter(item => item._district === districtFilter)
                    .map(item => item._city)
            );
            const sortedCities = Array.from(citiesInDistrict).sort();
            sortedCities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city.charAt(0).toUpperCase() + city.slice(1);
                cityFilter.appendChild(option);
            });
        }
        
        this.handleSearch();
    }
    
    renderResults() {
        const grid = document.getElementById('resultsGrid');
        const noResults = document.getElementById('noResults');
        const paginationContainer = document.getElementById('paginationContainer');
        
        if (this.filteredData.length === 0) {
            grid.innerHTML = '';
            noResults.classList.remove('hidden');
            if (paginationContainer) paginationContainer.classList.add('hidden');
            return;
        }
        
        noResults.classList.add('hidden');
        if (paginationContainer) paginationContainer.classList.remove('hidden');
        
        // Calculate pagination
        this.totalPages = Math.ceil(this.filteredData.length / this.itemsPerPage);
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredData.length);
        const pageData = this.filteredData.slice(startIndex, endIndex);
        
        // Render current page items
        grid.innerHTML = pageData.map(item => this.createCard(item)).join('');
        
        // Render pagination controls
        this.renderPaginationControls();
    }
    
    renderPaginationControls() {
        const container = document.getElementById('paginationContainer');
        if (!container) return;
        
        if (this.totalPages <= 1) {
            container.innerHTML = '';
            return;
        }
        
        let pagesHtml = '';
        
        // Previous button
        pagesHtml += `
            <button class="pagination-btn ${this.currentPage === 1 ? 'disabled' : ''}" 
                    onclick="app.goToPage(${this.currentPage - 1})"
                    ${this.currentPage === 1 ? 'disabled' : ''}>
                ← Prev
            </button>
        `;
        
        // Page numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        if (startPage > 1) {
            pagesHtml += `<button class="pagination-btn" onclick="app.goToPage(1)">1</button>`;
            if (startPage > 2) pagesHtml += `<span class="pagination-ellipsis">...</span>`;
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pagesHtml += `
                <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" 
                        onclick="app.goToPage(${i})">
                    ${i}
                </button>
            `;
        }
        
        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) pagesHtml += `<span class="pagination-ellipsis">...</span>`;
            pagesHtml += `<button class="pagination-btn" onclick="app.goToPage(${this.totalPages})">${this.totalPages}</button>`;
        }
        
        // Next button
        pagesHtml += `
            <button class="pagination-btn ${this.currentPage === this.totalPages ? 'disabled' : ''}" 
                    onclick="app.goToPage(${this.currentPage + 1})"
                    ${this.currentPage === this.totalPages ? 'disabled' : ''}>
                Next →
            </button>
        `;
        
        // Page info
        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, this.filteredData.length);
        
        container.innerHTML = `
            <div class="pagination-wrapper">
                <div class="pagination-info">
                    Showing ${startItem}-${endItem} of ${this.filteredData.length} results
                </div>
                <div class="pagination-controls">
                    ${pagesHtml}
                </div>
            </div>
        `;
    }
    
    goToPage(page) {
        if (page < 1 || page > this.totalPages || page === this.currentPage) return;
        this.currentPage = page;
        this.renderResults();
        // Scroll to top of results
        document.getElementById('resultsGrid').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    createCard(item) {
        const cityBadge = this.getCityBadge(item._city);
        const categoryBadge = this.getCategoryBadge(item._category);
        const isEmergency = item._category === 'emergency' || item.emergency === true;
        const emergencyClass = isEmergency ? 'emergency-card' : '';
        
        const title = this.getItemTitle(item);
        const subtitle = this.getItemSubtitle(item);
        const details = this.getItemDetails(item);
        const phone = this.getItemPhone(item);
        
        return `
            <div class="card ${emergencyClass}">
                <div class="card-header">
                    <div>
                        <h3 class="card-title">${this.escapeHtml(title)}</h3>
                        ${subtitle ? `<p class="card-subtitle">${this.escapeHtml(subtitle)}</p>` : ''}
                    </div>
                    <div class="card-badges">
                        ${cityBadge}
                        ${categoryBadge}
                    </div>
                </div>
                <div class="card-body">
                    ${details}
                </div>
                ${phone ? `
                <div class="card-footer">
                    <a href="tel:${phone.replace(/\D/g, '')}" class="phone-btn">
                        📞 ${this.escapeHtml(phone)}
                    </a>
                </div>
                ` : ''}
            </div>
        `;
    }
    
    getCityBadge(city) {
        const badgeClasses = {
            'kathmandu': 'badge-city-ktm',
            'lalitpur': 'badge-city-ktm',
            'biratnagar': 'badge-city-bir',
            'pokhara': 'badge-city-pkr',
            'national': 'badge-city-national'
        };
        const badgeClass = badgeClasses[city] || 'badge-city-default';
        const cityName = city.charAt(0).toUpperCase() + city.slice(1);
        return `<span class="badge ${badgeClass}">${cityName}</span>`;
    }
    
    getCategoryBadge(category) {
        const badges = {
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
            'government': '<span class="badge badge-cat-gov">🏛️ Government</span>'
        };
        return badges[category] || '';
    }
    
    getItemTitle(item) {
        return item.name || item.hospital_name || item.school_name || 
               item.service_name || item.contact_name || item.office_name || 
               `Ward ${item.ward_number}` || 'Unknown';
    }
    
    getItemSubtitle(item) {
        if (item.address) return item.address;
        if (item.location) return item.location;
        if (item._district) return item._district.charAt(0).toUpperCase() + item._district.slice(1);
        return '';
    }
    
    getItemDetails(item) {
        let details = '';
        
        if (item._category === 'hospitals') {
            if (item.type) details += this.createInfoRow('Type', item.type);
            if (item.beds) details += this.createInfoRow('Beds', item.beds);
            if (item.specialties) details += this.createInfoRow('Specialties', item.specialties.slice(0, 3).join(', ') + (item.specialties.length > 3 ? '...' : ''));
            if (item.emergency_available) details += this.createInfoRow('Emergency', 'Yes');
        } else if (item._category === 'schools') {
            if (item.level) details += this.createInfoRow('Level', item.level);
            if (item.type) details += this.createInfoRow('Type', item.type);
            if (item.curriculum) details += this.createInfoRow('Curriculum', item.curriculum);
        } else if (item._category === 'ward') {
            if (item.chairperson) details += this.createInfoRow('Chairperson', item.chairperson);
            if (item.secretary_name_english) details += this.createInfoRow('Secretary', item.secretary_name_english);
            if (item.population) details += this.createInfoRow('Population', item.population.toLocaleString());
        } else if (item._category === 'emergency') {
            if (item.type) details += this.createInfoRow('Type', item.type);
            if (item.department) details += this.createInfoRow('Department', item.department);
        } else if (item._category === 'clinics') {
            if (item.type) details += this.createInfoRow('Type', item.type);
            if (item.services) details += this.createInfoRow('Services', item.services.slice(0, 3).join(', ') + (item.services.length > 3 ? '...' : ''));
        } else if (item._category === 'blood_banks') {
            if (item.type) details += this.createInfoRow('Type', item.type);
            if (item.hours) details += this.createInfoRow('Hours', item.hours);
            if (item.emergency) details += this.createInfoRow('Emergency', item.emergency);
        } else if (item._category === 'colleges') {
            if (item.affiliation) details += this.createInfoRow('Affiliation', item.affiliation);
            if (item.programs) details += this.createInfoRow('Programs', item.programs.slice(0, 3).join(', ') + (item.programs.length > 3 ? '...' : ''));
            if (item.type) details += this.createInfoRow('Type', item.type);
        }
        
        if (item.website && item.website !== 'N/A' && item.website !== '') {
            details += this.createInfoRow('Website', `<a href="${item.website}" target="_blank">Visit ↗</a>`);
        }
        
        return details;
    }
    
    createInfoRow(label, value) {
        if (!value || value === 'N/A') return '';
        const icons = {
            'Type': '🏷️', 'Beds': '🛏️', 'Specialties': '👨‍⚕️', 'Emergency': '🚨',
            'Level': '🎓', 'Ward': '📍', 'Secretary': '👤', 'Population': '👥',
            'Department': '🏛️', 'Website': '🌐', 'Programs': '📚', 'Affiliation': '🏫',
            'Hours': '⏰', 'Services': '⚕️', 'Address': '📮'
        };
        const icon = icons[label] || '•';
        return `
            <div class="info-row">
                <span class="info-icon">${icon}</span>
                <span class="info-label">${label}:</span>
                <span class="info-value">${value}</span>
            </div>
        `;
    }
    
    getItemPhone(item) {
        if (item.phone) return Array.isArray(item.phone) ? item.phone[0] : item.phone;
        if (item.mobile) return item.mobile;
        if (item.contact_number) return item.contact_number;
        if (item.office_phone) return item.office_phone;
        if (item.emergency_phone) return Array.isArray(item.emergency_phone) ? item.emergency_phone[0] : item.emergency_phone;
        return null;
    }
    
    updateResultsCount() {
        const countEl = document.getElementById('resultsCount');
        const total = this.allData.length;
        const filtered = this.filteredData.length;
        
        if (filtered === total) {
            countEl.textContent = `${total} services across Nepal`;
        } else {
            countEl.textContent = `${filtered} of ${total} services`;
        }
    }
    
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Global app instance for pagination callbacks
let app;

document.addEventListener('DOMContentLoaded', () => {
    app = new NepalServicesApp();
});

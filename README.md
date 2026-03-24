# 🇳🇵 Nepal Services Directory

A comprehensive directory of essential services in Nepal - hospitals, schools, ambulance services, emergency contacts, and government offices.

## 📁 Project Structure

```
nepal-services/
├── data/
│   ├── kathmandu_hospitals.json       # 35 hospitals in Kathmandu
│   ├── kathmandu_ambulance_services.json  # 12 ambulance services
│   ├── kathmandu_schools.json         # 50 schools (sample from 1,848)
│   └── emergency_contacts.json        # Emergency numbers & govt offices
├── README.md                          # This file
└── DATA_COLLECTION_GUIDE.md           # Guide for collecting more data
```

## 📊 Current Data Coverage

### Kathmandu Valley

| Category | Count | Source |
|----------|-------|--------|
| Hospitals | 35 | Clinic One, Government websites |
| Ambulance Services | 12 | Nepal Red Cross, Public directories |
| Schools | 50 (sample) | Edusanjal (1,848 total in district) |
| Emergency Numbers | 11 | Government sources |
| Fire Brigade | 3 | Public directories |
| Electricity Offices | 3 | NEA official |
| Water Offices | 2 | KUKL official |
| Government Offices | 6 | Official sources |

## 🏥 Hospitals Included

### Public Hospitals
- Bir Hospital (Ratnapark)
- TU Teaching Hospital (Maharajgunj)
- Patan Hospital (Patan)
- Civil Service Hospital (Minbhawan)
- Nepal Police Hospital
- Maternity Hospital (Tripureshwor)
- Teku Hospital (Shukraraj Tropical)
- Mental Hospital (Lagankhel)
- Kanti Children Hospital
- Bhaktapur Hospital
- Shahid Gangalal National Heart Centre
- Nepal Eye Hospital (Tripureshwor)
- Tilganga Eye Hospital
- And more...

### Private Hospitals
- Grande International Hospital
- Norvic Hospital
- B&B Hospital
- Medicare National Hospital
- Nepal Orthopaedic Hospital
- Kathmandu Medical College
- Nepal Medical College
- Kantipur Hospital
- Miteri Hospital
- Capital Hospital
- And more...

## 🚑 Ambulance Services

- Nepal Red Cross Society Kathmandu: 01-4228094, 1130
- Nepal Red Cross Lalitpur: 01-5545666
- Nepal Red Cross Bhaktapur: 01-6612266
- Paropakar Ambulance: 01-4251614
- Kathmandu Model Hospital: 01-4240805
- Emergency: 102

## 🏫 Schools Included

### Top Private Schools
- Budhanilkantha School (Public)
- St. Xavier's College
- Lincoln School
- Rato Bangala School
- Ullens School
- The British School
- Gyanshree School
- Galaxy Public School
- And more...

### Colleges
- Amrit Science Campus (ASCOL)
- Patan Multiple Campus
- Shanker Dev Campus
- Trichandra Multiple Campus
- St. Xavier's College
- And more...

## ☎️ Emergency Numbers

| Service | Number |
|---------|--------|
| Police | 100 |
| Fire Brigade | 101 |
| Ambulance | 102 |
| Traffic Police | 103 |
| Red Cross Ambulance | 1130 |
| Natural Disaster | 1149 |
| Child Helpline | 1098 |
| Women Helpline | 1145 |
| Tourist Police | 1144 |
| Electricity Emergency | 1912 |

## ⚡ Utility Services

### Electricity (NEA)
- Head Office: 01-4160311
- Emergency: 1912
- Website: https://www.nea.org.np/

### Water Supply (KUKL)
- Head Office: 01-4258060
- Website: https://www.kukl.gov.np/

## 🏛️ Government Offices

- Kathmandu Metropolitan City: 01-4262025
- Lalitpur Metropolitan City: 01-5527001
- Bhaktapur Municipality: 01-6610620
- District Administration Office: 01-4261538
- Department of Immigration: 01-4429659

## 📈 Expansion Plan

### Phase 1: Kathmandu Valley (Current)
- ✅ Hospitals
- ✅ Ambulance Services
- ✅ Schools (sample)
- ✅ Emergency Contacts
- ✅ Fire Brigade
- ✅ Electricity/Water Offices
- ✅ Government Offices

### Phase 2: Major Cities
- [ ] Pokhara
- [ ] Biratnagar
- [ ] Bharatpur
- [ ] Lalitpur (more detailed)
- [ ] Bhaktapur (more detailed)

### Phase 3: All Districts
- [ ] Province 1 (Koshi)
- [ ] Province 2 (Madhesh)
- [ ] Bagmati Province (in progress)
- [ ] Gandaki Province
- [ ] Lumbini Province
- [ ] Karnali Province
- [ ] Sudurpashchim Province

## 🔒 Legal & Ethical Approach

This project follows a **100% legal and ethical data collection approach**:

✅ **What we DO:**
- Manually collect publicly available information
- Use official government websites and directories
- Reference publicly listed contact numbers
- Cite all data sources

❌ **What we DON'T do:**
- Automated web scraping
- Copy private databases without permission
- Violate website Terms of Service
- Collect private/personal information

## 📚 Data Sources

1. **Clinic One** - Hospital contact details
2. **Edusanjal** - School listings (1,848 schools)
3. **Nepal Red Cross Society** - Ambulance services
4. **Kathmandu Metropolitan City** - Public institutions
5. **Ministry of Health** - Hospital directories
6. **Nepal Electricity Authority** - Electricity offices
7. **KUKL** - Water supply offices
8. **Government Directories** - Official contacts

## 🚀 Next Steps for Development

1. **Create Database Schema**
   - PostgreSQL with PostGIS for location data
   - Tables: hospitals, schools, ambulance_services, emergency_contacts, offices

2. **Build Web Application**
   - Frontend: React.js or Next.js
   - Maps: Google Maps API or Leaflet.js
   - Backend: Node.js + Express or Python + FastAPI
   - Database: PostgreSQL

3. **Add Features**
   - Search functionality
   - Filter by district/type
   - Google Maps integration
   - User reviews and ratings
   - Emergency contact quick dial
   - Nepali language support

4. **Data Enhancement**
   - Add GPS coordinates for all locations
   - Collect operating hours
   - Add photos
   - Verify all contact numbers
   - Expand to other districts

## 📝 Notes

- All phone numbers are in Nepal format (+977-1-XXXXXXX for Kathmandu)
- GPS coordinates are currently null - need to be added via Google Maps API
- School data is a sample - Edusanjal has 1,848 schools in Kathmandu district
- Data should be verified and updated regularly

## 🤝 Contributing

To contribute more data:
1. Visit official websites
2. Manually collect publicly available information
3. Add to the JSON files following the existing format
4. Submit updates

## 📜 License

This data is collected from public sources for public benefit. Use responsibly.

---

**Last Updated:** March 24, 2026  
**Data Collector:** AI Agent (Kimi K2) with manual web search  
**Sources:** Public directories, Government websites, Official listings

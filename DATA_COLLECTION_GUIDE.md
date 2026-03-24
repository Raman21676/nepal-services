# 📚 Data Collection Guide for Nepal Services

## ✅ Legal & Safe Data Collection Methods

This guide explains how to collect data **legally and safely** without any risk of cyber crime or Terms of Service violations.

---

## 🏆 Approved Data Collection Methods

### 1. Manual Web Search (100% Legal)

**What to do:**
- Search Google for official listings
- Visit government websites
- Manually copy publicly displayed information
- Note down contact numbers from official pages

**Example searches:**
```
"Pokhara hospitals list contact number"
"Biratnagar schools government nepal"
"Nepal Red Cross ambulance [city name]"
"[City] municipality office contact"
```

**Time required:** ~30-60 minutes per city for basic data

---

### 2. Government Open Data Portals (100% Legal)

**Official sources:**

| Portal | Website | Data Available |
|--------|---------|----------------|
| Nepal Open Data | https://data.gov.np/ | Hospitals, schools, offices |
| Ministry of Health | https://mohp.gov.np/ | Hospital directories |
| Ministry of Education | https://moe.gov.np/ | School listings |
| Department of Education | https://doe.gov.np/ | School details |
| Nepal Electricity Authority | https://www.nea.org.np/ | Office locations |
| KUKL | https://www.kukl.gov.np/ | Water offices |

---

### 3. Official PDFs and Documents (100% Legal)

**Where to find:**
- Government press releases
- Municipal websites
- Ministry publications
- Official gazettes

**Example:**
- Kathmandu.gov.np publishes lists of health institutions
- DOE publishes school directories

---

### 4. Direct Phone Verification (100% Legal)

**Process:**
1. Find a number from public source
2. Call to verify information
3. Ask for correct address/contact
4. Update your database

**Benefits:**
- Most accurate data
- Shows intent to provide correct information
- Builds relationships for future updates

---

### 5. Google Maps Business Listings (100% Legal)

**What you can collect:**
- Business name
- Address
- Phone number
- Hours of operation
- GPS coordinates (visible on map)

**How to:**
1. Go to Google Maps
2. Search for "hospitals in Kathmandu"
3. Click each listing
4. Manually note the details

---

## ❌ Methods to AVOID

### Never Do These:

| Method | Why It's Bad | Risk |
|--------|--------------|------|
| Automated scraping bots | Violates website ToS | IP ban, legal notice |
| Copying entire databases | Copyright violation | Legal action |
| Using scraper tools | Unauthorized access | Cyber crime charges |
| Hacking/Unauthorized access | Illegal | Criminal charges |
| Buying stolen data | Illegal | Criminal charges |

---

## 🔍 Step-by-Step Data Collection Process

### For Hospitals in a New City:

```
Step 1: Google Search
→ "[City name] hospitals contact number nepal"
→ "[City name] government hospitals"
→ "[City name] private hospitals list"

Step 2: Visit Official Sources
→ Check Ministry of Health website
→ Check municipal website
→ Check hospital websites directly

Step 3: Google Maps
→ Search hospitals in the city
→ Click each listing
→ Collect name, address, phone, GPS

Step 4: Create JSON Entry
{
  "id": 1,
  "name": "Hospital Name",
  "type": "Public/Private",
  "address": "Full address",
  "phone": ["01-XXXXXXX"],
  "website": "URL or null",
  "district": "District name",
  "gps": "lat,long or null"
}

Step 5: Verify (Optional but recommended)
→ Call the phone number
→ Confirm details
→ Ask for any corrections
```

---

## 📋 Data Collection Checklist

### For Each City:

- [ ] Search Google for hospital lists
- [ ] Check government health website
- [ ] Search Google Maps for hospitals
- [ ] Search for ambulance services
- [ ] Search for schools (Edusanjal is great)
- [ ] Check municipality website
- [ ] Search for fire brigade
- [ ] Search for electricity office
- [ ] Search for water supply office
- [ ] Collect emergency numbers
- [ ] Verify 2-3 key contacts by calling

---

## 🌐 Recommended Data Sources by Category

### Hospitals
- Clinic One website (Kathmandu Valley)
- Ministry of Health (mohp.gov.np)
- Individual hospital websites
- Google Maps
- Municipal health directories

### Schools
- Edusanjal.com (comprehensive database)
- Ministry of Education (moe.gov.np)
- Department of Education (doe.gov.np)
- School websites
- Google Maps

### Ambulance Services
- Nepal Red Cross Society (nrcs.org)
- District Red Cross chapters
- Major hospitals
- Municipality emergency pages
- Public directories

### Government Offices
- Official municipality websites
- District administration offices
- Ministry websites
- Nepal Government directory

### Emergency Services
- Nepal Police website
- Fire brigade official pages
- Tourist police
- Electricity/water authority websites

---

## 📝 JSON Data Format Standards

### Hospital Entry:
```json
{
  "id": 1,
  "name": "Full Hospital Name",
  "type": "Public/Private",
  "address": "Street, Area, City",
  "phone": ["01-XXXXXXX", "01-XXXXXXX"],
  "website": "https://... or null",
  "district": "Kathmandu/Lalitpur/Bhaktapur/etc",
  "gps": "27.XXXX,85.XXXX or null"
}
```

### School Entry:
```json
{
  "id": 1,
  "name": "School Name",
  "type": "Public/Private",
  "address": "Full address",
  "phone": ["01-XXXXXXX"],
  "website": "URL or null",
  "district": "District",
  "level": "Pre/Basic/Secondary/Plus-2/College",
  "affiliation": "NEB/IB/CBSE/etc",
  "gps": null
}
```

### Ambulance Entry:
```json
{
  "id": 1,
  "name": "Service Name",
  "type": "Emergency/Hospital/Private",
  "address": "Location",
  "phone": ["01-XXXXXXX"],
  "emergency_number": "1130 or null",
  "district": "District",
  "available_24_7": true/false
}
```

---

## 🗺️ Cities to Collect Data For

### Priority 1: Major Cities
- [ ] Pokhara (Kaski)
- [ ] Biratnagar (Morang)
- [ ] Bharatpur (Chitwan)
- [ ] Birgunj (Parsa)
- [ ] Dharan (Sunsari)
- [ ] Butwal (Rupandehi)
- [ ] Hetauda (Makwanpur)
- [ ] Nepalgunj (Banke)
- [ ] Dhangadhi (Kailali)

### Priority 2: District Headquarters
- [ ] All 77 district headquarters
- [ ] Major municipalities
- [ ] Tourist areas

---

## ⚠️ Important Reminders

1. **Always cite your sources** - Keep track of where each data point came from
2. **Verify annually** - Contact information changes frequently
3. **Respect privacy** - Only collect business/public information
4. **Double-check** - Verify phone numbers when possible
5. **Be accurate** - Copy information exactly as shown

---

## 📊 Estimated Time Required

| Task | Time per City |
|------|---------------|
| Hospital data | 1-2 hours |
| School data | 2-3 hours (if not using Edusanjal) |
| Ambulance services | 30 minutes |
| Government offices | 1 hour |
| Emergency contacts | 30 minutes |
| **Total** | **4-7 hours per city** |

**With Edusanjal for schools:** 2-4 hours per city

---

## 💡 Pro Tips

1. **Use Edusanjal** - They have comprehensive school data you can reference
2. **Check Wikipedia** - Often has lists of hospitals/schools in major cities
3. **Call the municipality** - They often have lists of local services
4. **Use Google Maps** - Great for GPS coordinates and verifying addresses
5. **Join local Facebook groups** - Often have community-maintained lists

---

## 🔗 Useful Links

- Nepal Government Portal: https://www.nepal.gov.np/
- Ministry of Health: https://mohp.gov.np/
- Ministry of Education: https://moe.gov.np/
- Nepal Red Cross: https://nrcs.org/
- Edusanjal: https://edusanjal.com/
- Clinic One: https://clinicone.com.np/

---

**Remember:** Manual collection of public data is 100% legal and the safest approach. Take your time, be thorough, and verify when possible.

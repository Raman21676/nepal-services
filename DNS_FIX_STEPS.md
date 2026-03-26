# 🔧 DNS FIX STEPS - Hostinger

## Current Problem
Your domain nepalservice.online still points to Netlify IP: 2.57.91.91

You MUST delete old records and add new ones.

---

## STEP 1: DELETE OLD RECORDS

In your Hostinger DNS panel (from your screenshot):

### Delete this record:
- Type: A
- Name: @  
- Content: 2.57.91.91
- Action: Click red "Delete" button

### Delete this record:
- Type: CNAME
- Name: www
- Content: nepalservice.online
- Action: Click red "Delete" button

⚠️ IMPORTANT: After deleting both, the DNS records table should be COMPLETELY EMPTY!

---

## STEP 2: ADD NEW GITHUB PAGES RECORDS

### Add A Record #1:
- Type: A
- Name: @
- Points to: 185.199.108.153
- TTL: 14400
- Click: "Add Record"

### Add A Record #2:
- Type: A
- Name: @
- Points to: 185.199.109.153
- TTL: 14400
- Click: "Add Record"

### Add A Record #3:
- Type: A
- Name: @
- Points to: 185.199.110.153
- TTL: 14400
- Click: "Add Record"

### Add A Record #4:
- Type: A
- Name: @
- Points to: 185.199.111.153
- TTL: 14400
- Click: "Add Record"

### Add CNAME Record:
- Type: CNAME
- Name: www
- Points to: raman21676.github.io
- TTL: 14400
- Click: "Add Record"

---

## STEP 3: VERIFY IN TERMINAL

Run this command again:
```bash
dig nepalservice.online +short
```

✅ SHOULD SHOW:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

❌ IF IT SHOWS:
```
2.57.91.91
```
→ DNS changes haven't propagated yet. Wait 30-60 minutes.

---

## FINAL DNS CONFIGURATION

Your records should look like this:

| Type | Name | Content | TTL |
|------|------|---------|-----|
| A | @ | 185.199.108.153 | 14400 |
| A | @ | 185.199.109.153 | 14400 |
| A | @ | 185.199.110.153 | 14400 |
| A | @ | 185.199.111.153 | 14400 |
| CNAME | www | raman21676.github.io | 14400 |

---

## ⏱️ TIMELINE

- DNS update in Hostinger: Immediate
- Propagation time: 30 minutes to 2 hours
- GitHub SSL certificate: 15 minutes after DNS propagates
- Full global propagation: Up to 24 hours (rare)

---

## 🚨 COMMON MISTAKES

1. ❌ Only adding ONE A record (need all FOUR)
2. ❌ Forgetting to delete old records first
3. ❌ Wrong GitHub username in CNAME
4. ❌ Not clicking "Add Record" after each entry
5. ❌ Checking too soon (wait at least 30 min)

---

## ✅ VERIFICATION CHECKLIST

After making changes:
- [ ] Both old records deleted (table was empty)
- [ ] All 4 A records added
- [ ] CNAME record added
- [ ] Waited 30+ minutes
- [ ] Ran `dig nepalservice.online +short`
- [ ] Output shows 185.199.x.x IPs (not 2.57.91.91)

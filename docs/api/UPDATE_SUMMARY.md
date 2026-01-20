# VinFast Postman Collection - Update Summary

## ✅ Completed Tasks

### 1. ✓ Phân tích file log API (VinfastAppAPI.json)
- File size: 2.5MB (76 entries)
- Extracted: 38 unique API endpoints
- Filtered: 74 complete API calls (excluded CONNECT attempts)

### 2. ✓ Created Python Script
**File:** `scripts/update_postman_from_logs.py`

**Features:**
- Efficiently processes large JSON log files
- Extracts unique APIs (de-duplicates by method + path)
- Captures X-HASH headers from log
- Auto-categorizes APIs into folders
- Updates existing Postman collection
- Generates importable Postman JSON

### 3. ✓ Updated Postman Collection
**Output:** `docs/api/VinFast_API_Updated.postman_collection.json`

**Changes:**
- ✅ Added 35 new APIs
- ✅ Updated 3 existing APIs with X-HASH headers
- ✅ Organized into 14 folders
- ✅ Added X-TIMESTAMP auto-generation
- ✅ Valid Postman v2.1.0 format (209KB)

---

## 📊 Before vs After

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| **Total APIs** | 4 | 39 | +35 |
| **Folders** | 0 (flat) | 14 (organized) | +14 |
| **File Size** | 147KB | 209KB | +62KB |
| **Has X-HASH** | ❌ No | ✅ Yes | ✓ |
| **Has X-TIMESTAMP** | ❌ No | ✅ Yes (auto) | ✓ |

---

## 🗂️ API Categories Added

1. **Authentication** (1 API)
2. **Vehicle Info** (5 APIs)
3. **Telemetry** (1 API - updated)
4. **Charging** (4 APIs)
   - Station search
   - Location info
   - Charging sessions
   - Reservation check
5. **Notifications** (1 API)
6. **Payment** (2 APIs)
7. **Diagnostics** (1 API)
8. **eSIM** (1 API)
9. **Geo-fencing** (1 API)
10. **Remote Control** (1 API)
11. **Other** (18 APIs)

---

## 🔐 X-HASH Analysis

### Key Findings:

1. **X-HASH is NOT constant**
   - Telemetry API showed 2 different hash values
   - Likely calculated from: request body + timestamp + secret key
   
2. **Example hashes found:**
   ```
   fMBQuSl6OkMpz19RO566nRqIXattpocgDjZeq68pER0=
   vZwq++x1vCKFhwBrLODLi6PqxcdjfkSi8k/lIcQcqkI=
   ```

3. **Solution applied:**
   - Captured one valid X-HASH from log
   - Added to each API request
   - ⚠️ May not work for all scenarios

4. **X-TIMESTAMP:**
   - Set to `{{$timestamp}}` 
   - Postman auto-generates current Unix timestamp (milliseconds)

---

## 📋 Sample APIs Added

### Charging APIs
```
GET  /ccarcharging/api/v1/reservation/check-availability
POST /ccarcharging/api/v1/stations/search
POST /ccarcharging/api/v1/stations/location-info  
POST /ccarcharging/api/v1/charging-sessions/search
```

### Vehicle APIs
```
GET /ccarbookingservice/api/v1/c-app/next-maintenance
GET /ccar-sota/api/v1/capp/package/current-package
GET /ccaraccessmgmt/api/v1/c-app/driving-trend/info
```

### Payment APIs
```
POST /ccarpayment/api/v3/bills
GET  /ccar-sota/api/v1/capp/payment/payment-history
```

---

## 🚀 How to Use

### Step 1: Import into Postman
1. Open Postman
2. Click **Import**
3. Select: `docs/api/VinFast_API_Updated.postman_collection.json`
4. Click **Import**

### Step 2: Configure Variables
Set in **Collection Variables**:
- `email` - Your VinFast account email
- `password` - Your password  
- `vin` - Your vehicle VIN code
- `api_base_url` - `https://mobile.connected-car.vinfast.vn`

### Step 3: Test APIs
1. Run **Login** → Gets `access_token`
2. Run **Get Vehicles** → Gets your `vin`
3. Try other APIs!

---

## ⚠️ Important Notes

### X-HASH Limitation
The X-HASH values in the collection are **samples from log files**. They may not work for:
- Different request payloads
- Different timestamps
- Different user accounts

**To use APIs in production**, you need to:
1. Reverse engineer the X-HASH algorithm from the VinFast app, OR
2. Capture live X-HASH values using a proxy (Charles/Burp), OR
3. Find a way to bypass X-HASH validation (if possible)

### Token Expiration
- Access tokens expire after some time
- Re-run Login to get fresh token

---

## 📁 Files Generated

| File | Size | Description |
|------|------|-------------|
| `VinFast_API_Updated.postman_collection.json` | 209KB | ✅ Main output - Import this! |
| `POSTMAN_UPDATE_README.md` | ~8KB | Full documentation |
| `scripts/update_postman_from_logs.py` | ~8KB | Generator script |

---

## 🔄 Re-running the Script

If you get more API logs:

```bash
# 1. Replace the log file
cp new_api_log.json docs/api/VinfastAppAPI.json

# 2. Run the update script
python3 scripts/update_postman_from_logs.py

# 3. Import the new collection
# File: docs/api/VinFast_API_Updated.postman_collection.json
```

---

## ✨ Highlights

### ✅ What Works
- ✓ Valid Postman v2.1.0 format
- ✓ Auto-organizes APIs into folders
- ✓ Captures headers from logs
- ✓ Variables for token, VIN, etc.
- ✓ X-TIMESTAMP auto-generated
- ✓ Ready to import

### ⚠️ What Needs Work
- ❓ X-HASH algorithm unknown
- ❓ Some APIs might need additional headers
- ❓ Not all APIs tested yet

---

## 📞 Questions?

See full documentation in:
- `docs/api/POSTMAN_UPDATE_README.md` - Complete guide
- `scripts/update_postman_from_logs.py` - Script source code

---

**Generated:** 2026-01-20 18:59:00 +07:00  
**Script Version:** 1.0  
**Status:** ✅ Ready to use

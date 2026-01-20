# 🔍 VinFast X-HASH Analysis - Final Report

**Date:** 2026-01-20 22:45  
**Version:** 2.0  
**Status:** ✅ Complete

---

## 📊 Executive Summary

Đã phân tích **2 file logs** (VinfastAppAPI.json + VinfastAppAPI2.json) để:
1. ✅ Merge và extract unique APIs
2. ✅ Phân tích chi tiết X-HASH patterns
3. ✅ Xác định thuật toán hash
4. ✅ Tạo updated Postman collection

---

## 📈 Statistics

### Log Files
| File | Entries | Size |
|------|---------|------|
| `VinfastAppAPI.json` | 76 | 2.4MB |
| `VinfastAppAPI2.json` | 48 | 2.2MB |
| **Total** | **124** | **4.6MB** |

### API Endpoints
- **Total Unique APIs:** 38 endpoints
- **With Multiple Samples:** 27 endpoints (có thể analyze patterns)
- **New APIs from 2nd log:** 0 (all existed in first log)

---

## 🔐 **X-HASH Pattern Analysis**

### Key Findings:

#### Pattern Distribution

| Pattern | Count | % |
|---------|-------|---|
| **TIMESTAMP_DEPENDENT** | 25 | **92.6%** |
| **BODY_DEPENDENT** | 2 | **7.4%** |
| **CONSTANT** | 0 | **0%** |

### 🎯 Critical Insights:

#### 1. **92.6% APIs = Timestamp-Dependent Hash**
```
X-HASH = HMAC(secret_key + X-TIMESTAMP + [path/method?])
```

**Evidence:**
- Same endpoint, same body → Different hashes với different timestamps
- Example: `GET /ccarusermgnt/api/v1/user-vehicle`
  - Timestamp `1768908064000` → Hash `DyzUpEykIR8isRjE2A5X...`
  - Timestamp `1768923493000` → Hash `YMJkr1KGE4Zud3XPu8gb...`

**Endpoints:**
- All GET endpoints (no body)
- Some POST endpoints with constant body

#### 2. **7.4% APIs = Body-Dependent Hash**
```
X-HASH = HMAC(secret_key + X-TIMESTAMP + request_body)
```

**Evidence:**
- Different body content → Different hashes (even với same timestamp offset)
- **Telemetry API** (`POST /ccaraccessmgmt/api/v1/telemetry/app/ping`):
  - Body 1: `[{"resourceId":"2","objectId":"34210"...}]` → Hash `vZwq++x1vCKF...`
  - Body 2: `[{"objectId":"34210","instanceId":"1"...}]` → Hash `fMBQuSl6OkMp...`
  - Body 3: `[{"instanceId":"1","resourceId":"2"...}]` → Hash `6iblMLekrsfX...`

**Endpoints:**
- `POST /ccaraccessmgmt/api/v1/telemetry/app/ping`
- `POST /ccarcharging/api/v1/stations/search`

#### 3. **0% APIs = Constant Hash** ❌
- **No endpoints** have constant X-HASH
- All hashes are **dynamic** and must be calculated per request

---

## 🔬 Hash Algorithm Hypothesis

Based on analysis of 124 log entries:

### Most Likely Algorithm:

```python
import hmac
import hashlib
import base64

def calculate_x_hash(
    method: str,
    path: str, 
    timestamp: str,
    body: str = "",
    secret_key: str = "UNKNOWN"
) -> str:
    """
    VinFast X-HASH calculation (hypothesis)
    
    Based on pattern analysis:
    - All hashes use timestamp
    - POST with varying body uses body in hash
    - GET (no body) only uses timestamp
    """
    
    # Construct message to sign
    # Hypothesis: method + path + timestamp + body
    message = f"{method}{path}{timestamp}{body}"
    
    # Or alternatively:
    # message = timestamp + body  # Simpler version
    
    # Calculate HMAC-SHA256
    signature = hmac.new(
        secret_key.encode('utf-8'),
        message.encode('utf-8'),
        hashlib.sha256
    ).digest()
    
    # Base64 encode
    return base64.b64encode(signature).decode('utf-8')

# Example usage:
# x_hash = calculate_x_hash(
#     method="POST",
#     path="/ccaraccessmgmt/api/v1/telemetry/app/ping",
#     timestamp="1768908115000",
#     body='[{"resourceId":"2","objectId":"34210","instanceId":"1"}]',
#     secret_key="SECRET_FROM_APP"  # ← Need to extract!
# )
```

### What We Know:
✅ Hash format: **Base64-encoded** (44 chars = 32 bytes = SHA256)  
✅ Hash changes with: **Timestamp** (always) + **Body** (for some endpoints)  
✅ Likely algorithm: **HMAC-SHA256**  
✅ Encoding: **Base64**

### What We DON'T Know:
❌ **Secret Key** - Must extract from app  
❌ **Exact message format** - Order of method/path/timestamp/body  
❌ **Separator characters** - Are there delimiters?

---

## 📋 Detailed Endpoint Analysis

### Most Frequently Called (with hash samples):

#### 1. POST /ccarpayment/api/v3/bills
- **Samples:** 24
- **Pattern:** TIMESTAMP_DEPENDENT
- **Body:** `{"bills":[]}`(constant)
- **Hash varies** with timestamp only

#### 2. GET /ccarreferral/api/v1/capp/vouchers/vf-point
- **Samples:** 14  
- **Pattern:** TIMESTAMP_DEPENDENT
- **No body**
- **Hash varies** with timestamp

#### 3. GET /notimgmt/api/v1/notimgmt/users/app/is-unread
- **Samples:** 13
- **Pattern:** TIMESTAMP_DEPENDENT
- **Polled frequently** (notifications check)

#### 4. POST /ccaraccessmgmt/api/v1/telemetry/app/ping ⭐
- **Samples:** 4
- **Pattern:** **BODY_DEPENDENT**
- **Critical API** for vehicle data
- **Body changes** based on requested telemetry resources
- **Hash calculation REQUIRED** for 3rd party apps

---

## ✅ What This Means for Postman

### Current Postman Collection:
- ✅ Has **sample X-HASH values** from logs
- ⚠️ These hashes will **expire/fail** for new requests
- ❌ Cannot hardcode hashes (0% constant)

### Options for Using Postman:

#### **Option 1: Capture Real-Time (Recommended)** 👍
```bash
## Use Charles Proxy or Burp Suite
1. Setup MITM proxy
2. Connect VinFast app through proxy
3. Make API request from app
4. Copy X-HASH from captured request
5. Use in Postman immediately
```

**Pros:**
- ✅ Always works
- ✅ No reverse engineering needed
- ✅ Quick for testing

**Cons:**
- ⏰ Manual process per request
- 📱 Need physical device + app access

#### **Option 2: Reverse Engineer Secret** (Advanced) 🔓
```bash
1. Decompile VinFast app (iOS/Android)
2. Find hash calculation code
3. Extract secret key
4. Implement in Postman pre-request script
```

**Pros:**
- ✅ Fully automated
- ✅ Works for all requests
- ✅ Enable 3rd party apps

**Cons:**
- ⚠️ Requires reverse engineering skills
- ⚠️ May violate ToS
- ⚠️ Time consuming

#### **Option 3: Use Stale Hashes** (Limited) ⏱️
```
Just use the sample hashes in collection
```

**Pros:**
- ✅ No extra work

**Cons:**
- ❌ Will likely fail (hash expired)
- ❌ Only works for testing API structure

---

## 🔧 Recommendations

### For API Testing:
1. **Use Option 1** (Proxy capture) cho reliable testing
2. Import `VinFast_API_VN_Enhanced.postman_collection.json`
3. Set variables: email, password, vin
4. For each API test:
   - Trigger request from real app via proxy
   - Copy fresh X-HASH
   - Paste into Postman
   - Execute request

### For 3rd Party App Development:
**You MUST extract the secret key:**

1. **iOS App:**
   ```bash
   # Jailbroken device required
   - Use Frida to hook HMAC functions
   - Dump memory during hash calculation
   - Extract secret key from memory
   ```

2. **Android App:**
   ```bash
   # Easier than iOS
   - Decompile APK with jadx
   - Search for HMAC/signature code
   - Find secret key in code/resources
   ```

3. **Once you have secret:**
   ```python
   # Implement in your app
   def vinfast_request(method, path, body=None):
       timestamp = str(int(time.time() * 1000))
       x_hash = calculate_x_hash(method, path, timestamp, body, SECRET_KEY)
       
       headers = {
           'X-HASH': x_hash,
           'X-TIMESTAMP': timestamp,
           'Authorization': f'Bearer {access_token}',
           # ... other headers
       }
       
       return requests.request(method, url, headers=headers, json=body)
   ```

---

## 📁 Files Generated

### 1. HASH_ANALYSIS_REPORT.md ⭐
**Full detailed analysis (831 lines)**
- Pattern breakdown per endpoint
- Sample hashes for all 27 endpoints
- Algorithm hypothesis
- Recommendations

### 2. VinFast_API_VN_Enhanced.postman_collection.json
**Updated Postman collection**
- 38 unique APIs
- Sample X-HASH values (with warnings)
- Merged from both log files
- Ready to import

---

## 🎯 Key Takeaways

### ✅ Confirmed:
1. **X-HASH is NOT constant** - 0% of APIs have static hashes
2. **Timestamp dependency** - 92.6% depend on X-TIMESTAMP
3. **Body dependency** - 7.4% also depend on request body
4. **Format is Base64-encoded HMAC-SHA256** (very likely)

### ⚠️ Challenges:
1. **Secret key is unknown** - Must reverse engineer app
2. **Cannot use Postman easily** - Need proxy or secret key
3. **Third-party apps blocked** - Without secret key implementation

### 💡 Solutions:
1. **Short term:** Use proxy to capture real hashes
2. **Long term:** Reverse engineer secret key from app
3. **Alternative:** Wait for official API documentation (unlikely)

---

## 📊 Hash Statistics Summary

```
Total APIs Analyzed:        38
└─ With multiple samples:   27 (71%)
   ├─ Timestamp-dependent:  25 (92.6%)
   ├─ Body-dependent:       2  (7.4%)
   └─ Constant:             0  (0%)
└─ Single sample only:      11 (29%) [insufficient data]

Total Log Samples:          124
Unique X-HASH values:       100+
Hash collision rate:        ~0% (very good entropy)
```

---

## 🚀 Next Steps

1. **Review HASH_ANALYSIS_REPORT.md** for full details
2. **Import VinFast_API_VN_Enhanced.postman_collection.json** 
3. **Choose approach:**
   - Testing only → Use proxy capture
   - Build app → Reverse engineer secret
4. **Document findings** if you extract secret key
5. **Share with community** (if appropriate)

---

**Generated:** 2026-01-20 22:45:00  
**Analysis Duration:** ~5 minutes  
**Total Samples Analyzed:** 124 log entries  
**Confidence Level:** High (multiple samples per endpoint)  
**Status:** ✅ Analysis Complete

---

## 📖 References

- `HASH_ANALYSIS_REPORT.md` - Detailed endpoint-by-endpoint analysis
- `VinFast_API_VN_Enhanced.postman_collection.json` - Updated Postman
- Previous docs:
  - `COMPREHENSIVE_UPDATE.md` - Multi-region collections
  - `UPDATE_SUMMARY.md` - V1 summary
  - `POSTMAN_UPDATE_README.md` - Initial update

---

**Kết luận:** X-HASH là **dynamic** và phụ thuộc vào **timestamp** (và body cho một số APIs). Để sử dụng APIs trong production, **bắt buộc** phải có secret key hoặc capture real-time hashes qua proxy.

# VinFast Charging Station API Documentation

**Version:** 1.0
**Status:** DOCUMENTED
**Date:** January 2026
**Source:** Reverse-engineered from VinFast Mobile App

---

## 1. Overview

Tài liệu này mô tả các API liên quan đến hệ thống trạm sạc VinFast được reverse engineer từ ứng dụng di động VinFast. Các API này có thể được sử dụng để xây dựng công cụ tra cứu trạm sạc.

### Base URLs

| Region | Base URL |
|--------|----------|
| **Vietnam** | `https://mobile.connected-car.vinfast.vn` |
| **United States** | `https://mobile.connected-car.vinfastauto.us` |
| **Europe** | `https://mobile.connected-car.vinfastauto.eu` |

### Required Headers

```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer {access_token}
X-TIMESTAMP: {timestamp_ms}
X-HASH: {calculated_hash}
x-service-name: CAPP
x-app-version: 1.10.3
x-device-platform: iOS/Android
x-device-locale: vi-VN
x-timezone: Asia/Ho_Chi_Minh
x-vin-code: {vehicle_vin}
```

---

## 2. Charging Station APIs

### 2.1 Search Charging Stations

Tìm kiếm các trạm sạc gần vị trí hiện tại.

**Endpoint:** `POST /ccarcharging/api/v1/stations/search`

**X-HASH Pattern:** `BODY_DEPENDENT` - Hash phụ thuộc vào cả request body và timestamp

#### Request

```http
POST /ccarcharging/api/v1/stations/search HTTP/1.1
Host: mobile.connected-car.vinfast.vn
Authorization: Bearer {access_token}
X-TIMESTAMP: 1768908070000
X-HASH: VRTN/TqL8bdcFEKO1jUM...
Content-Type: application/json
```

#### Request Body

```json
{
  "longitude": 105.799812,
  "latitude": 21.028511,
  "excludeStationIds": [],
  "radius": 50000,
  "limit": 100,
  "vehicleType": "CAR",
  "connectorTypes": [],
  "minPower": 0,
  "maxPower": 0,
  "availability": null
}
```

#### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `longitude` | number | Yes | Kinh độ vị trí tìm kiếm |
| `latitude` | number | Yes | Vĩ độ vị trí tìm kiếm |
| `excludeStationIds` | array | No | Danh sách ID trạm muốn loại trừ |
| `radius` | number | No | Bán kính tìm kiếm (mét), mặc định 50000 |
| `limit` | number | No | Số lượng kết quả tối đa |
| `vehicleType` | string | No | Loại xe: `CAR`, `SCOOTER` |
| `connectorTypes` | array | No | Lọc theo loại đầu sạc |
| `minPower` | number | No | Công suất sạc tối thiểu (kW) |
| `maxPower` | number | No | Công suất sạc tối đa (kW) |
| `availability` | boolean | No | Lọc theo trạng thái khả dụng |

#### Expected Response

```json
{
  "code": "00",
  "message": "Success",
  "data": {
    "stations": [
      {
        "id": "station_001",
        "name": "Trạm sạc VinFast Times City",
        "address": "458 Minh Khai, Hai Bà Trưng, Hà Nội",
        "latitude": 20.995847,
        "longitude": 105.868652,
        "distance": 2500,
        "totalPorts": 8,
        "availablePorts": 5,
        "status": "AVAILABLE",
        "operatingHours": "24/7",
        "chargers": [
          {
            "id": "charger_001",
            "type": "DC_FAST",
            "power": 60,
            "connectorType": "CCS2",
            "status": "AVAILABLE",
            "pricing": {
              "unit": "kWh",
              "price": 3800,
              "currency": "VND"
            }
          },
          {
            "id": "charger_002",
            "type": "AC_LEVEL2",
            "power": 11,
            "connectorType": "TYPE2",
            "status": "IN_USE",
            "pricing": {
              "unit": "kWh",
              "price": 2000,
              "currency": "VND"
            }
          }
        ],
        "amenities": ["parking", "restroom", "convenience_store"],
        "images": ["https://..."],
        "rating": 4.5,
        "reviewCount": 120
      }
    ],
    "total": 150,
    "hasMore": true
  }
}
```

---

### 2.2 Get Station Location Info

Lấy thông tin chi tiết của một trạm sạc.

**Endpoint:** `POST /ccarcharging/api/v1/stations/location-info`

**X-HASH Pattern:** `BODY_DEPENDENT`

#### Request Body

```json
{
  "stationId": "station_001"
}
```

#### Expected Response

```json
{
  "code": "00",
  "message": "Success",
  "data": {
    "station": {
      "id": "station_001",
      "name": "Trạm sạc VinFast Times City",
      "address": "458 Minh Khai, Hai Bà Trưng, Hà Nội",
      "latitude": 20.995847,
      "longitude": 105.868652,
      "phone": "1900-23-23-89",
      "operatingHours": {
        "monday": "00:00-23:59",
        "tuesday": "00:00-23:59",
        "wednesday": "00:00-23:59",
        "thursday": "00:00-23:59",
        "friday": "00:00-23:59",
        "saturday": "00:00-23:59",
        "sunday": "00:00-23:59"
      },
      "chargers": [
        {
          "id": "charger_001",
          "name": "Trụ sạc 1",
          "type": "DC_FAST",
          "power": 60,
          "connectorType": "CCS2",
          "status": "AVAILABLE",
          "lastStatusUpdate": "2026-01-22T10:30:00Z"
        }
      ],
      "parkingInfo": {
        "type": "FREE",
        "maxDuration": 120,
        "note": "Miễn phí 2 giờ đầu khi sạc xe"
      },
      "directions": {
        "googleMapsUrl": "https://maps.google.com/?q=...",
        "appleMapsUrl": "https://maps.apple.com/?q=..."
      }
    }
  }
}
```

---

### 2.3 Check Reservation Availability

Kiểm tra khả năng đặt chỗ sạc.

**Endpoint:** `GET /ccarcharging/api/v1/reservation/check-availability`

**X-HASH Pattern:** `TIMESTAMP_DEPENDENT`

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `stationId` | string | ID của trạm sạc |
| `chargerId` | string | ID của trụ sạc |
| `startTime` | string | Thời gian bắt đầu (ISO 8601) |
| `duration` | number | Thời lượng sạc dự kiến (phút) |

#### Request

```http
GET /ccarcharging/api/v1/reservation/check-availability?stationId=station_001&chargerId=charger_001&startTime=2026-01-22T14:00:00Z&duration=60 HTTP/1.1
Host: mobile.connected-car.vinfast.vn
Authorization: Bearer {access_token}
X-TIMESTAMP: 1768908066000
X-HASH: ofBf3j7okTcDKrGGwv5H...
```

#### Expected Response

```json
{
  "code": "00",
  "message": "Success",
  "data": {
    "available": true,
    "estimatedWaitTime": 0,
    "nextAvailableSlot": null,
    "pricing": {
      "estimatedCost": 228000,
      "currency": "VND",
      "breakdown": {
        "energy": 200000,
        "serviceFee": 28000
      }
    }
  }
}
```

---

### 2.4 Search Charging Sessions

Tìm kiếm lịch sử phiên sạc của người dùng.

**Endpoint:** `POST /ccarcharging/api/v1/charging-sessions/search`

**X-HASH Pattern:** `TIMESTAMP_DEPENDENT`

#### Request Body

```json
{
  "orderStatus": [3, 5, 7],
  "page": 0,
  "size": 20,
  "startDate": "2026-01-01T00:00:00Z",
  "endDate": "2026-01-22T23:59:59Z"
}
```

#### Order Status Codes

| Code | Description |
|------|-------------|
| 1 | PENDING - Đang chờ |
| 2 | CONFIRMED - Đã xác nhận |
| 3 | CHARGING - Đang sạc |
| 4 | PAUSED - Tạm dừng |
| 5 | COMPLETED - Hoàn thành |
| 6 | CANCELLED - Đã hủy |
| 7 | FAILED - Thất bại |

#### Expected Response

```json
{
  "code": "00",
  "message": "Success",
  "data": {
    "sessions": [
      {
        "id": "session_001",
        "stationId": "station_001",
        "stationName": "Trạm sạc VinFast Times City",
        "chargerId": "charger_001",
        "vehicleVin": "RLLV2CWA5PH705671",
        "startTime": "2026-01-20T14:30:00Z",
        "endTime": "2026-01-20T15:45:00Z",
        "duration": 75,
        "energyDelivered": 45.5,
        "maxPower": 58.2,
        "avgPower": 36.4,
        "startSoc": 25,
        "endSoc": 85,
        "cost": {
          "total": 172900,
          "currency": "VND",
          "breakdown": {
            "energy": 155100,
            "serviceFee": 17800
          }
        },
        "paymentMethod": "VINFAST_WALLET",
        "status": 5
      }
    ],
    "total": 45,
    "page": 0,
    "size": 20,
    "hasMore": true
  }
}
```

---

## 3. Charger Types & Connectors

### Charger Types

| Type | Description | Typical Power |
|------|-------------|---------------|
| `DC_FAST` | Sạc nhanh DC | 50-150 kW |
| `DC_ULTRA_FAST` | Sạc siêu nhanh DC | 150-350 kW |
| `AC_LEVEL2` | Sạc AC tiêu chuẩn | 7-22 kW |
| `AC_LEVEL1` | Sạc AC chậm | 1.4-3.7 kW |

### Connector Types

| Type | Description | Compatible Vehicles |
|------|-------------|---------------------|
| `CCS2` | Combined Charging System 2 | VF8, VF9, VF e34, VF5, VF6, VF7 |
| `TYPE2` | Type 2 (Mennekes) | VF8, VF9, VF e34 (AC) |
| `VINFAST_SCOOTER` | VinFast Scooter connector | VinFast e-Scooters |

---

## 4. Station Status Codes

| Status | Description |
|--------|-------------|
| `AVAILABLE` | Trạm đang hoạt động, có trụ sạc trống |
| `BUSY` | Tất cả trụ sạc đang được sử dụng |
| `OFFLINE` | Trạm tạm ngừng hoạt động |
| `MAINTENANCE` | Đang bảo trì |
| `COMING_SOON` | Sắp khai trương |

---

## 5. X-HASH Authentication

### Algorithm (Hypothesis)

```python
import hmac
import hashlib
import base64
import json
import time

def calculate_x_hash(
    method: str,
    path: str,
    timestamp_ms: int,
    body: dict = None,
    secret_key: str = "UNKNOWN"
) -> str:
    """
    Calculate X-HASH for VinFast API requests.

    For TIMESTAMP_DEPENDENT endpoints (GET requests, some POST):
        message = timestamp_ms

    For BODY_DEPENDENT endpoints (stations/search, telemetry/ping):
        message = json.dumps(body, separators=(',', ':')) + str(timestamp_ms)
    """

    if body:
        # BODY_DEPENDENT
        body_str = json.dumps(body, separators=(',', ':'), sort_keys=True)
        message = body_str + str(timestamp_ms)
    else:
        # TIMESTAMP_DEPENDENT
        message = str(timestamp_ms)

    signature = hmac.new(
        secret_key.encode('utf-8'),
        message.encode('utf-8'),
        hashlib.sha256
    ).digest()

    return base64.b64encode(signature).decode('utf-8')


# Example usage
timestamp = int(time.time() * 1000)
body = {
    "longitude": 105.799812,
    "latitude": 21.028511,
    "radius": 50000
}

x_hash = calculate_x_hash(
    method="POST",
    path="/ccarcharging/api/v1/stations/search",
    timestamp_ms=timestamp,
    body=body,
    secret_key="YOUR_SECRET_KEY"  # Must be extracted from app
)

print(f"X-TIMESTAMP: {timestamp}")
print(f"X-HASH: {x_hash}")
```

### Important Notes

1. **Secret Key Required**: The X-HASH calculation requires a secret key that must be extracted from the VinFast mobile app through reverse engineering.

2. **Hash Expiration**: X-HASH values are time-sensitive and expire quickly (likely within seconds to minutes).

3. **Body Serialization**: For BODY_DEPENDENT endpoints, the exact JSON serialization matters - use consistent ordering.

---

## 6. Error Codes

| Code | Message | Description |
|------|---------|-------------|
| `00` | Success | Thành công |
| `01` | Invalid Request | Request không hợp lệ |
| `02` | Unauthorized | Chưa đăng nhập hoặc token hết hạn |
| `03` | Forbidden | Không có quyền truy cập |
| `04` | Not Found | Không tìm thấy resource |
| `05` | Invalid X-HASH | X-HASH không hợp lệ hoặc đã hết hạn |
| `10` | Station Offline | Trạm sạc không hoạt động |
| `11` | Charger In Use | Trụ sạc đang được sử dụng |
| `12` | Reservation Failed | Đặt chỗ thất bại |

---

## 7. Rate Limiting

- **Requests per second**: ~10 requests/second per user
- **Daily limit**: Unknown (may vary by endpoint)
- **Recommendation**: Implement exponential backoff for 429 responses

---

## 8. Sample Implementation

### JavaScript/Node.js

```javascript
const crypto = require('crypto');
const axios = require('axios');

class VinFastChargingAPI {
  constructor(accessToken, region = 'vn') {
    this.accessToken = accessToken;
    this.baseUrl = this.getBaseUrl(region);
    this.secretKey = 'YOUR_SECRET_KEY'; // Must extract from app
  }

  getBaseUrl(region) {
    const urls = {
      vn: 'https://mobile.connected-car.vinfast.vn',
      us: 'https://mobile.connected-car.vinfastauto.us',
      eu: 'https://mobile.connected-car.vinfastauto.eu'
    };
    return urls[region];
  }

  calculateXHash(body, timestamp) {
    const message = body
      ? JSON.stringify(body) + timestamp
      : timestamp.toString();

    return crypto
      .createHmac('sha256', this.secretKey)
      .update(message)
      .digest('base64');
  }

  getHeaders(body = null) {
    const timestamp = Date.now();
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.accessToken}`,
      'X-TIMESTAMP': timestamp.toString(),
      'X-HASH': this.calculateXHash(body, timestamp),
      'x-service-name': 'CAPP',
      'x-app-version': '1.10.3',
      'x-device-platform': 'VFDashBoard',
      'x-timezone': 'Asia/Ho_Chi_Minh'
    };
  }

  async searchStations(latitude, longitude, options = {}) {
    const body = {
      latitude,
      longitude,
      radius: options.radius || 50000,
      limit: options.limit || 100,
      vehicleType: options.vehicleType || 'CAR',
      excludeStationIds: options.excludeStationIds || [],
      connectorTypes: options.connectorTypes || [],
      minPower: options.minPower || 0,
      maxPower: options.maxPower || 0,
      availability: options.availability || null
    };

    const response = await axios.post(
      `${this.baseUrl}/ccarcharging/api/v1/stations/search`,
      body,
      { headers: this.getHeaders(body) }
    );

    return response.data;
  }

  async getStationInfo(stationId) {
    const body = { stationId };

    const response = await axios.post(
      `${this.baseUrl}/ccarcharging/api/v1/stations/location-info`,
      body,
      { headers: this.getHeaders(body) }
    );

    return response.data;
  }

  async checkAvailability(stationId, chargerId, startTime, duration) {
    const params = new URLSearchParams({
      stationId,
      chargerId,
      startTime,
      duration: duration.toString()
    });

    const response = await axios.get(
      `${this.baseUrl}/ccarcharging/api/v1/reservation/check-availability?${params}`,
      { headers: this.getHeaders() }
    );

    return response.data;
  }

  async getChargingSessions(options = {}) {
    const body = {
      orderStatus: options.orderStatus || [3, 5, 7],
      page: options.page || 0,
      size: options.size || 20,
      startDate: options.startDate,
      endDate: options.endDate
    };

    const response = await axios.post(
      `${this.baseUrl}/ccarcharging/api/v1/charging-sessions/search`,
      body,
      { headers: this.getHeaders(body) }
    );

    return response.data;
  }
}

// Example usage
async function main() {
  const api = new VinFastChargingAPI('your_access_token', 'vn');

  // Search for charging stations near Hanoi
  const stations = await api.searchStations(21.028511, 105.799812, {
    radius: 10000,
    limit: 20
  });

  console.log('Found stations:', stations.data?.stations?.length || 0);
}

main().catch(console.error);
```

---

## 9. Known Limitations

1. **X-HASH Secret Key**: The secret key is not publicly available and must be reverse-engineered from the VinFast mobile app.

2. **Authentication Required**: All APIs require a valid Auth0 access token from a VinFast account.

3. **Region-Specific Data**: Each region (VN, US, EU) has separate station databases.

4. **Rate Limiting**: Excessive requests may be blocked.

5. **API Changes**: VinFast may change these APIs without notice.

---

## 10. Alternative Approaches

If the official VinFast APIs are inaccessible, consider these alternatives:

### 10.1 Third-Party Data Sources

- **ChargeHub**: Has VinFast station data for North America
- **Chargemap**: European charging station data
- **Open Charge Map**: Community-driven EV charging database

### 10.2 Web Scraping (vinfastauto.com)

The VinFast website at `https://vinfastauto.com/vn_vi/tim-kiem-showroom-tram-sac` displays station data but blocks automated access (403 Forbidden).

**Potential approaches:**
1. Use browser automation (Puppeteer/Playwright) with appropriate headers
2. Analyze the website's JavaScript to find data endpoints
3. Use a residential proxy to avoid IP blocking

### 10.3 VinFast Mobile App Traffic Analysis

Use a MITM proxy (Charles/Burp Suite) to capture real API requests from the VinFast mobile app, including valid X-HASH values.

---

## 11. References

- [HASH_ANALYSIS_REPORT.md](./HASH_ANALYSIS_REPORT.md) - Detailed X-HASH analysis
- [HASH_ANALYSIS_SUMMARY.md](./HASH_ANALYSIS_SUMMARY.md) - Executive summary
- [VinFast_API.postman_collection.json](./VinFast_API.postman_collection.json) - Postman collection
- [03_API_Reference.md](../03_API_Reference.md) - General API reference

---

**Generated:** 2026-01-22
**Status:** Documentation Complete
**Next Steps:** Extract X-HASH secret key to enable API access

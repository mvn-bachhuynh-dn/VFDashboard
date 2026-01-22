# Charging Station Lookup Feature Proposal

**Date:** 2026-01-22
**Status:** Proposal
**Author:** VF9 Club Community

---

## 1. Executive Summary

Đề xuất phát triển tính năng tra cứu trạm sạc VinFast cho VFDashboard, cho phép người dùng:
- Tìm kiếm trạm sạc gần vị trí hiện tại
- Xem trạng thái real-time của các trụ sạc
- Lên kế hoạch lộ trình sạc
- Xem lịch sử sạc

---

## 2. Problem Statement

Hiện tại ứng dụng VinFast chính thức là cách duy nhất để tra cứu thông tin trạm sạc. Tuy nhiên:

1. **Trải nghiệm chưa tối ưu**: App mobile không tiện lợi khi lập kế hoạch trên màn hình lớn
2. **Không có API công khai**: VinFast không cung cấp API cho developers
3. **Dữ liệu phân tán**: Thông tin trạm sạc không tích hợp với các công cụ lập kế hoạch khác

---

## 3. Proposed Solution

### 3.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      VFDashboard                            │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Map View  │  │  List View  │  │  Station Details    │ │
│  │  (Leaflet)  │  │  (Search)   │  │  (Real-time Status) │ │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘ │
│         │                │                     │            │
│         └────────────────┼─────────────────────┘            │
│                          │                                  │
│  ┌───────────────────────▼───────────────────────────────┐ │
│  │              Charging Station Store                    │ │
│  │              (Nanostores State)                        │ │
│  └───────────────────────┬───────────────────────────────┘ │
│                          │                                  │
├──────────────────────────┼──────────────────────────────────┤
│                          │                                  │
│  ┌───────────────────────▼───────────────────────────────┐ │
│  │              /api/proxy/ccarcharging/*                │ │
│  │              (Astro Server Proxy)                      │ │
│  └───────────────────────┬───────────────────────────────┘ │
│                          │                                  │
└──────────────────────────┼──────────────────────────────────┘
                           │
                           ▼
┌──────────────────────────────────────────────────────────────┐
│           VinFast Connected Car API                          │
│           mobile.connected-car.vinfast.vn                    │
└──────────────────────────────────────────────────────────────┘
```

### 3.2 Core Features

#### Feature 1: Station Map View
- Interactive map showing all charging stations
- Cluster markers for zoom levels
- Color-coded status (Available/Busy/Offline)
- Distance from current location
- Filter by charger type, power, availability

#### Feature 2: Station List View
- Sortable list by distance, availability, power
- Search by name or address
- Quick status overview
- Expandable details

#### Feature 3: Station Details
- Real-time charger status
- Pricing information
- Operating hours
- Amenities list
- Navigation links (Google Maps, Apple Maps)
- User reviews/ratings

#### Feature 4: Route Planning
- Plan multi-stop trips with charging
- Estimate charging time and cost
- Integration with vehicle's current SOC

#### Feature 5: Charging History
- View past charging sessions
- Statistics (total energy, cost, time)
- Export to CSV

---

## 4. Technical Implementation

### 4.1 New Files Required

```
src/
├── components/
│   ├── ChargingMap.jsx          # Map component with Leaflet
│   ├── StationList.jsx          # List view component
│   ├── StationCard.jsx          # Individual station card
│   ├── StationDetails.jsx       # Detailed station modal
│   ├── ChargingFilters.jsx      # Filter controls
│   └── ChargingHistory.jsx      # History view
├── stores/
│   └── chargingStore.ts         # Charging station state
├── services/
│   └── chargingApi.js           # Charging API wrapper
└── pages/
    ├── charging.astro           # Main charging page
    └── api/
        └── charging/
            ├── search.js        # Station search proxy
            ├── station.js       # Station details proxy
            └── sessions.js      # Charging history proxy
```

### 4.2 Dependencies to Add

```json
{
  "dependencies": {
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1",
    "@react-leaflet/core": "^2.1.0"
  }
}
```

### 4.3 State Management

```typescript
// src/stores/chargingStore.ts
import { atom, computed } from 'nanostores';

export interface ChargingStation {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  distance: number;
  totalPorts: number;
  availablePorts: number;
  status: 'AVAILABLE' | 'BUSY' | 'OFFLINE' | 'MAINTENANCE';
  chargers: Charger[];
}

export interface Charger {
  id: string;
  type: 'DC_FAST' | 'DC_ULTRA_FAST' | 'AC_LEVEL2';
  power: number;
  connectorType: string;
  status: 'AVAILABLE' | 'IN_USE' | 'OFFLINE';
  pricing: {
    unit: string;
    price: number;
    currency: string;
  };
}

// Atoms
export const $stations = atom<ChargingStation[]>([]);
export const $selectedStation = atom<ChargingStation | null>(null);
export const $searchLocation = atom<{lat: number; lng: number} | null>(null);
export const $filters = atom({
  vehicleType: 'CAR',
  minPower: 0,
  availability: null,
  radius: 50000,
});
export const $isLoading = atom(false);
export const $error = atom<string | null>(null);

// Computed
export const $availableStations = computed($stations, (stations) =>
  stations.filter(s => s.status === 'AVAILABLE')
);

export const $stationsByDistance = computed($stations, (stations) =>
  [...stations].sort((a, b) => a.distance - b.distance)
);
```

### 4.4 API Service

```javascript
// src/services/chargingApi.js
export class ChargingAPI {
  constructor(region = 'vn') {
    this.region = region;
  }

  async searchStations(latitude, longitude, options = {}) {
    const response = await fetch('/api/charging/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        latitude,
        longitude,
        radius: options.radius || 50000,
        limit: options.limit || 100,
        vehicleType: options.vehicleType || 'CAR',
        region: this.region,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch stations');
    }

    return response.json();
  }

  async getStationDetails(stationId) {
    const response = await fetch('/api/charging/station', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stationId, region: this.region }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch station details');
    }

    return response.json();
  }

  async getChargingHistory(options = {}) {
    const response = await fetch('/api/charging/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderStatus: options.orderStatus || [3, 5, 7],
        page: options.page || 0,
        size: options.size || 20,
        region: this.region,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch charging history');
    }

    return response.json();
  }
}
```

---

## 5. UI/UX Design

### 5.1 Desktop Layout

```
┌────────────────────────────────────────────────────────────────┐
│  VFDashboard              [Dashboard] [Charging] [Settings]    │
├────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────┐ ┌───────────────────────────┐ │
│ │                              │ │ Filters                   │ │
│ │                              │ │ ┌─────────┐ ┌───────────┐ │ │
│ │                              │ │ │ Car ▼   │ │ DC Fast ▼ │ │ │
│ │                              │ │ └─────────┘ └───────────┘ │ │
│ │        Interactive           │ │ [Available Only] [50km ▼] │ │
│ │           Map                │ ├───────────────────────────┤ │
│ │                              │ │ Nearby Stations           │ │
│ │                              │ │ ┌───────────────────────┐ │ │
│ │                              │ │ │ 🟢 Times City         │ │ │
│ │                              │ │ │    2.5km • 5/8 avail  │ │ │
│ │                              │ │ │    DC 60kW, AC 11kW   │ │ │
│ │                              │ │ └───────────────────────┘ │ │
│ │                              │ │ ┌───────────────────────┐ │ │
│ │                              │ │ │ 🟡 Vincom Center      │ │ │
│ │                              │ │ │    3.1km • 0/4 avail  │ │ │
│ │                              │ │ │    DC 120kW           │ │ │
│ │                              │ │ └───────────────────────┘ │ │
│ │                              │ │ ┌───────────────────────┐ │ │
│ │                              │ │ │ 🔴 Royal City         │ │ │
│ │                              │ │ │    4.2km • Offline    │ │ │
│ │                              │ │ └───────────────────────┘ │ │
│ └──────────────────────────────┘ └───────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

### 5.2 Mobile Layout

```
┌─────────────────────────┐
│ ☰ Charging Stations     │
├─────────────────────────┤
│ [🗺️ Map] [📋 List]     │
├─────────────────────────┤
│                         │
│    Interactive Map      │
│    (Full width)         │
│                         │
├─────────────────────────┤
│ 🟢 Times City    2.5km │
│    5/8 available        │
├─────────────────────────┤
│ 🟡 Vincom        3.1km │
│    All in use           │
├─────────────────────────┤
│ 🔴 Royal City    4.2km │
│    Offline              │
└─────────────────────────┘
```

### 5.3 Color Coding

| Status | Color | Hex |
|--------|-------|-----|
| Available | Green | `#22c55e` |
| Busy (all in use) | Yellow | `#eab308` |
| Offline | Red | `#ef4444` |
| Maintenance | Gray | `#6b7280` |

---

## 6. Blockers & Dependencies

### 6.1 Critical Blocker: X-HASH Secret Key

**Status:** UNRESOLVED

The VinFast API requires an X-HASH header calculated using a secret key embedded in the mobile app. Without this key, the API cannot be accessed.

**Options to resolve:**
1. **Reverse engineer** the VinFast mobile app to extract the secret key
2. **Use proxy capture** to intercept real X-HASH values (manual process)
3. **Wait for official API** (unlikely to happen)
4. **Alternative data source** (ChargeHub, Open Charge Map)

### 6.2 Dependencies

| Dependency | Status | Notes |
|------------|--------|-------|
| X-HASH Secret Key | ❌ Blocked | Critical blocker |
| Auth0 Integration | ✅ Available | Existing in dashboard |
| Map Library | ✅ Available | Leaflet (to add) |
| API Proxy | ✅ Available | Existing Astro proxy |

---

## 7. Implementation Phases

### Phase 1: Infrastructure (Blocked by X-HASH)
- [ ] Extract X-HASH secret key from mobile app
- [ ] Implement X-HASH calculation in proxy
- [ ] Set up API proxy endpoints for charging APIs
- [ ] Create charging store with Nanostores

### Phase 2: Core UI
- [ ] Add Leaflet map component
- [ ] Create station list component
- [ ] Implement station details modal
- [ ] Add filter controls

### Phase 3: Features
- [ ] Real-time status updates (polling)
- [ ] Geolocation integration
- [ ] Charging history view
- [ ] Statistics dashboard

### Phase 4: Advanced
- [ ] Route planning
- [ ] SOC-based recommendations
- [ ] Cost estimation
- [ ] Offline caching

---

## 8. Alternative Solutions

If the X-HASH blocker cannot be resolved:

### Option A: Open Charge Map Integration

Use the free Open Charge Map API as a fallback data source.

```javascript
const OCM_API = 'https://api.openchargemap.io/v3/poi/';

async function searchStations(lat, lng, radius) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lng,
    distance: radius / 1000, // km
    distanceunit: 'km',
    operatorid: 3572, // VinFast operator ID (if registered)
    maxresults: 100,
    compact: true,
    verbose: false,
  });

  const response = await fetch(`${OCM_API}?${params}`);
  return response.json();
}
```

**Pros:**
- Free, no authentication required
- Community-maintained data
- Covers multiple networks

**Cons:**
- May not have all VinFast stations
- No real-time availability
- Data may be outdated

### Option B: Web Scraping

Scrape data from vinfastauto.com using browser automation.

**Pros:**
- Direct VinFast data
- No API authentication needed

**Cons:**
- Fragile (breaks with site changes)
- May violate ToS
- No real-time data
- Rate limiting concerns

---

## 9. Conclusion

Tính năng tra cứu trạm sạc sẽ là một bổ sung giá trị cho VFDashboard, nhưng hiện tại **bị chặn bởi X-HASH authentication**.

**Recommended next steps:**
1. Investigate X-HASH secret key extraction from mobile app
2. If blocked, consider Open Charge Map as alternative
3. Build UI components in parallel (can work with mock data)

---

## 10. References

- [CHARGING_STATION_API.md](./api/CHARGING_STATION_API.md) - API Documentation
- [HASH_ANALYSIS_SUMMARY.md](./api/HASH_ANALYSIS_SUMMARY.md) - X-HASH Analysis
- [Open Charge Map API](https://openchargemap.org/site/develop/api)
- [Leaflet Documentation](https://leafletjs.com/reference.html)

---

**Document Version:** 1.0
**Last Updated:** 2026-01-22

# VinFast X-HASH Analysis Report

**Generated:** 2026-01-20 22:44:40
**Log Files Analyzed:** 2
**Total API Endpoints:** 36
**Endpoints with Multiple Samples:** 27

---

## Executive Summary

This report analyzes X-HASH header patterns across VinFast API logs to determine
the hash generation algorithm.


### Key Findings:

- **TIMESTAMP_DEPENDENT**: 25 endpoints (92.6%)
- **BODY_DEPENDENT**: 2 endpoints (7.4%)

---

## Detailed Analysis by Endpoint


### POST /ccarpayment/api/v3/bills

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 24  
**Unique Hashes:** 16  
**Unique Bodies:** 1  
**Unique Timestamps:** 16  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `QzopI8O7hL4HkvP046BM...` | 1768908066000 | {"bills":[]}... |

| 2 | `JZm36TtAEbCGPaX+Kfn7...` | 1768908105000 | {"bills":[]}... |

| 3 | `auAluUowAos+8DMJKxJm...` | 1768908108000 | {"bills":[]}... |

| 4 | `u+cpWJG5ciraoNevng0j...` | 1768908124000 | {"bills":[]}... |

| 5 | `cIOpz6SH5oEAQu0Uii3J...` | 1768908126000 | {"bills":[]}... |




### GET /ccarreferral/api/v1/capp/vouchers/vf-point

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 14  
**Unique Hashes:** 14  
**Unique Bodies:** 0  
**Unique Timestamps:** 14  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `ymwpN0VLa1WTL1nvNOgA...` | 1768908065000 | Empty |

| 2 | `9qpufQaIM/ynw64scAh0...` | 1768908080000 | Empty |

| 3 | `MCGAnHuK9qr/81zpHEx/...` | 1768908084000 | Empty |

| 4 | `HrvanR2K/hKvJ08g4Bc3...` | 1768908101000 | Empty |

| 5 | `sTiOLIrQKpFjTCExWCdo...` | 1768908105000 | Empty |




### GET /notimgmt/api/v1/notimgmt/users/app/is-unread

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 13  
**Unique Hashes:** 13  
**Unique Bodies:** 0  
**Unique Timestamps:** 13  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `uG1A1u+z7V2S92fpqooQ...` | 1768908058000 | Empty |

| 2 | `/Ds8InVCDnkGDiPE+5fc...` | 1768908065000 | Empty |

| 3 | `gOqFbJB1aTx0a6DIIxFt...` | 1768908080000 | Empty |

| 4 | `nexcIGlSBwFhyO50wKHY...` | 1768908084000 | Empty |

| 5 | `dGenCFTmk+2RLQUyHz4T...` | 1768908100000 | Empty |




### GET /ccarusermgnt/api/v1/auth0/account/profile

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 4  
**Unique Hashes:** 3  
**Unique Bodies:** 0  
**Unique Timestamps:** 3  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `FzPbDoIbxEFiJp9MOpiI...` | 1768908062000 | Empty |

| 2 | `32ik9mD7fqRFBpI1zJQV...` | 1768908143000 | Empty |

| 3 | `32ik9mD7fqRFBpI1zJQV...` | 1768908143000 | Empty |

| 4 | `ntE/2b5lIf2HvY4et4AC...` | 1768923491000 | Empty |




### GET /ccaraccessmgmt/api/v1/c-app/driving-trend/info

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 4  
**Unique Hashes:** 4  
**Unique Bodies:** 0  
**Unique Timestamps:** 4  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `HjmmCI4QRincGqdmc3U9...` | 1768908087000 | Empty |

| 2 | `XnCXsKRcKBgkUWfTQzGV...` | 1768908096000 | Empty |

| 3 | `sDJdEkbLLDI9SYWVtECM...` | 1768923535000 | Empty |

| 4 | `ROs82d2QDYX06pckU7su...` | 1768923539000 | Empty |




### POST /ccaraccessmgmt/api/v1/telemetry/app/ping

**Pattern:** `BODY_DEPENDENT`  
**Samples:** 4  
**Unique Hashes:** 4  
**Unique Bodies:** 4  
**Unique Timestamps:** 4  

🔄 **Hash depends on request body** - Must calculate per request

*Likely algorithm: HMAC(secret + body + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `vZwq++x1vCKFhwBrLODL...` | 1768908115000 | [{"resourceId":"2","objectId":... |

| 2 | `fMBQuSl6OkMpz19RO566...` | 1768908121000 | [{"objectId":"34210","instance... |

| 3 | `6iblMLekrsfXmWch5Ird...` | 1768923523000 | [{"instanceId":"1","resourceId... |

| 4 | `/Lu5I00M9R1Sr6LZjrc1...` | 1768923529000 | [{"objectId":"34210","resource... |




### POST /ccarcharging/api/v1/stations/search

**Pattern:** `BODY_DEPENDENT`  
**Samples:** 3  
**Unique Hashes:** 3  
**Unique Bodies:** 3  
**Unique Timestamps:** 3  

🔄 **Hash depends on request body** - Must calculate per request

*Likely algorithm: HMAC(secret + body + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `VRTN/TqL8bdcFEKO1jUM...` | 1768908070000 | {"longitude":105.799812,"exclu... |

| 2 | `RkcLr4HWW9XyG7HL9ZfU...` | 1768908115000 | {"longitude":105.799812,"latit... |

| 3 | `bcgYKoi06/Gu0tTV3rGX...` | 1768923523000 | {"longitude":105.867317,"exclu... |




### POST /ccarusermgnt/api/v1/user-vehicle/attach-policy

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 1  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `g8rQ1P+b6v6xg4C+1HYs...` | 1768908064000 | {"target":"ap-southeast-1:9380... |

| 2 | `fttDRF7m3J35WP2Tt1vr...` | 1768923493000 | {"target":"ap-southeast-1:9380... |




### PUT /ccarusermgnt/api/v1/device-trust/fcm-token

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 1  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `sOBHEM01nmsfhlT1GDWs...` | 1768908064000 | {"fcmToken":"eYi-A8dPA0Alhcnpo... |

| 2 | `WFgb2nFnhkQMFS2RId1i...` | 1768923493000 | {"fcmToken":"eYi-A8dPA0Alhcnpo... |




### GET /ccar-order-history/api/v1/me/orders

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `/VwkGWQpU4o9FywXjbR+...` | 1768908064000 | Empty |

| 2 | `2VHgi+QfoqiLp+qwRruu...` | 1768923493000 | Empty |




### GET /ccarusermgnt/api/v1/consent/account/list-consent-status

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `qT2QTub9s3bGqTrWJ+2h...` | 1768908064000 | Empty |

| 2 | `M0yRn8A1kgEtbfPto1Qv...` | 1768923493000 | Empty |




### GET /ccarusermgnt/api/v1/user-vehicle

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `DyzUpEykIR8isRjE2A5X...` | 1768908064000 | Empty |

| 2 | `YMJkr1KGE4Zud3XPu8gb...` | 1768923493000 | Empty |




### GET /ccarusermgnt/api/v1/consent/account/list-consent-status/RLLV2CWA5PH705671

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `u/XIvw4UFPGPUij7Dxgh...` | 1768908065000 | Empty |

| 2 | `W5Mrhb7namxG9GCpyeES...` | 1768923494000 | Empty |




### GET /ccarcharging/api/v1/reservation/check-availability

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `ofBf3j7okTcDKrGGwv5H...` | 1768908066000 | Empty |

| 2 | `G0nhHuuSN4r+TDMkL9VF...` | 1768923494000 | Empty |




### GET /ccar-sota/api/v1/capp/package/current-package

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `7/ifJyQ5FdRCox0MB2Ow...` | 1768908066000 | Empty |

| 2 | `GVVPEJPKZOd3wXvQGPYS...` | 1768923494000 | Empty |




### GET /modelmgmt/api/v2/vehicle-model/mobile-app/vehicle/get-alias

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `3RSsNCelbY5cv/uHSjq8...` | 1768908066000 | Empty |

| 2 | `3IbAYLHSPsMsaU5i1Q0K...` | 1768923494000 | Empty |




### GET /vfrsa/api/c-app/rsa/car-services

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `pZATE2WHropFppcBwPLR...` | 1768908066000 | Empty |

| 2 | `X/iIUdaBv/rJhWv1KqKE...` | 1768923494000 | Empty |




### GET /ccarbookingservice/api/v1/c-app/next-maintenance

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `PGURvdzt3AP9XPN29I18...` | 1768908066000 | Empty |

| 2 | `ADP0hyA0GWjWeSW5GmXu...` | 1768923494000 | Empty |




### GET /ccar-diagnostic/api/v1/c-app/telltales/alert-dashboard

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `+rzaWoi9tbqJ0kxyqk1M...` | 1768908067000 | Empty |

| 2 | `Cl9/GYnglXMnIK19B8hB...` | 1768923495000 | Empty |




### GET /ccaresim/api/v2/capp/subscriptions/list

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `DNiBcwhQdSZijhVwSIEj...` | 1768908087000 | Empty |

| 2 | `kuPyFUtKhnEahY94qtGR...` | 1768923539000 | Empty |




### GET /ccaresim/api/v2/capp/qr-code

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `2ITWtrXpwzHm3QpgZwew...` | 1768908087000 | Empty |

| 2 | `a7D+BjNtf93jdxl1Rh28...` | 1768923539000 | Empty |




### GET /ccarusermgnt/api/v1/vehicle/warranty/RLLV2CWA5PH705671

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `/fa1APNJgJAc4bS8hvTE...` | 1768908087000 | Empty |

| 2 | `Mb1Q4dKl+DKRaxhQN1Uh...` | 1768923539000 | Empty |




### GET /ccarusermgnt/api/v1/vehicle/RLLV2CWA5PH705671/license-plate/from-dms

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `sK4S1bWgewjlT/JTZZsy...` | 1768908087000 | Empty |

| 2 | `jJrSrQ0XSjEq7AtXstnF...` | 1768923539000 | Empty |




### POST /ccarcharging/api/v1/charging-sessions/search

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 1  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `aAcwpOcHMk1pFhCnoMCM...` | 1768908118000 | {"orderStatus":[3,5,7]}... |

| 2 | `Ao9E8NrxHmd9C8WFP1hV...` | 1768923525000 | {"orderStatus":[3,5,7]}... |




### GET /ccar-sota/api/v1/capp/payment/payment-history

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `234P3J4TFe+fzbSYfY4p...` | 1768908131000 | Empty |

| 2 | `eaDcUNtyh++DR7gOBh+U...` | 1768923569000 | Empty |




### GET /ccarusermgnt/api/v1/user-vehicle/user-by-vincode/RLLV2CWA5PH705671

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `E50C/mV9s/Ml3lskALza...` | 1768908150000 | Empty |

| 2 | `mx4XzD0vyDKrol6ysm8S...` | 1768908153000 | Empty |




### GET /ccarusermgnt/api/v1/user-vehicle/driver

**Pattern:** `TIMESTAMP_DEPENDENT`  
**Samples:** 2  
**Unique Hashes:** 2  
**Unique Bodies:** 0  
**Unique Timestamps:** 2  

⏰ **Hash depends on timestamp** - Must calculate per request

*Likely algorithm: HMAC(secret + timestamp)*


**Sample Hashes:**

| Sample | X-HASH | Timestamp | Body Preview |

|--------|--------|-----------|-------------|

| 1 | `YCMNtULsHwHAdz0duxWJ...` | 1768908150000 | Empty |

| 2 | `y88rhjrbvvjbSDhpUPgH...` | 1768908154000 | Empty |




---

## Hash Algorithm Hypothesis


Based on the analysis, X-HASH appears to be calculated using:


```python

import hmac

import hashlib

import base64


def calculate_x_hash(request_body: str, timestamp: str, secret_key: str) -> str:

    # Hypothesis: HMAC-SHA256 of concatenated values

    message = request_body + timestamp  # Or some variation

    signature = hmac.new(

        secret_key.encode(),

        message.encode(),

        hashlib.sha256

    ).digest()

    return base64.b64encode(signature).decode()

```


⚠️ **Note:** The actual secret key is unknown and needs to be extracted from the app.


---

## Recommendations


### For Postman Collection:


⚠️ **27 endpoints have DYNAMIC hashes**

   Options:

   1. Capture real-time hashes via proxy (Charles/Burp)

   2. Reverse engineer the secret key from app binary

   3. Implement hash calculation in Postman pre-request script (if secret known)


### For 3rd Party Apps:


To build a working 3rd party app, you MUST:

1. **Extract the secret key** from VinFast app (reverse engineering)

2. **Implement hash calculation** matching the algorithm

3. **Generate X-HASH** per request with current timestamp


# Masar Backend Integration Guide

## 1. Architecture Overview
Masar is a modern Workforce Management Platform built with **Angular 21** and **Tailwind CSS**. It follows a **Signal-based architecture** specifically designed for high performance and real-time operational tracking.

### Core Tech Stack:
- **Frontend**: Angular 21 (Standalone Components)
- **Styling**: Tailwind CSS 4.0
- **State**: Angular Signals
- **Charts**: Chart.js 4.x
- **Maps**: Leaflet 1.9
- **Auth**: JWT Bearer Token + Company-Slug Header

---

## 2. Global Request Configuration
All API requests must include the following headers:
- `Authorization: Bearer <JWT_TOKEN>`
- `x-company-slug: <COMPANY_IDENTIFIER>`
- `Content-Type: application/json`

---

## 3. Core Feature Endpoints

### 3.1 Authentication & Profile
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Authenticate operator/worker. |
| GET | `/auth/profile` | Retrieve current user profile. |
| POST | `/auth/logout` | Revoke session. |

**Request Body (Login):**
```json
{
  "username": "operator_id",
  "password": "secure_password",
  "company_slug": "masar-construction"
}
```

### 3.2 Attendance & FaceID
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/attendance/clock-in` | Record start of shift with GPS and FaceID hash. |
| POST | `/attendance/clock-out` | Record end of shift. |
| GET | `/attendance/history` | List user's recent logs. |

**Request Body (Clock-in):**
```json
{
  "timestamp": "2026-03-17T09:00:00Z",
  "coordinates": { "lat": 30.0444, "lng": 31.2357 },
  "face_token": "hash_from_client_liveness",
  "site_id": "ST-842"
}
```

### 3.3 Task Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | List assigned tasks. |
| PATCH | `/tasks/:id` | Update task status (Pending -> Active -> Completed). |
| POST | `/tasks/:id/media` | Upload Before/After proof photos. |

**Task Response Schema:**
```json
{
  "id": "TSK-101",
  "title": "HVAC Filter Replacement",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "before_photo": "https://cdn.com/b_101.jpg",
  "after_photo": null,
  "assigned_at": "2026-03-17T10:00:00Z"
}
```

### 3.4 Operational Grid (Dashboard)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard/stats` | High-level metrics for managers. |
| GET | `/dashboard/fleet` | Real-time fleet distribution. |
| GET | `/dashboard/map-nodes` | Real-time GPS coordinates of all active assets. |

### 3.5 Finance & Payroll
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/finance/payroll` | Current period earnings and payslip summary. |
| GET | `/finance/bonus-stats` | Performance-based incentives. |

### 3.6 Real-time Communication
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/chat/threads` | List active conversations. |
| GET | `/chat/messages/:thread_id` | Retrieve history. |
| POST | `/chat/send` | Send text/media message. |

---

## 4. Error Codes
The API should return standard HTTP codes:
- `200/201`: Success.
- `401/403`: Auth Failure.
- `422`: Validation Error (e.g., GPS outside allowed site perimeter).
- `500`: System Failure.

---

## 5. Development Timeline
- **Mock Integration**: Completed (Frontend Simulation Active)
- **API Connectivity**: Phase 3 (Next Step)
- **Production Deployment**: Phase 4

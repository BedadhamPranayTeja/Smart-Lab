Here's a **concise “final lock-in” markdown document** summarizing all decisions, stages, and tech choices for your Smart Lab project. You can use it as a reference for PoC → Prototype → MVP → Alpha.

---

# **Smart Lab Project – Final Lock-In**

## **1️⃣ Development Stages**

| Stage               | Timeline                   | Description                                      | Key Components                                                                                                                  |
| ------------------- | -------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| **0.3 – PoC**       | Today                      | Proof-of-concept: simulate attendance & feedback | Wokwi hardware simulation, LED blink, CSV/SQLite backend, FastAPI + Jinja2 SSR dashboard, curated mock dataset, wireframes      |
| **0.6 – Prototype** | Tonight / Tomorrow morning | Web-based prototype with realistic flow          | Next.js frontend (App router), WebAuthn biometric simulation, same API endpoints as PoC, dashboard updates, mock AI/IoT modules |
| **0.9 – MVP**       | Tomorrow (lab class)       | Minimal real hardware integration                | Next.js API routes, ESP32 + fingerprint module, LED / optional IoT triggers, reuse API contracts from Prototype                 |
| **1.2 – Alpha**     | TBD                        | Full Smart Lab Assistant                         | Microservices (FastAPI/Express), NeonDB / Drizzle, AI / object recognition, IoT automation (lights, projector, music)           |
| **1.5 – Beta**      | TBD                        | Scaled and optimized                             | Modular microservices, multi-device integration, robust dashboard & analytics                                                   |
| **1.8 – Prod**      | TBD                        | Production-grade deployment                      | Full Smart Lab with real hardware, AI, IoT, secure APIs                                                                         |
| **2.x – Prod+**     | TBD                        | Extended features / scale                        | Multi-lab integration, advanced analytics, real-time event-driven automation                                                    |

---

## **2️⃣ Tech Stack – Locked In**

**Frontend / Orchestration**

- Next.js (App router)
- React + Shadcn / Radix / Tailwind / Framer Motion
- Zustand (state management)
- TanStack Query (data fetching)

**Backend / API / Microservice**

- FastAPI (PoC / MVP) or Express (optional)
- Jinja2 SSR dashboard for PoC
- Pluggable modules for attendance:
  - Wokwi → PoC
  - WebAuthn → Prototype
  - ESP32 / fingerprint → MVP

**Database / Persistence**

- PoC: CSV / SQLite
- MVP: NeonDB / Drizzle (PostgreSQL)

**DevOps / Deployment**

- Vercel for Next.js
- GitHub Actions for CI/CD

**External APIs / Microservices**

- Attendance module (pluggable)
- AI / camera / object recognition modules (optional)
- IoT automation (lights, projector, music)

---

## **3️⃣ Biometric / Attendance Flow**

**Prototype (WebAuthn)**

1. User authenticates via browser biometric (WebAuthn).
2. Backend verifies assertion → returns uniform JSON.
3. Next.js frontend dashboard logs attendance + simulates LED feedback.

**MVP (ESP32 + Fingerprint)**

1. Fingerprint scan → ESP32 onboard match.
2. ESP32 POSTs student ID to backend.
3. Backend returns **same JSON** as WebAuthn module.
4. Frontend dashboard logs attendance + triggers LED / optional IoT automation.

**API Response Format (Uniform)**

```json
{
  "status": "ok",
  "student_id": "S001",
  "name": "Teja",
  "entry_time": "2025-09-28T12:34:56Z",
  "desk_id": "D1",
  "present": true
}
```

---

## **4️⃣ Minimal Baseline – PoC Requirements**

- Curated mock dataset
- Wireframes / dashboard sketches
- Defined endpoints:

  - `/api/attendance/check-in`
  - `/api/attendance/enroll`
  - `/api/attendance/logs`

- Simulated flow: scan → module → backend → dashboard → LED blink

---

## **5️⃣ Key Principles**

- Frontend is **hardware-agnostic**; only backend modules swap implementations.
- API contracts are **uniform** across PoC → Prototype → MVP → Alpha.
- Backend modules are **pluggable**: WebAuthn, ESP32/fingerprint, or mock.
- Security & privacy: no raw fingerprint images stored or transmitted; use templates or cryptographic assertions.

---

✅ **Ready for Implementation**

- PoC can start **today** with Wokwi simulation + FastAPI + Jinja2 + CSV.
- Prototype follows **WebAuthn** simulation with Next.js.
- MVP integrates **ESP32/fingerprint hardware**, dashboard and API unchanged.

# 🚌 BookMe — Frontend

The user-facing web application for the **BookMe** bus ticket booking platform, built with **React 18**, **Vite**, and **React Router v6**.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Components](#components)
- [Authentication](#authentication)
- [Getting Started](#getting-started)
- [Scripts](#scripts)

---

## Overview

BookMe's frontend provides a smooth and intuitive interface for users to:

- **Search** for available buses by origin, destination, and date
- **Browse** search results and view available buses
- **Select seats** interactively on a seat map
- **Make payments** and confirm bookings
- **View tickets** after a successful booking
- **Manage bookings** — view all past and upcoming reservations
- **Register / Login** with a secure, token-based authentication flow

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI component library |
| **Vite 5** | Fast development build tool |
| **React Router DOM v6** | Client-side routing |
| **Axios** | HTTP client for API calls |
| **React DatePicker** | Date selection for travel search |
| **React DataList Input** | Auto-complete input for city/route selection |
| **date-fns** | Date utility functions |
| **ESLint** | Code quality & linting |

---

## Project Structure

```
Frontend/
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies and scripts
├── .eslintrc.cjs           # ESLint configuration
└── src/
    ├── main.jsx            # React DOM mount point
    ├── App.jsx             # Root component & router definition
    ├── AuthContext.jsx     # Global auth state (Context API)
    ├── index.css           # Global styles
    ├── Auth/
    │   └── AuthRoute.jsx   # Protected route wrapper
    ├── Components/
    │   ├── Header.jsx      # Navigation bar with auth links
    │   ├── Body.jsx        # Background / layout wrapper
    │   ├── List.jsx        # Bus search form (origin, destination, date)
    │   ├── BusList.jsx     # Search results — list of available buses
    │   ├── SeatBooking.jsx # Interactive seat selection UI
    │   ├── Payment.jsx     # Payment confirmation form
    │   ├── Ticket.jsx      # Booking confirmation / e-ticket display
    │   ├── MyBookings.jsx  # User's booking history
    │   ├── Login.jsx       # Login form
    │   ├── Signup.jsx      # Registration form
    │   └── Logout.jsx      # Logout action component
    └── assets/             # Static assets (images, icons)
```

---

## Pages & Routes

| Path | Component | Protected | Description |
|------|-----------|-----------|-------------|
| `/` | `Header` + `Body` + `List` | ✅ | Home page with bus search form |
| `/search-result` | `Header` + `Body` + `BusList` | ✅ | Bus search results |
| `/seat-booking/:busId` | `Header` + `Body` + `SeatBooking` | ✅ | Seat selection for a specific bus |
| `/payment` | `Header` + `Body` + `Payment` | ✅ | Payment confirmation |
| `/ticket` | `Header` + `Body` + `Ticket` | ✅ | Booking confirmation & e-ticket |
| `/Mybooking` | `Header` + `Body` + `MyBookings` | ✅ | User's booking history |
| `/login` | `Header` + `Body` + `Login` | ❌ | Login page |
| `/signup` | `Header` + `Body` + `Signup` | ❌ | Registration page |

> **Protected ✅** — requires user to be logged in; redirects to `/login` if not authenticated.

---

## Components

| Component | Description |
|---|---|
| `Header` | Top navigation bar showing app logo, nav links, and login/logout controls |
| `Body` | Background layout wrapper rendered on all pages |
| `List` | Search form with origin, destination, and date inputs |
| `BusList` | Displays available buses for the searched route with bus details and a "Book" button |
| `SeatBooking` | Visual seat map for a bus; allows selecting/deselecting seats |
| `Payment` | Summary of selected seats and a payment confirmation form |
| `Ticket` | Displays the confirmed e-ticket with trip details, seat info, and booking reference |
| `MyBookings` | Fetches and lists all bookings for the authenticated user |
| `Login` | Email/password login form with error handling |
| `Signup` | Registration form for new users |
| `Logout` | Clears auth state and token on logout |

---

## Authentication

Authentication is handled via **React Context API** (`AuthContext.jsx`):

- On login/signup, the backend returns a **JWT token**.
- The token is stored in `localStorage` and attached to all outgoing API requests via Axios headers.
- `AuthRoute.jsx` wraps protected routes and redirects unauthenticated users to `/login`.
- `AuthContext` provides `user`, `login()`, and `logout()` to all components via the `AuthProvider`.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- The [BookMe Backend](../Backend/README.md) running on `http://localhost:8080`

### Installation

```bash
# 1. Navigate to the Frontend directory
cd Frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**

> Make sure the backend is running before starting the frontend, as it makes API calls to `http://localhost:8080`.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server with hot-reloading |
| `npm run build` | Build the optimized production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code issues |

---

## Related

- ⚙️ [Backend (Node.js + Express)](../Backend/README.md) — The BookMe REST API

# Complete Codebase Walkthrough

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Design Patterns](#architecture--design-patterns)
3. [Project Structure](#project-structure)
4. [Entry Points](#entry-points)
5. [State Management](#state-management)
6. [Routing & Navigation](#routing--navigation)
7. [Service Layer](#service-layer)
8. [Pages & Components](#pages--components)
9. [Data Flow](#data-flow)
10. [Key Design Decisions](#key-design-decisions)

---

## Project Overview

This is a **Single Page Application (SPA)** built with React that simulates a complete bus booking system. The application follows a **component-based architecture** with clear separation of concerns.

### Technology Stack

- **React 18.2.0**: UI library using functional components and hooks
- **React Router DOM 6.20.0**: Client-side routing
- **Tailwind CSS 3.3.6**: Utility-first CSS framework
- **Vite 5.0.8**: Build tool and dev server

---

## Architecture & Design Patterns

### 1. **Component-Based Architecture**

- Each UI element is a reusable component
- Components are organized by feature/purpose
- Promotes reusability and maintainability

### 2. **Separation of Concerns**

- **Presentation Layer**: React components (pages, components)
- **Business Logic Layer**: Services (data operations)
- **State Management Layer**: Context API
- **Routing Layer**: React Router

### 3. **Service-Oriented Architecture (SOA)**

- Data operations abstracted into service files
- Services act as a data access layer
- Makes it easy to replace hardcoded data with API calls later

### 4. **Context Pattern (State Management)**

- Global state management using React Context API
- Avoids prop drilling
- Centralized state for booking flow

### 5. **Container/Presentational Pattern**

- Pages act as containers (manage state, handle logic)
- Components are presentational (display data, handle UI)

---

## Project Structure

```
bus-ticketing-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── Layout.jsx       # Main layout wrapper
│   ├── context/             # State management
│   │   └── BookingContext.jsx
│   ├── pages/               # Page components (routes)
│   │   ├── HomePage.jsx
│   │   ├── SearchDetailsPage.jsx
│   │   ├── SeatSelectionPage.jsx
│   │   ├── PassengerInfoPage.jsx
│   │   ├── ReviewTicketPage.jsx
│   │   └── ViewTicketPage.jsx
│   ├── services/            # Data layer
│   │   ├── cityService.js
│   │   ├── busService.js
│   │   ├── seatService.js
│   │   └── bookingService.js
│   ├── App.jsx              # Root component with routing
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js         # Vite configuration
└── tailwind.config.js     # Tailwind configuration
```

---

## Entry Points

### 1. `index.html`

- Single HTML file that serves as the template
- Contains `<div id="root">` where React mounts
- Vite injects the bundled JavaScript here

### 2. `src/main.jsx`

- **Entry point** of the React application
- Renders the `<App />` component into the DOM
- Wraps app in `<React.StrictMode>` for development warnings

### 3. `src/App.jsx`

- **Root component** that sets up routing
- Wraps everything in `BookingProvider` (Context)
- Defines all routes using React Router

---

## State Management

### Context API Pattern

**File**: `src/context/BookingContext.jsx`

**Why Context API?**

- Built into React (no extra dependencies)
- Perfect for this app's scale
- Avoids prop drilling across 6 pages
- Simpler than Redux for this use case

**What it manages:**

1. `searchParams` - From city, to city, date
2. `selectedBus` - Currently selected bus object
3. `selectedSeats` - Array of selected seat objects
4. `passengerInfo` - Name, email, phone, age
5. `bookingId` - Generated ticket ID

**How it works:**

- `BookingProvider` wraps the entire app
- Provides state and update functions via Context
- Any component can access using `useBooking()` hook
- State persists across route navigation

---

## Routing & Navigation

### React Router Setup

**File**: `src/App.jsx`

**Routes:**

1. `/` → HomePage (search form)
2. `/search` → SearchDetailsPage (bus list)
3. `/seats` → SeatSelectionPage (seat map)
4. `/passenger` → PassengerInfoPage (form)
5. `/review` → ReviewTicketPage (summary)
6. `/ticket` → ViewTicketPage (final ticket)

**Navigation Flow:**

```
Home → Search → Seats → Passenger → Review → Ticket
```

**Route Protection:**

- Each page checks if required data exists
- Redirects to previous page if data missing
- Ensures proper user flow

---

## Service Layer

### Purpose

- Abstracts data operations
- Makes code testable
- Easy to replace with API calls later

### Services:

#### 1. `cityService.js`

- **Purpose**: Manage city data
- **Methods**:
  - `getCities()` - Returns sorted list of cities
  - `cityExists()` - Validates city name

#### 2. `busService.js`

- **Purpose**: Manage bus data and filtering
- **Methods**:
  - `filterBuses(fromCity, toCity, date)` - Filters buses by route
  - `getBusById(busId)` - Gets specific bus details
  - `getAvailableRoutes()` - Returns all available routes

#### 3. `seatService.js`

- **Purpose**: Generate seat layouts
- **Methods**:
  - `generateSeatLayout(totalSeats)` - Creates seat grid
  - `getSeatLayout(busId, totalSeats)` - Gets seats for a bus

#### 4. `bookingService.js`

- **Purpose**: Manage bookings
- **Methods**:
  - `saveBookingDetails(bookingData)` - Saves booking
  - `getBookingDetails(bookingId)` - Retrieves booking
  - `generateTicketId()` - Creates unique ticket ID

---

## Pages & Components

### 1. HomePage (`src/pages/HomePage.jsx`)

**Purpose**: Landing page with search form

**Features:**

- Search form with validation
- Popular routes section
- Smart destination dropdown (shows ✓ for available routes)

**State:**

- Local state for form data
- Local state for validation errors

**Key Functions:**

- `handleChange()` - Updates form state
- `validateForm()` - Validates before submission
- `handleSubmit()` - Navigates to search page

**Validation:**

- Required fields
- Same city check
- Future date validation

---

### 2. SearchDetailsPage (`src/pages/SearchDetailsPage.jsx`)

**Purpose**: Display filtered buses

**Features:**

- Fetches buses using `filterBuses()` service
- Displays each bus as a card
- "Select Seats" button on each card
- Empty state when no buses found

**Data Flow:**

1. Gets `searchParams` from Context
2. Calls `filterBuses()` service
3. Displays results
4. On click, stores bus in Context and navigates

**Key Functions:**

- `handleSelectBus()` - Stores bus and navigates

---

### 3. SeatSelectionPage (`src/pages/SeatSelectionPage.jsx`)

**Purpose**: Interactive seat selection

**Features:**

- Dynamic seat grid (4 seats per row)
- Visual indicators (green/blue/gray)
- Real-time fare calculation
- Multiple seat selection
- Booking summary sidebar

**State:**

- Local state for seat layout
- Local state for selected seat IDs

**Key Functions:**

- `handleSeatClick()` - Toggles seat selection
- `calculateTotalFare()` - Updates total as seats selected
- `handleConfirm()` - Validates and navigates

**Seat States:**

- Available (green) - Can be selected
- Selected (blue) - Currently selected
- Booked (gray) - Already taken

---

### 4. PassengerInfoPage (`src/pages/PassengerInfoPage.jsx`)

**Purpose**: Collect passenger details

**Features:**

- Form with comprehensive validation
- Real-time error messages
- Pre-fills from Context if available

**Validation Rules:**

- Name: Required, min 2 chars, letters only
- Email: Required, valid format
- Phone: Required, exactly 10 digits
- Age: Required, 1-120

**Key Functions:**

- `handleChange()` - Updates form and clears errors
- `validateForm()` - Comprehensive validation
- `handleSubmit()` - Saves to Context and navigates

---

### 5. ReviewTicketPage (`src/pages/ReviewTicketPage.jsx`)

**Purpose**: Show booking summary

**Features:**

- Displays all booking details
- Breakdown of costs
- Option to edit (back button)
- "Confirm Booking" button

**Data Sources:**

- All data from Context
- Calculates total fare

---

### 6. ViewTicketPage (`src/pages/ViewTicketPage.jsx`)

**Purpose**: Display final ticket

**Features:**

- Generates ticket ID on load
- Saves booking to service
- Print-friendly design
- Options to book again or print

**Key Functions:**

- Generates ticket ID using `generateTicketId()`
- Saves booking using `saveBookingDetails()`
- Stores booking ID in Context

---

## Data Flow

### Complete User Journey:

1. **Home Page**

   - User fills search form
   - Form validated
   - `updateSearchParams()` called → stored in Context
   - Navigate to `/search`

2. **Search Page**

   - Reads `searchParams` from Context
   - Calls `filterBuses()` service
   - Displays results
   - User clicks "Select Seats"
   - `selectBus()` called → stored in Context
   - Navigate to `/seats`

3. **Seat Selection**

   - Reads `selectedBus` from Context
   - Generates seat layout
   - User selects seats
   - `updateSelectedSeats()` called → stored in Context
   - Navigate to `/passenger`

4. **Passenger Info**

   - Reads `selectedSeats` from Context (for validation)
   - User fills form
   - Form validated
   - `updatePassengerInfo()` called → stored in Context
   - Navigate to `/review`

5. **Review Page**

   - Reads all data from Context
   - Displays summary
   - User confirms
   - Navigate to `/ticket`

6. **Ticket Page**
   - Reads all data from Context
   - Generates ticket ID
   - Saves booking to service
   - Displays final ticket

---

## Key Design Decisions

### 1. **Why Context API over Redux?**

- Smaller learning curve
- No extra dependencies
- Sufficient for this app's complexity
- Built into React

### 2. **Why Service Layer?**

- Separation of concerns
- Easy to test
- Easy to replace with API calls
- Reusable data operations

### 3. **Why Separate Pages?**

- Each page has distinct responsibility
- Easier to maintain
- Better code organization
- Clear user flow

### 4. **Why Tailwind CSS?**

- Utility-first approach
- Faster development
- Consistent design
- Responsive by default

### 5. **Why Vite?**

- Faster than Create React App
- Better development experience
- Modern build tool
- Optimized production builds

---

## Interview Preparation Points

### Architecture Questions:

**Q: Why did you choose Context API?**
A: For this application's scale, Context API provides sufficient state management without the complexity of Redux. It's built into React, keeps bundle size small, and follows React's recommended patterns for component-level state sharing.

**Q: How do you handle state across pages?**
A: I use Context API with a BookingProvider that wraps the entire app. The context manages search parameters, selected bus, seats, passenger info, and booking ID. Each page can access and update this state using the useBooking hook.

**Q: How is your code organized?**
A: I follow a modular structure with clear separation:

- Pages for route components
- Services for data operations
- Context for state management
- Components for reusable UI

**Q: How would you scale this application?**
A: I would:

1. Replace service layer with API calls
2. Add Redux/Zustand if state becomes complex
3. Implement proper authentication
4. Add error boundaries
5. Implement caching strategies
6. Add unit and integration tests

**Q: How do you handle errors?**
A: I implement:

- Navigation guards to prevent invalid routes
- Form validation with clear error messages
- Empty states when no data is found
- Route protection to redirect if data is missing

---

## Code Patterns Used

1. **Custom Hooks Pattern**: `useBooking()` hook for Context access
2. **Service Pattern**: Abstracted data operations
3. **Container/Presentational**: Pages manage state, components display
4. **Controlled Components**: All form inputs are controlled
5. **Lifting State Up**: State lifted to Context for sharing
6. **Composition**: Components composed together (Layout wraps pages)

---

This walkthrough covers the entire codebase. Study each section and you'll be well-prepared for interviews!

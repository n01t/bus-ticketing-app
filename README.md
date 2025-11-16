# Bus Ticketing Website

A modern, responsive bus ticketing website built with React.js. This application simulates a complete bus booking flow from searching for buses to generating a final ticket.

## 🌐 Live Demo

**[View Live Application](https://bus-ticketing-app.vercel.app)**

## Overview

This project implements a full-stack frontend application for bus ticket booking. Users can search for buses between cities, select seats, enter passenger details, review their booking, and receive a confirmation ticket. All data is hardcoded as per the assignment requirements.

## Tech Stack

- React 18.2.0
- React Router DOM 6.20.0
- Tailwind CSS 3.3.6
- Vite 5.0.8

## Design and Architecture

### State Management

I chose Context API for state management in this project. Here's my reasoning:

1. **Project Scale**: For an application of this size, Context API provides sufficient state management without adding unnecessary complexity that comes with libraries like Redux.

2. **No Additional Dependencies**: Context API is built into React, which keeps the bundle size smaller and reduces external dependencies.

3. **Simplicity**: It's easier to understand and maintain, especially for someone reviewing the code. The state flow is straightforward and doesn't require learning additional concepts.

4. **React Best Practices**: Context API follows React's recommended patterns for sharing state across components without prop drilling.

The BookingContext manages all booking-related state including search parameters, selected bus, seats, passenger information, and booking ID.

### Code Organization

The project follows a modular structure:

- **Pages**: Each route has its own component in the `pages/` directory
- **Services**: Data management is separated into service files for cities, buses, seats, and bookings
- **Context**: State management is handled through Context API
- **Components**: Reusable components like Layout are in the `components/` directory

This separation makes the codebase easier to navigate and maintain.

## Project Structure

```
src/
├── components/
│   └── Layout.jsx
├── context/
│   └── BookingContext.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── SearchDetailsPage.jsx
│   ├── SeatSelectionPage.jsx
│   ├── PassengerInfoPage.jsx
│   ├── ReviewTicketPage.jsx
│   └── ViewTicketPage.jsx
├── services/
│   ├── cityService.js
│   ├── busService.js
│   ├── seatService.js
│   └── bookingService.js
├── App.jsx
├── main.jsx
└── index.css
```

## Dummy Data

### Cities

The application includes 20 cities: Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Surat, Lucknow, Kanpur, Nagpur, Indore, Thane, Bhopal, Visakhapatnam, Patna, Vadodara, Ghaziabad.

### Buses

I've created 21 buses covering various routes:

- Mumbai ↔ Delhi (3 buses)
- Mumbai ↔ Bangalore (2 buses)
- Delhi → Mumbai (1 bus)
- Delhi → Pune (1 bus)
- Delhi → Bangalore (2 buses)
- Bangalore → Mumbai (1 bus)
- Bangalore → Delhi (1 bus)
- Bangalore ↔ Chennai (2 buses)
- Chennai → Mumbai (1 bus)
- Pune → Mumbai (2 buses)
- Hyderabad → Bangalore (1 bus)
- Hyderabad → Mumbai (1 bus)
- Kolkata → Delhi (1 bus)
- Kolkata → Mumbai (1 bus)

Each bus includes details like operator name, departure/arrival times, duration, fare, bus type (AC Sleeper, AC Semi-Sleeper, Non-AC Sleeper), seat availability, and amenities.

### Seat Layout

Seats are dynamically generated based on bus capacity. The layout follows a 4-seat-per-row format (A, B on left, C, D on right). Seat availability is randomly generated for demonstration purposes.

## Setup and Installation

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/n01t/bus-ticketing-app.git
   cd bus-ticketing-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

This creates a production build in the `dist` directory.

## Features

### Home Page

Search form with validation for source city, destination city, and journey date. Includes a popular routes section to help users find available buses quickly.

### Search Details Page

Displays available buses in card format with all relevant information. Each card has a "Select Seats" button to proceed with booking.

### Seat Selection Page

Interactive seat map where users can select multiple seats. The total fare is calculated in real-time as seats are selected. Visual indicators show available (green), selected (blue), and booked (gray) seats.

### Passenger Information Page

Form to collect passenger details with comprehensive validation:

- Name: Required, minimum 2 characters, letters only
- Email: Required, valid email format
- Phone: Required, exactly 10 digits
- Age: Required, between 1-120

### Review Ticket Page

Complete summary of the booking including route, bus details, selected seats, passenger information, and total fare. Users can review everything before confirming.

### View Ticket Page

Final ticket display with a randomly generated ticket ID. All booking and passenger details are shown in a print-friendly format.

## Error Handling

The application handles various edge cases:

- Navigation guards prevent access to pages without required data
- Form validation with clear error messages
- Empty states when no buses are found for a route
- Route protection redirects users if required data is missing

## Responsive Design

The application is fully responsive and works on desktop, tablet, and mobile devices. Tailwind CSS utility classes ensure consistent styling across all screen sizes.

## Notes

- All data is hardcoded as per assignment requirements
- Seat availability is randomly generated for demonstration
- Booking data is stored in-memory and resets on page refresh
- Ticket IDs are randomly generated in the format `TKT-XXXXXXXX`

---

This project was created as part of a frontend assignment to demonstrate React.js skills and best practices.

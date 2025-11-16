# Bus Ticketing Website

A modern, responsive bus ticketing website built with React.js that simulates an end-to-end bus booking flow, from searching for buses to generating a final ticket.

## 🚀 Features

- **Home Page**: Elegant search form to select source city, destination city, and journey date
- **Search Results**: Displays available buses with detailed information in visually distinct cards
- **Seat Selection**: Interactive seat layout with real-time fare calculation
- **Passenger Information**: Robust form validation for collecting passenger details
- **Review Booking**: Comprehensive summary of all booking details
- **View Ticket**: Final ticket with randomly generated ticket ID

## 🛠️ Tech Stack

- **React 18.2.0**: Modern React with functional components and hooks
- **React Router DOM 6.20.0**: Client-side routing
- **Tailwind CSS 3.3.6**: Utility-first CSS framework for styling
- **Vite 5.0.8**: Fast build tool and development server

## 📁 Project Structure

```
bus-ticketing-app/
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Main layout component with navigation
│   ├── context/
│   │   └── BookingContext.jsx  # Context API for state management
│   ├── pages/
│   │   ├── HomePage.jsx        # Landing page with search form
│   │   ├── SearchDetailsPage.jsx  # Bus listing page
│   │   ├── SeatSelectionPage.jsx  # Seat selection with interactive layout
│   │   ├── PassengerInfoPage.jsx  # Passenger information form
│   │   ├── ReviewTicketPage.jsx   # Booking review page
│   │   └── ViewTicketPage.jsx      # Final ticket display
│   ├── services/
│   │   ├── cityService.js      # City data management
│   │   ├── busService.js       # Bus data and filtering
│   │   ├── seatService.js      # Seat layout generation
│   │   └── bookingService.js   # Booking data management
│   ├── App.jsx                 # Main app component with routing
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles with Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🏗️ Architecture & Design Decisions

### State Management: Context API

I chose **Context API** over other state management solutions (Redux, Zustand) for the following reasons:

1. **Appropriate Scale**: For this application size, Context API provides sufficient state management without unnecessary complexity
2. **Built-in Solution**: No additional dependencies required, keeping the bundle size smaller
3. **Simplicity**: Easier to understand and maintain for a project of this scope
4. **React Native Pattern**: Follows React's recommended patterns for component-level state sharing

The `BookingContext` manages:
- Search parameters (from city, to city, date)
- Selected bus details
- Selected seats
- Passenger information
- Booking ID

### Code Organization

- **Modular Components**: Each page is a separate component for better maintainability
- **Service Layer**: All data operations are abstracted into service files
- **Separation of Concerns**: Clear separation between UI components, business logic, and data management
- **Reusable Patterns**: Consistent error handling and validation across forms

## 📊 Dummy Data

### Cities (20 cities)
Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad, Jaipur, Surat, Lucknow, Kanpur, Nagpur, Indore, Thane, Bhopal, Visakhapatnam, Patna, Vadodara, Ghaziabad

### Buses (21 buses)
Each bus includes:
- Unique bus ID
- Bus name and operator
- Route (from → to)
- Departure and arrival times
- Duration
- Fare per seat
- Bus type (AC Sleeper, AC Semi-Sleeper, Non-AC Sleeper)
- Total and available seats
- Amenities (AC, WiFi, Charging Point, Blanket, Water Bottle, Snacks)

**Available Routes:**
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

### Seat Layout
- Dynamic generation based on bus capacity
- 4 seats per row (2 on each side: A, B, C, D)
- Random availability (80% chance of being available)
- Visual indicators for available, selected, and booked seats

## 🚦 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Bus Ticketing App"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎨 Features in Detail

### 1. Home Page
- Clean, modern design with gradient background
- Form validation for:
  - Required fields
  - Source and destination cannot be the same
  - Date must be in the future
- Responsive layout for all screen sizes

### 2. Search Details Page
- Displays filtered buses based on search criteria
- Each bus card shows:
  - Bus name, operator, and type
  - Departure and arrival times
  - Duration and fare
  - Available seats count
  - Amenities badges
- Handles empty state when no buses are found

### 3. Seat Selection Page
- Interactive seat map with visual indicators:
  - Green: Available seats
  - Blue: Selected seats
  - Gray: Booked seats
- Real-time fare calculation as seats are selected
- Seat numbers and row indicators
- Booking summary sidebar with total fare

### 4. Passenger Information Page
- Comprehensive form validation:
  - Name: Required, min 2 characters, letters only
  - Email: Required, valid email format
  - Phone: Required, exactly 10 digits
  - Age: Required, between 1-120
- Real-time error messages
- User-friendly error handling

### 5. Review Ticket Page
- Complete booking summary:
  - Journey details
  - Bus information
  - Selected seats
  - Passenger information
  - Total fare
- Option to edit details before confirmation

### 6. View Ticket Page
- Beautifully formatted ticket with:
  - Randomly generated ticket ID (format: TKT-XXXXXXXX)
  - All booking and passenger details
  - Print-friendly design
- Options to book another ticket or print

## 🎯 Error Handling

The application includes comprehensive error handling:

1. **Navigation Guards**: Prevents access to pages without required data
2. **Form Validation**: Client-side validation with clear error messages
3. **Empty States**: User-friendly messages when no data is available
4. **Route Protection**: Redirects users to appropriate pages if required data is missing

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Best Practices Implemented

1. **Modern React Patterns**: Functional components with hooks
2. **Code Reusability**: Shared components and utilities
3. **Consistent Naming**: Clear, descriptive variable and function names
4. **Error Boundaries**: Proper error handling throughout
5. **Accessibility**: Semantic HTML and proper form labels
6. **Performance**: Optimized re-renders with proper dependency arrays

## 📝 Notes

- All data is hardcoded as per assignment requirements
- Seat availability is randomly generated for demonstration
- Booking data is stored in-memory (resets on page refresh)
- Ticket IDs are randomly generated in the format `TKT-XXXXXXXX`

## 🚀 Deployment

To deploy this application:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - **Vercel**: Connect your GitHub repo or upload the `dist` folder
   - **Netlify**: Drag and drop the `dist` folder or connect via Git
   - **GitHub Pages**: Use the `dist` folder with GitHub Actions

### Vercel Deployment
```bash
npm install -g vercel
vercel
```

### Netlify Deployment
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## 📄 License

This project is created for educational/assignment purposes.

## 👤 Author

Created as part of a frontend assignment demonstrating React.js skills and best practices.

---

**Note**: This application is a simulation and does not process real payments or bookings. All data is hardcoded for demonstration purposes.


// Hardcoded bus data
const buses = [
  {
    id: 'BUS001',
    name: 'Luxury Express',
    operator: 'GreenLine Travels',
    from: 'Mumbai',
    to: 'Delhi',
    departureTime: '08:00',
    arrivalTime: '20:00',
    duration: '12h 00m',
    fare: 1200,
    busType: 'AC Sleeper',
    totalSeats: 40,
    availableSeats: 35,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Water Bottle'],
  },
  {
    id: 'BUS002',
    name: 'Comfort Plus',
    operator: 'RedBus Services',
    from: 'Mumbai',
    to: 'Delhi',
    departureTime: '10:30',
    arrivalTime: '22:30',
    duration: '12h 00m',
    fare: 1000,
    busType: 'AC Semi-Sleeper',
    totalSeats: 45,
    availableSeats: 42,
    amenities: ['AC', 'WiFi', 'Charging Point'],
  },
  {
    id: 'BUS003',
    name: 'Economy Express',
    operator: 'BlueLine Transport',
    from: 'Mumbai',
    to: 'Delhi',
    departureTime: '14:00',
    arrivalTime: '02:00',
    duration: '12h 00m',
    fare: 800,
    busType: 'Non-AC Sleeper',
    totalSeats: 50,
    availableSeats: 48,
    amenities: ['Charging Point', 'Water Bottle'],
  },
  {
    id: 'BUS004',
    name: 'Premium Deluxe',
    operator: 'Golden Wheels',
    from: 'Mumbai',
    to: 'Bangalore',
    departureTime: '09:00',
    arrivalTime: '21:00',
    duration: '12h 00m',
    fare: 1500,
    busType: 'AC Sleeper',
    totalSeats: 40,
    availableSeats: 30,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Water Bottle', 'Snacks'],
  },
  {
    id: 'BUS005',
    name: 'City Connect',
    operator: 'Metro Travels',
    from: 'Mumbai',
    to: 'Bangalore',
    departureTime: '11:00',
    arrivalTime: '23:00',
    duration: '12h 00m',
    fare: 1100,
    busType: 'AC Semi-Sleeper',
    totalSeats: 45,
    availableSeats: 40,
    amenities: ['AC', 'WiFi', 'Charging Point'],
  },
  {
    id: 'BUS006',
    name: 'Express Line',
    operator: 'Swift Transport',
    from: 'Delhi',
    to: 'Mumbai',
    departureTime: '08:30',
    arrivalTime: '20:30',
    duration: '12h 00m',
    fare: 1200,
    busType: 'AC Sleeper',
    totalSeats: 40,
    availableSeats: 38,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket'],
  },
  {
    id: 'BUS007',
    name: 'Comfort Ride',
    operator: 'Happy Journey',
    from: 'Delhi',
    to: 'Bangalore',
    departureTime: '10:00',
    arrivalTime: '22:00',
    duration: '12h 00m',
    fare: 1300,
    busType: 'AC Sleeper',
    totalSeats: 40,
    availableSeats: 32,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Water Bottle'],
  },
  {
    id: 'BUS008',
    name: 'Budget Express',
    operator: 'Economy Travels',
    from: 'Delhi',
    to: 'Bangalore',
    departureTime: '15:00',
    arrivalTime: '03:00',
    duration: '12h 00m',
    fare: 900,
    busType: 'Non-AC Sleeper',
    totalSeats: 50,
    availableSeats: 45,
    amenities: ['Charging Point'],
  },
  {
    id: 'BUS009',
    name: 'Royal Class',
    operator: 'Premium Buses',
    from: 'Bangalore',
    to: 'Chennai',
    departureTime: '07:00',
    arrivalTime: '13:00',
    duration: '6h 00m',
    fare: 800,
    busType: 'AC Semi-Sleeper',
    totalSeats: 45,
    availableSeats: 40,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Water Bottle'],
  },
  {
    id: 'BUS010',
    name: 'Fast Track',
    operator: 'Speed Travels',
    from: 'Bangalore',
    to: 'Chennai',
    departureTime: '09:30',
    arrivalTime: '15:30',
    duration: '6h 00m',
    fare: 700,
    busType: 'Non-AC Semi-Sleeper',
    totalSeats: 50,
    availableSeats: 48,
    amenities: ['Charging Point'],
  },
  {
    id: 'BUS011',
    name: 'Luxury Express',
    operator: 'GreenLine Travels',
    from: 'Pune',
    to: 'Mumbai',
    departureTime: '08:00',
    arrivalTime: '11:00',
    duration: '3h 00m',
    fare: 500,
    busType: 'AC Semi-Sleeper',
    totalSeats: 45,
    availableSeats: 42,
    amenities: ['AC', 'WiFi', 'Charging Point'],
  },
  {
    id: 'BUS012',
    name: 'City Express',
    operator: 'Urban Transport',
    from: 'Pune',
    to: 'Mumbai',
    departureTime: '10:00',
    arrivalTime: '13:00',
    duration: '3h 00m',
    fare: 400,
    busType: 'Non-AC Semi-Sleeper',
    totalSeats: 50,
    availableSeats: 47,
    amenities: ['Charging Point'],
  },
  {
    id: 'BUS013',
    name: 'Express Deluxe',
    operator: 'Fast Track Travels',
    from: 'Delhi',
    to: 'Pune',
    departureTime: '09:00',
    arrivalTime: '21:00',
    duration: '12h 00m',
    fare: 1100,
    busType: 'AC Sleeper',
    totalSeats: 40,
    availableSeats: 38,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket'],
  },
  {
    id: 'BUS014',
    name: 'Comfort Express',
    operator: 'Reliable Transport',
    from: 'Bangalore',
    to: 'Mumbai',
    departureTime: '08:00',
    arrivalTime: '20:00',
    duration: '12h 00m',
    fare: 1300,
    busType: 'AC Sleeper',
    totalSeats: 40,
    availableSeats: 35,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Water Bottle'],
  },
  {
    id: 'BUS015',
    name: 'City Link',
    operator: 'Metro Express',
    from: 'Bangalore',
    to: 'Delhi',
    departureTime: '10:00',
    arrivalTime: '22:00',
    duration: '12h 00m',
    fare: 1400,
    busType: 'AC Sleeper',
    totalSeats: 40,
    availableSeats: 32,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Water Bottle', 'Snacks'],
  },
  {
    id: 'BUS016',
    name: 'Royal Express',
    operator: 'Premium Travels',
    from: 'Chennai',
    to: 'Bangalore',
    departureTime: '08:00',
    arrivalTime: '14:00',
    duration: '6h 00m',
    fare: 750,
    busType: 'AC Semi-Sleeper',
    totalSeats: 45,
    availableSeats: 42,
    amenities: ['AC', 'WiFi', 'Charging Point'],
  },
  {
    id: 'BUS017',
    name: 'Swift Connect',
    operator: 'Quick Travels',
    from: 'Chennai',
    to: 'Mumbai',
    departureTime: '09:00',
    arrivalTime: '21:00',
    duration: '12h 00m',
    fare: 1200,
    busType: 'AC Sleeper',
    totalSeats: 40,
    availableSeats: 36,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket'],
  },
  {
    id: 'BUS018',
    name: 'Economy Plus',
    operator: 'Budget Travels',
    from: 'Hyderabad',
    to: 'Bangalore',
    departureTime: '08:30',
    arrivalTime: '14:30',
    duration: '6h 00m',
    fare: 650,
    busType: 'AC Semi-Sleeper',
    totalSeats: 45,
    availableSeats: 40,
    amenities: ['AC', 'WiFi', 'Charging Point'],
  },
  {
    id: 'BUS019',
    name: 'Luxury Line',
    operator: 'Elite Transport',
    from: 'Hyderabad',
    to: 'Mumbai',
    departureTime: '10:00',
    arrivalTime: '22:00',
    duration: '12h 00m',
    fare: 1250,
    busType: 'AC Sleeper',
    totalSeats: 40,
    availableSeats: 34,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Water Bottle'],
  },
  {
    id: 'BUS020',
    name: 'City Express',
    operator: 'Urban Connect',
    from: 'Kolkata',
    to: 'Delhi',
    departureTime: '08:00',
    arrivalTime: '20:00',
    duration: '12h 00m',
    fare: 1100,
    busType: 'AC Sleeper',
    totalSeats: 40,
    availableSeats: 37,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket'],
  },
  {
    id: 'BUS021',
    name: 'Comfort Ride',
    operator: 'Smooth Travels',
    from: 'Kolkata',
    to: 'Mumbai',
    departureTime: '09:00',
    arrivalTime: '21:00',
    duration: '12h 00m',
    fare: 1300,
    busType: 'AC Sleeper',
    totalSeats: 40,
    availableSeats: 33,
    amenities: ['AC', 'WiFi', 'Charging Point', 'Blanket', 'Water Bottle'],
  },
]

/**
 * Filter buses based on from city, to city, and date
 * @param {string} fromCity - Source city
 * @param {string} toCity - Destination city
 * @param {string} date - Journey date (YYYY-MM-DD format)
 * @returns {Array} Filtered array of buses
 */
export const filterBuses = (fromCity, toCity, date) => {
  if (!fromCity || !toCity || !date) {
    return []
  }

  // Filter buses by route
  const filteredBuses = buses.filter(
    (bus) => bus.from.toLowerCase() === fromCity.toLowerCase() &&
             bus.to.toLowerCase() === toCity.toLowerCase()
  )

  // In a real app, you'd also filter by date availability
  // For this assignment, we'll return all buses for the route
  return filteredBuses.map(bus => ({
    ...bus,
    date, // Add the selected date to each bus
  }))
}

/**
 * Get bus details by ID
 * @param {string} busId - Bus ID
 * @returns {Object|null} Bus object or null if not found
 */
export const getBusById = (busId) => {
  return buses.find(bus => bus.id === busId) || null
}

/**
 * Get all available routes (unique from-to combinations)
 * @returns {Array} Array of route objects with from and to cities
 */
export const getAvailableRoutes = () => {
  const routes = new Map()
  buses.forEach(bus => {
    const key = `${bus.from}-${bus.to}`
    if (!routes.has(key)) {
      routes.set(key, {
        from: bus.from,
        to: bus.to,
        count: 0,
      })
    }
    routes.get(key).count++
  })
  return Array.from(routes.values())
}


// In-memory storage for bookings (in a real app, this would be a database)
let bookings = []

/**
 * Save booking details
 * @param {Object} bookingData - Booking information
 * @returns {string} Booking ID
 */
export const saveBookingDetails = (bookingData) => {
  const bookingId = generateTicketId()
  const booking = {
    id: bookingId,
    ...bookingData,
    bookingDate: new Date().toISOString(),
  }
  bookings.push(booking)
  return bookingId
}

/**
 * Get booking details by ID
 * @param {string} bookingId - Booking ID
 * @returns {Object|null} Booking object or null if not found
 */
export const getBookingDetails = (bookingId) => {
  return bookings.find(booking => booking.id === bookingId) || null
}

/**
 * Get all bookings
 * @returns {Array} Array of all bookings
 */
export const getAllBookings = () => {
  return [...bookings]
}

/**
 * Generate a random ticket ID
 * @returns {string} Ticket ID in format TKT-XXXXXXXX
 */
export const generateTicketId = () => {
  const randomNum = Math.floor(Math.random() * 100000000)
  return `TKT-${randomNum.toString().padStart(8, '0')}`
}


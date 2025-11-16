/**
 * Generate seat layout for a bus
 * @param {number} totalSeats - Total number of seats in the bus
 * @returns {Array} Array of seat objects with row, column, and seat number
 */
export const generateSeatLayout = (totalSeats) => {
  const seats = []
  const seatsPerRow = 4 // 2 seats on each side
  const rows = Math.ceil(totalSeats / seatsPerRow)

  let seatNumber = 1

  for (let row = 1; row <= rows; row++) {
    // Left side seats (A, B)
    seats.push({
      id: `${row}A`,
      seatNumber: seatNumber++,
      row,
      column: 'A',
      isAvailable: Math.random() > 0.2, // 80% chance of being available
      isSelected: false,
    })

    if (seatNumber > totalSeats) break

    seats.push({
      id: `${row}B`,
      seatNumber: seatNumber++,
      row,
      column: 'B',
      isAvailable: Math.random() > 0.2,
      isSelected: false,
    })

    if (seatNumber > totalSeats) break

    // Right side seats (C, D)
    seats.push({
      id: `${row}C`,
      seatNumber: seatNumber++,
      row,
      column: 'C',
      isAvailable: Math.random() > 0.2,
      isSelected: false,
    })

    if (seatNumber > totalSeats) break

    seats.push({
      id: `${row}D`,
      seatNumber: seatNumber++,
      row,
      column: 'D',
      isAvailable: Math.random() > 0.2,
      isSelected: false,
    })

    if (seatNumber > totalSeats) break
  }

  return seats
}

/**
 * Get seat layout for a specific bus
 * @param {string} busId - Bus ID
 * @param {number} totalSeats - Total seats in the bus
 * @returns {Array} Array of seat objects
 */
export const getSeatLayout = (busId, totalSeats) => {
  // In a real app, this would fetch from a database
  // For this assignment, we'll generate it dynamically
  return generateSeatLayout(totalSeats)
}


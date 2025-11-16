import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { getSeatLayout } from '../services/seatService'

const SeatSelectionPage = () => {
  const navigate = useNavigate()
  const { selectedBus, updateSelectedSeats } = useBooking()
  const [seats, setSeats] = useState([])
  const [selectedSeatIds, setSelectedSeatIds] = useState([])

  useEffect(() => {
    if (!selectedBus) {
      navigate('/search')
      return
    }

    // Generate seat layout for the selected bus
    const seatLayout = getSeatLayout(selectedBus.id, selectedBus.totalSeats)
    setSeats(seatLayout)
  }, [selectedBus, navigate])

  const handleSeatClick = (seatId) => {
    const seat = seats.find(s => s.id === seatId)
    if (!seat || !seat.isAvailable) return

    setSelectedSeatIds(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId)
      } else {
        return [...prev, seatId]
      }
    })
  }

  useEffect(() => {
    const selectedSeatsData = seats.filter(seat =>
      selectedSeatIds.includes(seat.id)
    )
    updateSelectedSeats(selectedSeatsData)
  }, [selectedSeatIds, seats, updateSelectedSeats])

  const calculateTotalFare = () => {
    return selectedSeatIds.length * (selectedBus?.fare || 0)
  }

  const handleConfirm = () => {
    if (selectedSeatIds.length === 0) {
      alert('Please select at least one seat')
      return
    }
    navigate('/passenger')
  }

  const getSeatStatus = (seat) => {
    if (!seat.isAvailable) return 'booked'
    if (selectedSeatIds.includes(seat.id)) return 'selected'
    return 'available'
  }

  const getSeatClassName = (seat) => {
    const status = getSeatStatus(seat)
    const baseClasses =
      'w-12 h-12 rounded-lg flex items-center justify-center font-semibold cursor-pointer transition-all transform hover:scale-105'

    switch (status) {
      case 'booked':
        return `${baseClasses} bg-gray-300 text-gray-500 cursor-not-allowed`
      case 'selected':
        return `${baseClasses} bg-primary-600 text-white shadow-lg`
      default:
        return `${baseClasses} bg-green-100 text-green-700 hover:bg-green-200`
    }
  }

  // Group seats by row for better layout
  const seatsByRow = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = []
    }
    acc[seat.row].push(seat)
    return acc
  }, {})

  const rows = Object.keys(seatsByRow).sort((a, b) => a - b)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/search"
            className="text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Buses
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Select Your Seats
          </h1>
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-semibold text-gray-900">
                {selectedBus?.name}
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-700">
                {selectedBus?.from} → {selectedBus?.to}
              </span>
              <span className="text-gray-400">|</span>
              <span className="text-gray-700">
                {selectedBus?.departureTime} - {selectedBus?.arrivalTime}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Layout */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Legend */}
              <div className="mb-6 flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-lg"></div>
                  <span className="text-sm text-gray-700">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary-600 rounded-lg"></div>
                  <span className="text-sm text-gray-700">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-lg"></div>
                  <span className="text-sm text-gray-700">Booked</span>
                </div>
              </div>

              {/* Driver/Steering Wheel Indicator */}
              <div className="text-center mb-6">
                <div className="inline-block px-4 py-2 bg-gray-100 rounded-lg">
                  <svg
                    className="w-8 h-8 text-gray-600 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                  <p className="text-xs text-gray-600 mt-1">Front</p>
                </div>
              </div>

              {/* Seat Grid */}
              <div className="space-y-4">
                {rows.map(rowNum => {
                  const rowSeats = seatsByRow[rowNum]
                  const leftSeats = rowSeats.filter(s => s.column === 'A' || s.column === 'B')
                  const rightSeats = rowSeats.filter(s => s.column === 'C' || s.column === 'D')

                  return (
                    <div key={rowNum} className="flex items-center gap-4">
                      {/* Row Number */}
                      <div className="w-8 text-center font-semibold text-gray-600">
                        {rowNum}
                      </div>

                      {/* Left Side Seats (A, B) */}
                      <div className="flex gap-2">
                        {leftSeats.map(seat => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat.id)}
                            disabled={!seat.isAvailable}
                            className={getSeatClassName(seat)}
                            title={`Seat ${seat.seatNumber} - ${seat.id}`}
                          >
                            {seat.seatNumber}
                          </button>
                        ))}
                      </div>

                      {/* Aisle */}
                      <div className="flex-1 border-t-2 border-dashed border-gray-300"></div>

                      {/* Right Side Seats (C, D) */}
                      <div className="flex gap-2">
                        {rightSeats.map(seat => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat.id)}
                            disabled={!seat.isAvailable}
                            className={getSeatClassName(seat)}
                            title={`Seat ${seat.seatNumber} - ${seat.id}`}
                          >
                            {seat.seatNumber}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Booking Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Route</p>
                  <p className="font-semibold text-gray-900">
                    {selectedBus?.from} → {selectedBus?.to}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Bus</p>
                  <p className="font-semibold text-gray-900">
                    {selectedBus?.name}
                  </p>
                  <p className="text-sm text-gray-600">{selectedBus?.operator}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Date & Time</p>
                  <p className="font-semibold text-gray-900">
                    {selectedBus?.departureTime}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">Selected Seats</p>
                  {selectedSeatIds.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedSeatIds.map(seatId => {
                        const seat = seats.find(s => s.id === seatId)
                        return (
                          <span
                            key={seatId}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                          >
                            {seat?.seatNumber}
                          </span>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No seats selected</p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Seats</span>
                    <span className="text-gray-900 font-semibold">
                      {selectedSeatIds.length} × ₹{selectedBus?.fare}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-primary-600">
                      ₹{calculateTotalFare()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                disabled={selectedSeatIds.length === 0}
                className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Confirm Seats
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeatSelectionPage


import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'
import { saveBookingDetails, generateTicketId } from '../services/bookingService'

const ViewTicketPage = () => {
  const navigate = useNavigate()
  const {
    selectedBus,
    selectedSeats,
    passengerInfo,
    searchParams,
    bookingId,
    setBooking,
    resetBooking,
  } = useBooking()
  const [ticketId, setTicketId] = useState(bookingId || null)

  useEffect(() => {
    if (!selectedBus || !selectedSeats || selectedSeats.length === 0) {
      navigate('/')
      return
    }
    if (!passengerInfo.name || !passengerInfo.email) {
      navigate('/')
      return
    }

    // Generate and save booking if not already done
    if (!ticketId) {
      const newTicketId = generateTicketId()
      const bookingData = {
        ticketId: newTicketId,
        bus: selectedBus,
        seats: selectedSeats,
        passenger: passengerInfo,
        route: {
          from: selectedBus.from,
          to: selectedBus.to,
          date: searchParams.date,
        },
        totalFare: selectedSeats.length * selectedBus.fare,
      }
      saveBookingDetails(bookingData)
      setTicketId(newTicketId)
      setBooking(newTicketId)
    }
  }, [
    selectedBus,
    selectedSeats,
    passengerInfo,
    searchParams,
    ticketId,
    navigate,
    setBooking,
  ])

  const calculateTotalFare = () => {
    return selectedSeats.length * (selectedBus?.fare || 0)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const handleNewBooking = () => {
    resetBooking()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-gray-600">
            Your ticket has been generated successfully
          </p>
        </div>

        {/* Ticket */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold mb-2">Bus Ticketing</h2>
                <p className="text-primary-100">Your Journey, Our Service</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-primary-100 mb-1">Ticket ID</p>
                <p className="text-2xl font-bold">{ticketId}</p>
              </div>
            </div>
          </div>

          {/* Ticket Body */}
          <div className="p-8">
            {/* Route Information */}
            <div className="mb-8 pb-8 border-b-2 border-dashed border-gray-300">
              <div className="flex items-center justify-between mb-6">
                <div className="text-center flex-1">
                  <p className="text-sm text-gray-500 mb-2">From</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {selectedBus?.from}
                  </p>
                  <p className="text-lg text-gray-600 mt-2">
                    {selectedBus?.departureTime}
                  </p>
                </div>
                <div className="flex-1 px-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t-2 border-dashed border-gray-400"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <div className="bg-white px-4">
                        <svg
                          className="w-8 h-8 text-primary-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-sm text-gray-500 mt-2">
                    {selectedBus?.duration}
                  </p>
                </div>
                <div className="text-center flex-1">
                  <p className="text-sm text-gray-500 mb-2">To</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {selectedBus?.to}
                  </p>
                  <p className="text-lg text-gray-600 mt-2">
                    {selectedBus?.arrivalTime}
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Journey Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDate(searchParams.date)}
                </p>
              </div>
            </div>

            {/* Bus Details */}
            <div className="mb-8 pb-8 border-b-2 border-dashed border-gray-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Bus Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Bus Name</p>
                  <p className="font-semibold text-gray-900">
                    {selectedBus?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Operator</p>
                  <p className="font-semibold text-gray-900">
                    {selectedBus?.operator}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Bus Type</p>
                  <p className="font-semibold text-gray-900">
                    {selectedBus?.busType}
                  </p>
                </div>
              </div>
            </div>

            {/* Seat Details */}
            <div className="mb-8 pb-8 border-b-2 border-dashed border-gray-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Seat Details
              </h3>
              <div className="flex flex-wrap gap-3">
                {selectedSeats.map((seat, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-semibold"
                  >
                    Seat {seat.seatNumber}
                  </div>
                ))}
              </div>
            </div>

            {/* Passenger Details */}
            <div className="mb-8 pb-8 border-b-2 border-dashed border-gray-300">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Passenger Details
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Name</p>
                  <p className="font-semibold text-gray-900">
                    {passengerInfo.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Age</p>
                  <p className="font-semibold text-gray-900">
                    {passengerInfo.age} years
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="font-semibold text-gray-900">
                    {passengerInfo.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="font-semibold text-gray-900">
                    {passengerInfo.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Fare Details */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Fare Details
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {selectedSeats.length} seat(s) × ₹{selectedBus?.fare}
                  </span>
                  <span className="font-semibold text-gray-900">
                    ₹{calculateTotalFare()}
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-300 flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">
                    Total Amount
                  </span>
                  <span className="text-2xl font-bold text-primary-600">
                    ₹{calculateTotalFare()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket Footer */}
          <div className="bg-gray-100 p-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Please arrive at the boarding point 15 minutes before departure
            </p>
            <p className="text-xs text-gray-500">
              This is an e-ticket. Please carry a valid ID proof for verification
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleNewBooking}
            className="flex-1 bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors shadow-lg hover:shadow-xl"
          >
            Book Another Ticket
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 bg-gray-200 text-gray-800 py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Print Ticket
          </button>
        </div>
      </div>
    </div>
  )
}

export default ViewTicketPage


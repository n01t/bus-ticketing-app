import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useBooking } from '../context/BookingContext'

const ReviewTicketPage = () => {
  const navigate = useNavigate()
  const { selectedBus, selectedSeats, passengerInfo, searchParams } = useBooking()

  useEffect(() => {
    if (!selectedBus || !selectedSeats || selectedSeats.length === 0) {
      navigate('/seats')
      return
    }
    if (!passengerInfo.name || !passengerInfo.email) {
      navigate('/passenger')
      return
    }
  }, [selectedBus, selectedSeats, passengerInfo, navigate])

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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/passenger"
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
            Back to Passenger Info
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Review Your Booking
          </h1>
          <p className="text-gray-600 mt-2">
            Please review all details before confirming your booking
          </p>
        </div>

        <div className="space-y-6">
          {/* Route & Bus Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Journey Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Route</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedBus?.from} → {selectedBus?.to}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Journey Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {formatDate(searchParams.date)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Bus Name</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedBus?.name}
                </p>
                <p className="text-sm text-gray-600">{selectedBus?.operator}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Bus Type</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedBus?.busType}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Departure Time</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedBus?.departureTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Arrival Time</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedBus?.arrivalTime}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Duration</p>
                <p className="text-lg font-semibold text-gray-900">
                  {selectedBus?.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Seat Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Selected Seats
            </h2>
            <div className="flex flex-wrap gap-3">
              {selectedSeats.map((seat, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg font-semibold"
                >
                  Seat {seat.seatNumber} ({seat.id})
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">
                  {selectedSeats.length} seat(s) × ₹{selectedBus?.fare}
                </span>
                <span className="text-xl font-bold text-primary-600">
                  ₹{calculateTotalFare()}
                </span>
              </div>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Passenger Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <p className="text-lg font-semibold text-gray-900">
                  {passengerInfo.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Age</p>
                <p className="text-lg font-semibold text-gray-900">
                  {passengerInfo.age} years
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-lg font-semibold text-gray-900">
                  {passengerInfo.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Phone</p>
                <p className="text-lg font-semibold text-gray-900">
                  {passengerInfo.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Amenities */}
          {selectedBus?.amenities && selectedBus.amenities.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Amenities
              </h2>
              <div className="flex flex-wrap gap-2">
                {selectedBus.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Total Fare */}
          <div className="bg-primary-50 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-gray-900">Total Fare</span>
              <span className="text-3xl font-bold text-primary-600">
                ₹{calculateTotalFare()}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Link
              to="/passenger"
              className="flex-1 bg-gray-200 text-gray-800 py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-center"
            >
              Edit Details
            </Link>
            <Link
              to="/ticket"
              className="flex-1 bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors shadow-lg hover:shadow-xl text-center"
            >
              Confirm Booking
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewTicketPage


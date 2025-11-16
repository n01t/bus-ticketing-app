import { createContext, useContext, useState, useCallback } from 'react'

const BookingContext = createContext()

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}

export const BookingProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    fromCity: '',
    toCity: '',
    date: '',
  })
  const [selectedBus, setSelectedBus] = useState(null)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [passengerInfo, setPassengerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
  })
  const [bookingId, setBookingId] = useState(null)

  const updateSearchParams = useCallback((params) => {
    setSearchParams(prev => ({ ...prev, ...params }))
  }, [])

  const selectBus = useCallback((bus) => {
    setSelectedBus(bus)
  }, [])

  const updateSelectedSeats = useCallback((seats) => {
    setSelectedSeats(seats)
  }, [])

  const updatePassengerInfo = useCallback((info) => {
    setPassengerInfo(prev => ({ ...prev, ...info }))
  }, [])

  const setBooking = useCallback((id) => {
    setBookingId(id)
  }, [])

  const resetBooking = useCallback(() => {
    setSearchParams({ fromCity: '', toCity: '', date: '' })
    setSelectedBus(null)
    setSelectedSeats([])
    setPassengerInfo({ name: '', email: '', phone: '', age: '' })
    setBookingId(null)
  }, [])

  const value = {
    searchParams,
    selectedBus,
    selectedSeats,
    passengerInfo,
    bookingId,
    updateSearchParams,
    selectBus,
    updateSelectedSeats,
    updatePassengerInfo,
    setBooking,
    resetBooking,
  }

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}


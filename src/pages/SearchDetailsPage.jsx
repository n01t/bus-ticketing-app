import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { filterBuses, getAvailableRoutes } from "../services/busService";

const SearchDetailsPage = () => {
  const navigate = useNavigate();
  const { searchParams, selectBus } = useBooking();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchParams.fromCity || !searchParams.toCity || !searchParams.date) {
      navigate("/");
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      const filteredBuses = filterBuses(
        searchParams.fromCity,
        searchParams.toCity,
        searchParams.date
      );
      setBuses(filteredBuses);
      setLoading(false);
    }, 500);
  }, [searchParams, navigate]);

  const handleSelectBus = (bus) => {
    selectBus(bus);
    navigate("/seats");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading buses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
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
            Back to Search
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Available Buses
          </h1>
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex flex-wrap items-center gap-4 text-gray-700">
              <span className="font-semibold">
                {searchParams.fromCity} → {searchParams.toCity}
              </span>
              <span className="text-gray-400">|</span>
              <span>{formatDate(searchParams.date)}</span>
            </div>
          </div>
        </div>

        {/* Buses List */}
        {buses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No buses found
            </h3>
            <p className="text-gray-600 mb-4">
              Sorry, we couldn't find any buses for this route on the selected
              date.
            </p>
            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Available routes include:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {getAvailableRoutes()
                  .slice(0, 8)
                  .map((route, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {route.from} → {route.to}
                    </span>
                  ))}
              </div>
            </div>
            <Link
              to="/"
              className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Search Again
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {buses.map((bus) => (
              <div
                key={bus.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    {/* Bus Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">
                            {bus.name}
                          </h3>
                          <p className="text-gray-600">{bus.operator}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-primary-600">
                            ₹{bus.fare}
                          </p>
                          <p className="text-sm text-gray-500">per seat</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Departure
                          </p>
                          <p className="font-semibold text-gray-900">
                            {bus.departureTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Arrival</p>
                          <p className="font-semibold text-gray-900">
                            {bus.arrivalTime}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Duration</p>
                          <p className="font-semibold text-gray-900">
                            {bus.duration}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Bus Type</p>
                          <p className="font-semibold text-gray-900">
                            {bus.busType}
                          </p>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {bus.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>

                      {/* Seats Info */}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{bus.availableSeats} seats available</span>
                        <span className="text-gray-300">|</span>
                        <span>
                          {bus.totalSeats - bus.availableSeats} seats booked
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="md:ml-6">
                      <button
                        onClick={() => handleSelectBus(bus)}
                        className="w-full md:w-auto bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
                      >
                        Select Seats
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDetailsPage;

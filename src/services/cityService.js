// Hardcoded list of cities
const cities = [
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Chennai',
  'Kolkata',
  'Pune',
  'Ahmedabad',
  'Jaipur',
  'Surat',
  'Lucknow',
  'Kanpur',
  'Nagpur',
  'Indore',
  'Thane',
  'Bhopal',
  'Visakhapatnam',
  'Patna',
  'Vadodara',
  'Ghaziabad',
]

/**
 * Get all available cities
 * @returns {string[]} Array of city names
 */
export const getCities = () => {
  return [...cities].sort()
}

/**
 * Check if a city exists
 * @param {string} cityName - Name of the city to check
 * @returns {boolean} True if city exists
 */
export const cityExists = (cityName) => {
  return cities.includes(cityName)
}


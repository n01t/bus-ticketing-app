import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import HomePage from "./pages/HomePage";
import SearchDetailsPage from "./pages/SearchDetailsPage";
import SeatSelectionPage from "./pages/SeatSelectionPage";
import PassengerInfoPage from "./pages/PassengerInfoPage";
import ReviewTicketPage from "./pages/ReviewTicketPage";
import ViewTicketPage from "./pages/ViewTicketPage";
import Layout from "./components/Layout";

function App() {
  return (
    <BookingProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchDetailsPage />} />
            <Route path="/seats" element={<SeatSelectionPage />} />
            <Route path="/passenger" element={<PassengerInfoPage />} />
            <Route path="/review" element={<ReviewTicketPage />} />
            <Route path="/ticket" element={<ViewTicketPage />} />
          </Routes>
        </Layout>
      </Router>
    </BookingProvider>
  );
}

export default App;

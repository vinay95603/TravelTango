// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateListing from './Components/createListings';
import ListingDetails from './pages/ListingDetails';
import TripList from './pages/TripList';
import WishList from './pages/WishList';
import PropertyList from './pages/PropertyList';
import ReservationList from './pages/ReservationList';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
// import AITravelPlanner from './Components/AITravelPlanner';
import AITravelPlanner2 from './Components/AITravelPlanner2';
import Trip from "./Components/trip";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties/:listingId" element={<ListingDetails/>} />
          <Route path="/:userId/trips" element={<TripList/>} />
          <Route path="/trip" element={<Trip/>} />
          <Route path="/:userId/wishList" element={<WishList/>} />
          <Route path="/:userId/properties" element={<PropertyList />} />
          <Route path="/:userId/reservations" element={<ReservationList />} />
          <Route path="/properties/category/:category" element={<CategoryPage />} />
          <Route path="/properties/search/:search" element={<SearchPage />} />
          {/* <Route path="/itinerary" element={<AITravelPlanner />}/> */}
          <Route path="/itinerary" element={<AITravelPlanner2 />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

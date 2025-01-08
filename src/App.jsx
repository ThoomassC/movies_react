import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { WishlistProvider } from "./context/WishlistContext";
import MovieList from "./components/Movie/List/MovieList";
import MovieDetail from "./components/Movie/Detail/MovieDetail";
import Wishlist from "./components/Wishlist/Wishlist";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound/NotFound";
import "./App.css";

const App = () => {
  return (
    <WishlistProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<MovieList />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </WishlistProvider>
  );
};

export default App;

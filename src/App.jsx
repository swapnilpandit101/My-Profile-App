import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ProfileDetails from "./components/ProfileDetails";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname]);

  const handleSearch = () => {
    setSearchQuery(tempSearchQuery);
    setTempSearchQuery(""); 
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-info shadow-sm fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">My Profile App</Link>

          {/* Navbar Toggle Button for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Content */}
          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
            </ul>

            {/* Search Bar in Navbar */}
            <form className="d-flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search Profiles..."
                value={tempSearchQuery}
                onChange={(e) => setTempSearchQuery(e.target.value)}
              />
              <button className="btn btn-light" type="button" onClick={handleSearch}>
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* Content Wrapper to Prevent Overlap */}
      <div className="container mt-5 pt-5">
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/profile" element={<Profile searchQuery={searchQuery} />} />
          <Route path="/dashboard" element={<Dashboard searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
          <Route path="/profile/:id" element={<ProfileDetails />} />
        </Routes>
      </div>
    </div>
  );
}

// Wrap the App component inside Router to use useLocation()
export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

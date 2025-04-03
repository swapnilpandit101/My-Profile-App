import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminPanel from "../components/AdminPanel";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = ({ searchQuery, setSearchQuery }) => {
  const profiles = useSelector((state) => state.profiles);
  const [locationFilter, setLocationFilter] = useState("all");
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [tempSearchQuery, setTempSearchQuery] = useState("");

  useEffect(() => {
    handleSearch();
  }, [profiles, searchQuery, locationFilter]);

  const handleSearch = () => {
    setSearchQuery(tempSearchQuery);            // Apply the search
    setTempSearchQuery("");                     // Clear the input field after search
  };

  useEffect(() => {
    // Filter profiles based on searchQuery and location
    const updatedProfiles = profiles.filter((profile) => {
      const matchesSearch = profile.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = 
        locationFilter === "all" || 
        (profile.location && locationFilter === "available") || 
        (!profile.location && locationFilter === "not-available");
      return matchesSearch && matchesLocation;
    });
    setFilteredProfiles(updatedProfiles);
  }, [profiles, searchQuery, locationFilter]);

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Admin Dashboard</h2>
      <div className="card shadow-lg p-4 bg-light rounded">
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by name..."
            value={tempSearchQuery}
            onChange={(e) => setTempSearchQuery(e.target.value)}
          />
          <button className="btn btn-primary ms-2" onClick={handleSearch}>
            Search
          </button>
          <select 
            className="form-select w-25" 
            value={locationFilter} 
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="all">All Locations</option>
            <option value="available">Location Available</option>
            <option value="not-available">Location Not Available</option>
          </select>
        </div>
        <AdminPanel profiles={filteredProfiles} />
      </div>
    </div>
  );
};

export default Dashboard;

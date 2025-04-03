import React from "react";
import Profile from "../pages/Profile";

const Home = ({ searchQuery }) => {
  console.log("I am home");

  return (
    <div className="container text-center mt-5">
      <div className="card shadow-lg p-4 bg-light rounded">
        <h2 className="text-primary">Welcome to My Profile App</h2>
        <p className="text-muted">This is the Home page. Explore profiles and manage them easily.</p>
      </div>

      {/* Pass searchQuery to Profile component */}
      <div>
        <Profile searchQuery={searchQuery} /> 
      </div>
    </div>
  );
};

export default Home;

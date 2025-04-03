import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProfiles } from "../services/dummyAPI";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Profile = ({ searchQuery }) => {
  const navigate = useNavigate();
  const reduxProfiles = useSelector((state) => state.profiles);
  const [allProfiles, setAllProfiles] = useState([]);

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const apiProfiles = await getProfiles();
        setAllProfiles([...apiProfiles, ...reduxProfiles]);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      }
    }
    fetchProfiles();
  }, [reduxProfiles]);

  // Ensure searchQuery is handled correctly
  const filteredProfiles = allProfiles.filter(profile =>
    profile.name?.toLowerCase().includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 justify-content-center">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <div
              key={profile.id}
              className="col d-flex justify-content-center"
              style={{ cursor: "pointer" }}
            >
              <div 
                className="card shadow-lg p-4 m-3 bg-light rounded text-center" 
                style={{ maxWidth: "300px" }}
              >
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="card-img-top rounded-circle mx-auto"
                  style={{ width: "100px", height: "100px" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-primary">{profile.name}</h5>
                  <p className="card-text text-muted">
                    {profile.description.split(" ").slice(0, 10).join(" ")}{" "}
                    {profile.description.split(" ").length > 30 ? "..." : ""}
                  </p>

                  <button 
                    className="btn btn-primary mt-2" 
                    onClick={() => navigate(`/profile/${profile.id}`)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No profiles found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

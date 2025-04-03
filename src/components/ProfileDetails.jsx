import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getProfiles } from "../services/dummyAPI";
import MapComponent from "./MapComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/ProfileDetails.css";

const ProfileDetails = () => {
  const { id } = useParams();
  const reduxProfiles = useSelector((state) => state.profiles);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const apiProfiles = await getProfiles();
      const allProfiles = [...apiProfiles, ...reduxProfiles];
      const selectedProfile = allProfiles.find((p) => p.id === parseInt(id));

      setProfile(selectedProfile || null);
    }

    fetchProfile();
  }, [id, reduxProfiles]);

  if (!profile) {
    return <p className="text-center text-danger mt-5">Profile Not Found</p>;
  }

  const location =
    profile.location && profile.location.lat && profile.location.lng
      ? { lat: parseFloat(profile.location.lat), lng: parseFloat(profile.location.lng) }
      : null;

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: "60px", paddingBottom: "50px" }}>
      <div className="card text-center shadow-lg p-5 bg-light" style={{ width: "700px", borderRadius: "35px" }}>
        <img
          src={profile.image}
          alt={profile.name}
          className="rounded-circle mx-auto d-block mb-4"
          style={{ width: "150px", height: "150px", objectFit: "cover", border: "4px solid #007bff" }}
        />
        <h2 className="text-primary fw-bold">{profile.name}</h2>
        <p className="text-muted fs-5">{profile.description}</p>

        {location ? (
          <div className="mt-4 p-3 bg-white shadow-sm rounded" style={{ border: "2px solid #ddd" }}>
            <h4 className="text-danger">📍 Location Map</h4>
            <MapComponent location={location} />
          </div>
        ) : (
          <p className="text-danger mt-3">Location not available</p>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;

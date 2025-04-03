import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProfile, deleteProfile, updateProfile } from "../store/profileSlice";
import { getProfiles } from "../services/dummyAPI";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profiles);
  const [newProfile, setNewProfile] = useState({ id: null, name: "", description: "", image: "", lat: "", lng: "" });
  const [highestId, setHighestId] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getProfiles().then((data) => {
      const maxApiId = data.reduce((max, profile) => (profile.id > max ? profile.id : max), 0);
      const maxReduxId = profiles.reduce((max, profile) => (profile.id > max ? profile.id : max), 0);
      setHighestId(Math.max(maxApiId, maxReduxId));
    });
  }, [profiles]);

  const handleAddProfile = () => {
    if (!newProfile.name.trim() || !newProfile.description.trim() || !newProfile.image.trim()) {
      alert("Please fill in all required fields!");
      return;
    }

    let location = null;
    if (newProfile.lat.trim() !== "" && newProfile.lng.trim() !== "" && !isNaN(newProfile.lat) && !isNaN(newProfile.lng)) {
      location = { lat: parseFloat(newProfile.lat), lng: parseFloat(newProfile.lng) };
    }

    if (isEditing) {
      dispatch(updateProfile({ ...newProfile, location }));
      setIsEditing(false);
    } else {
      const newId = highestId + 1;
      setHighestId(newId);
      dispatch(addProfile({ ...newProfile, id: newId, location }));
    }

    setNewProfile({ id: null, name: "", description: "", image: "", lat: "", lng: "" });
  };

  const handleEditProfile = (profile) => {
    setNewProfile({
      id: profile.id,
      name: profile.name,
      description: profile.description,
      image: profile.image,
      lat: profile.location ? profile.location.lat.toString() : "",
      lng: profile.location ? profile.location.lng.toString() : "",
    });
    setIsEditing(true);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 bg-light">
        <h2 className="text-center text-primary mb-4">Admin Panel</h2>

        {/* Profile Form */}
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" placeholder="Name" value={newProfile.name} onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })} className="form-control" />
          </div>
          <div className="col-md-6">
            <input type="text" placeholder="Description" value={newProfile.description} onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })} className="form-control" />
          </div>
          <div className="col-md-6">
            <input type="text" placeholder="Image URL" value={newProfile.image} onChange={(e) => setNewProfile({ ...newProfile, image: e.target.value })} className="form-control" />
          </div>
          <div className="col-md-3">
            <input type="text" placeholder="Latitude (optional)" value={newProfile.lat} onChange={(e) => setNewProfile({ ...newProfile, lat: e.target.value })} className="form-control" />
          </div>
          <div className="col-md-3">
            <input type="text" placeholder="Longitude (optional)" value={newProfile.lng} onChange={(e) => setNewProfile({ ...newProfile, lng: e.target.value })} className="form-control" />
          </div>
        </div>

        <div className="d-grid mt-3">
          <button onClick={handleAddProfile} className={`btn ${isEditing ? "btn-warning" : "btn-success"}`}>
            {isEditing ? "Update Profile" : "Add Profile"}
          </button>
        </div>

        {/* Profile List */}
        <ul className="list-group mt-4">
          {profiles.length === 0 ? (
            <p className="text-center text-muted">No profiles match your criteria.</p>
          ) : (
            profiles.map((profile) => (
              <li key={profile.id} className="list-group-item d-flex justify-content-between align-items-center shadow-sm">
                <div>
                  <img src={profile.image} alt={profile.name} className="rounded-circle me-3" width="40" height="40" />
                  <span className="fw-bold">{profile.name}</span> - 
                  <span className="text-muted">{profile.description}</span> - 
                  <span className={profile.location ? "text-success" : "text-danger"}>
                    {profile.location ? "Location Available" : "Location Not Available"}
                  </span>
                </div>
                <div>
                  <button onClick={() => handleEditProfile(profile)} className="btn btn-info btn-sm me-2">Edit</button>
                  <button onClick={() => dispatch(deleteProfile(profile.id))} className="btn btn-danger btn-sm">Delete</button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;

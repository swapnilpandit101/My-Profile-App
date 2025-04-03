import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const MapComponent = ({ location }) => {
  const lat = parseFloat(location?.lat);
  const lng = parseFloat(location?.lng);

  if (!location || isNaN(lat) || isNaN(lng)) {
    return (
      <div className="container mt-4">
        <div className="card shadow-lg p-4 text-center bg-light">
          {/* <h4 className="text-danger">📍 Location Not Available</h4> */}
          <p className="text-muted">Invalid or missing location data.</p>
        </div>
      </div>
    );
  }

  const googleMapUrl = `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed`;

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-4 text-center bg-light">
        {/* <h4 className="text-primary">📍 Location Map</h4> */}
        <iframe
          title="Google Map"
          src={googleMapUrl}
          width="100%"
          height="300"
          style={{ border: "0", borderRadius: "10px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default MapComponent;

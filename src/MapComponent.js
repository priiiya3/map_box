import React from "react";
import GoogleMapReact from 'google-map-react';
import { FaSearchLocation } from 'react-icons/fa';
import html2canvas from "html2canvas";
import { useState } from "react";
import SceneWithSpinningBoxes from "./Cuboid";
import './MapComponent.css'


// Search Bar
const SearchBar = ({ onSearch }) => {
  const [address, setAddress] = useState("");

  // This is called when the user will type something into the input field
  const handleInputChange = (event) => {
    setAddress(event.target.value);
  };

  // when handleSearch is called, it triggers the onSearch function 
  const handleSearch = () => {
    onSearch(address);
  };

  return (
    <div className="search-block">
      <input placeholder="Search..."  className="search-bar" type="text" value={address} onChange={handleInputChange} />
      <button className="search-button" onClick={handleSearch}> <FaSearchLocation/> </button>
    </div>
  );
};



// Map Implementation using Google maps API
function MapComponent() {

  const handleSearch = (address) => {

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: address }, (results, status_code) => {
      if (status_code === "OK") {
        setPosition({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        });
      } else {
        // display error code
        console.error(`${status_code}`);
      }
    });
  };

  
  const apiKey = process.env.API_KEY;
  const [position, setPosition] = useState({ lat: 20.5937, lng: 78.9629 });
  const [dataUrl, setDataUrl] = useState(0);


  const handleScreenshot = () => {

    html2canvas(document.getElementById('map'), {
      letterRendering: 1,
      allowTaint: true,
      useCORS: true
    }).then(canvas => {
      setDataUrl(canvas.toDataURL());
    })

  }


  return (

    <div className="main-container" >
      {/* include search bar */}
      <SearchBar onSearch={handleSearch} />
      {/* include button to take screenshot */}
      <div className="left-align">
        <SceneWithSpinningBoxes dataUrl={dataUrl} />
        <div onClick={handleScreenshot} className="button"> Snapshot </div>
      </div>


      {/* include google map */}
      <div id="map" className="right-align">
        <GoogleMapReact
          bootstrapURLKeys={{ key: apiKey }}
          defaultCenter={{ lat: 20.5937, lng: 78.9629 }}
          defaultZoom={12}
          center={position}
          attribute="allowTaint"
          type="boolean"
          default="false"
        />
      </div>

    </div>
  );
}

export default MapComponent;



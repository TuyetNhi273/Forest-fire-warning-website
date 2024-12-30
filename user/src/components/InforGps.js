import React, { useEffect, useState } from 'react';
import { send_socketIo } from '../services/socketIo';

const InforGps = (props) => {
  const [payload, setPayload] = useState({
    sat: '',
    fix: '',
    Groundspeed: '',
    lat: '',
    lon: '',
    alt: '',
    homeLocation: {
      lat: '',
      lon: '',
      alt: ''
    }
  });

  const [homeAlt, setHomeAlt] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setPayload(props.payload);
  }, [props.payload]);

  const handleAltChange = (e) => {
    setHomeAlt(e.target.value);
  };

  const handleSetHome = () => {
    const lat = parseFloat(payload.lat);
    const lon = parseFloat(payload.lon);
    const alt = parseInt(homeAlt) || parseInt(payload.alt);

    const homeData = {
      lat,
      lon,
      alt
    };

    if (!isNaN(homeData.lat) && !isNaN(homeData.lon) && !isNaN(homeData.alt)) {
      console.log('Set Home Data:', homeData);
        send_socketIo("controlMsg", "drone", "set_home_gps", homeData);

      setErrorMessage('');
    } else {
      setErrorMessage('Error: Latitude, Longitude, and Altitude must be valid numbers.');
    }
  };

  return (
    <div>
      <span>
        Gps: sat {payload.sat} - fix {payload.fix} - Groundspeed {payload.Groundspeed}
      </span>
      <br />
      <span>
        Lat: {payload.lat} - Lon: {payload.lon} - Alt: {payload.alt}
      </span>
      <br />
      <span>
        Home Location: lat {payload.homeLocation.lat} - lon {payload.homeLocation.lon} - alt {payload.homeLocation.alt}
      </span>
      <br />
      <input 
        type="text" 
        placeholder="Enter home alt" 
        value={homeAlt} 
        onChange={handleAltChange} 
      />
      <button onClick={handleSetHome}>Set Home</button>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </div>
  );
}

export default InforGps;

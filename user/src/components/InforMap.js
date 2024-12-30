import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const InforMap = ({ currentLocation, path, onPathChange }) => {
    // const [homeLocation, setHomeLocation] = useState(null);
    const [currentPosition, setCurrentPosition] = useState(null);

    useEffect(() => {
        // Initialize with currentLocation as home if provided
        if (currentLocation) {
            // setHomeLocation(currentLocation);
            setCurrentPosition(currentLocation);
            if (path.length === 0) {
                onPathChange([currentLocation]);
            }
        } else {
            // Fetch current position
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const currentPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    setCurrentPosition(currentPosition);
                    if (path.length === 0) {
                        onPathChange([currentPosition]);
                    }
                },
                (error) => {
                    console.error("Error fetching location: ", error);
                    // Handle error accordingly
                }
            );
        }
    }, [currentLocation, onPathChange, path]);

    // const handleSetHome = () => {
    //     // Set current position as home
    //     setHomeLocation(currentPosition);
    // };

    const handleMapClick = (event) => {
        const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        const updatedPath = [...path, newPosition];
        onPathChange(updatedPath);
    };

    return (
        <LoadScript googleMapsApiKey={String(process.env.REACT_APP_GOOGLE_API_KEY)}>
            <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={currentPosition}
                zoom={20}
                onClick={handleMapClick}
            >
                {currentPosition && <Marker position={currentPosition} />}
                {/* {homeLocation && <Marker position={homeLocation} icon={{ url: 'https://maps.google.com/mapfiles/kml/paddle/grn-circle.png' }} />} */}
                <Polyline
                    path={path}
                    options={{ strokeColor: '#FF0000', strokeOpacity: 1.0, strokeWeight: 2 }}
                />
                {/* Render markers for each point in path */}
                {path.map((point, index) => (
                    <Marker key={index} position={point} />
                ))}
            </GoogleMap>
            {/* <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <button onClick={handleSetHome}>Set Home</button>
            </div> */}
        </LoadScript>
    );
}

export default InforMap;

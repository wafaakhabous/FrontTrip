import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';


const ItinerariesMap = ({ itineraries, height }) => {
  const [coordinates, setCoordinates] = useState([]);

  const geocodeFunction = async (city) => {
    const apiKey = '98af7dfad6df440e81a4716d6b9fed7d';
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)},Maroc&key=${apiKey}&language=fr&pretty=1`;
  
    try {
      const response = await axios.get(apiUrl);
      const result = response.data.results[0]; // Assuming you want the first result
      console.log('RESUUUUULT ' + result.geometry.lat);
      return {
        lat: result.geometry.lat,
        lon: result.geometry.lng,
      };
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return {
        lat : 34.02236,
        long : -6.8340222
      };
    }
  };

  // Use a geocoding service to convert city names to coordinates
  const geocodeCity = async (city) => {
    // Implement your geocoding logic here, e.g., using an API like OpenCage Geocoding
    // You would need to sign up for an API key and make an HTTP request
    // For simplicity, let's assume you have a geocoding function that returns a Promise
    const result = await geocodeFunction(city);
    return result;
  };

  useEffect(() => {
    const fetchCoordinates = async () => {
      const coordinatesArray = await Promise.all(
        itineraries.map(async (itinerary) => {
          const { city } = itinerary;
          const coordinates = await geocodeCity(city);
          console.log("CITY CORDINATES : " + coordinates);
          return { ...coordinates, city };
        })
      );

      setCoordinates(coordinatesArray);
      console.log(coordinates);
    };

    fetchCoordinates();
  }, [itineraries]);

  return (
    <MapContainer id='map' center={[34.02236, -6.8340222]} zoom={6} style={{height : (height != undefined ? height : 100)}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {coordinates.map(({ city, lat, lon }) => (
        <Marker key={city} position={[lat, lon]}>
          <Popup>Itinerary : {city}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ItinerariesMap;

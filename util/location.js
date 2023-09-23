import axios from "axios";
import polyline from "@mapbox/polyline";



export const GOOGLE_API_KEY = "AIzaSyCij7hasiqlFxeBF3gT8wAr4D0KgAVO3YE";

export const createLocationUrl = ({ lat, lng }) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
};

export const getReadableAddress = async ({ lat, lng }) => {
  const resp = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  );
  if (!resp.ok) {
    throw new Error("Could not fetch address!");
  }
  const data = await resp.json();
  return data.results[0].formatted_address;
};

export const getDirectionsUrl = (origin, destination) => {
  const originCoords = `${origin.latitude},${origin.longitude}`;
  const destinationCoords = `${destination.latitude},${destination.longitude}`;
  return `https://maps.googleapis.com/maps/api/directions/json?origin=${originCoords}&destination=${destinationCoords}&key=${GOOGLE_API_KEY}&mode=walking`;
};

export const fetchRouteDirections = async (origin, destination) => {
  const url = getDirectionsUrl(origin, destination);
  try {
    const response = await axios.get(url);
    if (response.data.status !== "OK") {
      throw new Error("Failed to fetch directions");
    }
    const points = response.data.routes[0].overview_polyline.points;
    return polyline.decode(points).map((point) => ({
      latitude: point[0],
      longitude: point[1],
    }));
  } catch (error) {
    console.error("Error fetching directions:", error);
    throw error;
  }
};
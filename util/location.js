const GOOGLE_API_KEY = "AIzaSyCfSho6enfbeGjxn555ajNoB7AFTrpsR0o";

export const createLocationUrl = ({ lat, lng }) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
};

export const getReadableAddress = async ({ lat, lng }) => {
  const resp = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`);
  if(!resp.ok){
    throw new Error('Could not fetch address!');
  }
  const data = await resp.json();
  return data.results[0].formatted_address;
};
import axios from 'axios';

export function fetchData() {
  return axios
    .get('https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=30&offset=0&unisex=true&lat=53.42189467984313&lng=-2.2434425443392785')
    .then((response) => {
      return response.data
    })
}


// Function to load Google Maps API
export function loadGoogleMapsAPI(callback) {
  if (window.google && window.google.maps) {
    // Google Maps API is already loaded, call the callback function
    callback();
  } else {
    const apiKey = ""
    // Google Maps API is not loaded, dynamically load it
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = callback;

    // Append the script to the document
    document.head.appendChild(script);
  }
}



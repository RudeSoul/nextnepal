import { instance } from './instance';

// Get Address from current geo location position
export const getCordinateToAddress = async () => {
  let path = '/coordinate-to-address';
  let locationInfo = {};

  const coords = getCoords();

  await coords.then(async (pos) => {
    await instance
      .post(path, {
        lat: pos.lat,
        lng: pos.long,
      })
      .then((res) => {
        locationInfo.address = res.data;
        locationInfo.latitude = pos.lat;
        locationInfo.longitude = pos.long;
      })
      .catch((err) => {
        alert('Sorry unable to get location. Check your internet connection.');
        return;
      });
  }).catch(err => {
    locationInfo = 'Please enable geo location to locate your location. If not you can manually search for location.';
  });

  return locationInfo;
};

// Get latitude and longitude
const getCoords = async () => {
  const pos = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  return {
    long: pos.coords.longitude,
    lat: pos.coords.latitude,
  };
};

// Initialize google place library
export const placeInitialization = new Promise((resolve) => {
  window['GoogleMapsInit'] = resolve;

  let GMap = document.createElement('script');

  GMap.setAttribute(
    'src',
    `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_CN_PLACES_API_KEY}&callback=GoogleMapsInit&libraries=places`,
  );

  document.body.appendChild(GMap);
});

export const getPopularLocation = async () => {
  
  let popular;

  await instance.post('/popular-geo-locations').then((res) => {
    popular = res.data;
  }).catch(err => {
    alert('Error:' + err);
  });

  return popular;
}

export const getDeliveryRestaurants = async (lat, long) => {
  
  let restaurants;

  await instance.post('/get-delivery-restaurants', {latitude: lat, longitude: long}).then((res) => {
    restaurants = res.data;
  }).catch(err => {
    alert('Error:' + err);
  });

  return restaurants;
}

export const getPickupRestaurants = async (lat, long) => {
  
  let restaurants;

  await instance.post('/get-selfpickup-restaurants', {latitude: lat, longitude: long}).then((res) => {
    restaurants = res.data;
  }).catch(err => {
    alert('Error:' + err);
  });

  return restaurants;
}

export const getResInfo = async (slug) => {
  let res = [];

  await instance.post(`get-restaurant-info/${slug}`).then(data => {
    res['info'] = data.data;
  }).catch(err => {
    alert('Error' + err);
  });

  await instance.post(`get-restaurant-items/${slug}`).then(data => {
    res['item'] = data.data;
  }).catch(err => {
    alert('Error' + err);
  });

  return res;
}

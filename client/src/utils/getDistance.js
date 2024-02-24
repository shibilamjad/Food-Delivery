// import haversine from 'haversine-distance';

// async function getCurrentPosition() {
//   return new Promise((resolve, reject) => {
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition(resolve, reject);
//     } else {
//       reject(new Error('Geolocation is not supported by this browser.'));
//     }
//   });
// }

// async function getLocation(setTotalDistance) {
//   try {
//     const position = await getCurrentPosition();
//     const currentLat = position.coords.latitude;
//     const currentLong = position.coords.longitude;

//     const resLat = items.restaurant ? items.restaurant.lat : null;
//     const resLong = items.restaurant ? items.restaurant.long : null;

//     if (resLat !== null && resLong !== null) {
//       const a = { latitude: currentLat, longitude: currentLong };
//       const b = { latitude: resLat, longitude: resLong };
//       setTotalDistance(Math.round(haversine(a, b) / 1000));
//     } else {
//       console.log('Restaurant latitude or longitude is missing.');
//     }
//   } catch (error) {
//     console.error('Error getting geolocation:', error);
//   }
// }

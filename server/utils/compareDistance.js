function compareDistance(
  deliveryBoyLatitude,
  deliveryBoyLongitude,
  restaurantLatitude,
  restaurantLongitude
) {
  const R = 6371;
  const dLat = deg2rad(restaurantLatitude - deliveryBoyLatitude);
  const dLon = deg2rad(restaurantLongitude - deliveryBoyLongitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(deliveryBoyLatitude)) *
      Math.cos(deg2rad(restaurantLatitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
module.exports = { compareDistance };

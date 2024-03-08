const calculateDistanceAndTime = (userCoordinates, restaurantCoordinates) => {
  const userLatitude = userCoordinates[1];
  const userLongitude = userCoordinates[0];

  const restaurantLatitude = restaurantCoordinates[1];
  const restaurantLongitude = restaurantCoordinates[0];

  const distance = compareDistance(
    userLatitude,
    userLongitude,
    restaurantLatitude,
    restaurantLongitude
  );

  // Assuming an average speed of 40 km/h
  const estimatedTimeInHours = distance / 40; // in hours
  const estimatedTimeInMinutes = estimatedTimeInHours * 60; // convert hours to minutes

  return {
    distance,
    estimatedTime: estimatedTimeInMinutes,
  };
};
module.exports = { calculateDistanceAndTime };

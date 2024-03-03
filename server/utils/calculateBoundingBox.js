function calculateBoundingBox(centerPoint, radius) {
  const earthRadius = 6371; // Earth's radius in kilometers
  const angularRadius = radius / earthRadius; // Convert radius to radians

  const { lat, long } = centerPoint;

  // Calculate the maximum and minimum latitude
  const maxLat = lat + (angularRadius * 180) / Math.PI;
  const minLat = lat - (angularRadius * 180) / Math.PI;

  // Calculate the maximum and minimum longitude
  const maxLong =
    long + (angularRadius * 180) / Math.PI / Math.cos((lat * Math.PI) / 180);
  const minLong =
    long - (angularRadius * 180) / Math.PI / Math.cos((lat * Math.PI) / 180);

  // Define the bounding box as an array of coordinates
  // [ [minLong, minLat], [maxLong, minLat], [maxLong, maxLat], [minLong, maxLat], [minLong, minLat] ]
  const boundingBox = [
    [minLong, minLat],
    [maxLong, minLat],
    [maxLong, maxLat],
    [minLong, maxLat],
    [minLong, minLat], // Close the loop
  ];

  return boundingBox;
}
module.exports = {
  calculateBoundingBox,
};

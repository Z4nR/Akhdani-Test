module.exports = {
  rangeCount: (lat1, lat2, long1, long2) => {
    let dLat = ((lat2 - lat1) * Math.PI) / 180.0;
    let dLon = ((long2 - long1) * Math.PI) / 180.0;

    lat1 = (lat1 * Math.PI) / 180.0;
    lat2 = (lat2 * Math.PI) / 180.0;

    let a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    let rad = 6371;
    let c = 2 * Math.asin(Math.sqrt(a));
    const range = rad * c;
    return `${parseFloat(range).toFixed(0)} KM`;
  },
};

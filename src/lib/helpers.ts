export const getGeocode = async (request: google.maps.GeocoderRequest) => {
  const Geocoder = new google.maps.Geocoder();
  return (await Geocoder.geocode(request)).results;
};

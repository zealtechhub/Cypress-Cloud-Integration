export const getGeocode = async (placeId: string) => {
  const Geocoder = new google.maps.Geocoder();
  return (await Geocoder.geocode({ placeId })).results;
};

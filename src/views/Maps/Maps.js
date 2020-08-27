import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

export default function Maps() {
  const [latlng, setLatlng] = React.useState({lat: 10.8564835,lng: 106.6312885})
  const [popup, setPopup] = React.useState("TMA Innovation")
  const [hasLocation, setHasLocation] = React.useState(true)
  const mapRef = React.createRef();
  const handleClick = () => {
    const map = mapRef.current;
    if (map != null) {
      map.leafletElement.locate();
    }
  };

  const handleLocationFound = (e) => {
    setHasLocation(true)
    setLatlng(e.latlng)
  };

  const marker = hasLocation ? (
    <Marker position={latlng}>
      <Popup>{popup}</Popup>
    </Marker>
  ) : null;
  return (
    <Map
      center={latlng}
      length={4}
      onClick={handleClick}
      onLocationfound={handleLocationFound}
      ref={mapRef}
      zoom={13}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {marker}
    </Map>
  );
}

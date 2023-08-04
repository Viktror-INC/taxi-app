import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarker, { ILocationMarker } from "./location-marker";
import { MapMainWrap } from "./styles";
import { LatLngExpression } from "leaflet";

interface IProps extends ILocationMarker {
  center: LatLngExpression;
}

const Map: React.FC<IProps> = (props) => {
  const {
    center,
    position,
    setPosition,
    secondPosition,
    setSecondPosition,
    routeCoordinates,
    setRouteCoordinates,
  } = props;

  return (
    <MapMainWrap>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css"
      />
      <MapContainer
        style={{ width: "100%", height: "100vh" }}
        center={center}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer url={`${process.env.NEXT_PUBLIC_TILE_SERVER}`} />
        <LocationMarker
          position={position}
          setPosition={setPosition}
          secondPosition={secondPosition}
          routeCoordinates={routeCoordinates}
          setSecondPosition={setSecondPosition}
          setRouteCoordinates={setRouteCoordinates}
        />
      </MapContainer>
    </MapMainWrap>
  );
};

export default Map;

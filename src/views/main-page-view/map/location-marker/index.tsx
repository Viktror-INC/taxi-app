import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import L, { LatLng } from "leaflet";
import { useMap, useMapEvents } from "react-leaflet";
import { Marker, Popup, Polyline } from "react-leaflet";
import icon from "shared/constants/icons";

export interface ILocationMarker {
  position: LatLng | null;
  setPosition: (latlng: LatLng) => void;
  secondPosition: LatLng | null;
  setSecondPosition: (latlng: LatLng) => void;
  setRouteCoordinates: (latlng: LatLng[]) => void;

  routeCoordinates: LatLng[] | [];
}

interface IOpenRouteData {
  features: { geometry: { coordinates: number[][] } }[];
}

const LocationMarker: React.FC<ILocationMarker> = (props) => {
  const {
    position,
    setPosition,
    secondPosition,
    setSecondPosition,
    routeCoordinates,
    setRouteCoordinates,
  } = props;

  const map = useMap();

  // get current location
  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    });
  }, [map, setPosition]);

  // set second location
  useMapEvents({
    click: (e) => {
      setSecondPosition(e.latlng);
      if (position) {
        fetchRoute(position, e.latlng);
      }
    },
  });

  // get coordinates for second point
  const fetchRoute = (start: LatLng, end: LatLng) => {
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.NEXT_PUBLIC_OPEN_ROUTE_SERVICE_API}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;

    fetch(url)
      .then((response) => response.json())
      .then((data: IOpenRouteData) => {
        const coordinates = data.features[0].geometry.coordinates.map(
          (coord) => new L.LatLng(coord[1], coord[0])
        );
        setRouteCoordinates(coordinates);
      })
      .catch((error) => {
        console.error("Error fetching route:", error);
      });
  };

  return (
    <>
      {position && (
        <Marker position={position} icon={icon}>
          <Popup>
            You are here. <br />
          </Popup>
        </Marker>
      )}
      {secondPosition && (
        <Marker position={secondPosition} icon={icon}>
          <Popup>Clicked Position</Popup>
        </Marker>
      )}
      {position && routeCoordinates.length > 0 && (
        <Polyline positions={[position, ...routeCoordinates]} color="blue" />
      )}
    </>
  );
};

export default LocationMarker;

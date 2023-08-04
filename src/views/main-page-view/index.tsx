"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { LatLng } from "leaflet";

import {
  BlueBorder,
  MainLine,
  MainPopup,
  MainPopupBody,
  MainWrap,
} from "./styles";

const MapWithNoSSR = dynamic(() => import("./map"), {
  ssr: false,
});

const MainPageView = () => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [secondPosition, setSecondPosition] = useState<LatLng | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<LatLng[]>([]);
  const center = { lat: 50.450001, lng: 30.523333 };

  return (
    <MainWrap>
      <MapWithNoSSR
        center={center}
        position={position}
        setPosition={setPosition}
        secondPosition={secondPosition}
        routeCoordinates={routeCoordinates}
        setSecondPosition={setSecondPosition}
        setRouteCoordinates={setRouteCoordinates}
      />
      <MainPopup>
        <BlueBorder>
          <p>Бесплатное ожидание 1:00</p>
        </BlueBorder>
        <MainPopupBody>
          <MainLine />
        </MainPopupBody>
      </MainPopup>
    </MainWrap>
  );
};

export default MainPageView;

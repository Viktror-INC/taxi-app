"use client";
import React, {useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { LatLng } from "leaflet";

import {
  BlueBorder,
  MainDistance,
  MainLine,
  MainPopup,
  MainPopupBody,
  MainWrap,
  RouteWithScroll,
  RouteWrap,
} from "./styles";

const MapWithNoSSR = dynamic(() => import("./map"), {
  ssr: false,
});

const MainPageView = () => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [secondPosition, setSecondPosition] = useState<LatLng | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<LatLng[]>([]);
  const [routeInstructions, setRouteInstructions] = useState<string[]>([]);
  const distanceInKilometers = totalDistance / 1000; // Convert meters to kilometers
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [defaultPopupHeight, setDefaultPopupHeight] = useState("0");
  const [time, setTime] = useState(0);
  const center = { lat: 50.450001, lng: 30.523333 };

  const cleanUp = () => {
    setRouteCoordinates([]);
    setTotalDistance(0);
    setRouteInstructions([]);
    setSecondPosition(null);
    setTime(0);
    setDefaultPopupHeight("0");
  };

  // the required distance between touchStart and touchEnd to be detected as a swipe
  const minSwipeDistance = 50;

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(0); // otherwise the swipe is fired even with usual touch events
    setTouchStart(event.targetTouches[0].clientY);
  };

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(event.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    const isSwipeUp = distance > minSwipeDistance;
    const isSwipeDown = distance < -minSwipeDistance;

    if (isSwipeUp) {
      setDefaultPopupHeight("35%");
    } else if (isSwipeDown) {
      setDefaultPopupHeight("5%");
    }
  };

  const stopEvent = (event: React.TouchEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const getSecondPosition = (latlng: LatLng) => {
    setDefaultPopupHeight("35%");
    setSecondPosition(latlng);
  };

  useEffect(() => {
    let timerInterval: NodeJS.Timer;

    if (secondPosition) {
      let remainingTime = 60;

      timerInterval = setInterval(() => {
        if (remainingTime > 0) {
          setTime(remainingTime);
          remainingTime -= 1;
        } else {
          clearInterval(timerInterval);
          cleanUp();
        }
      }, 1000);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [secondPosition]);

  return (
    <MainWrap>
      <MapWithNoSSR
        center={center}
        position={position}
        setPosition={setPosition}
        secondPosition={secondPosition}
        routeCoordinates={routeCoordinates}
        setSecondPosition={getSecondPosition}
        setRouteCoordinates={setRouteCoordinates}
        setTotalDistance={setTotalDistance}
        setRouteInstructions={setRouteInstructions}
        cleanUp={cleanUp}
      />
      <MainPopup
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        height={defaultPopupHeight}
      >
        <BlueBorder>
          <p>Безкоштовне очікування {time}</p>
        </BlueBorder>
        <MainPopupBody>
          <MainLine />
          <MainDistance>
            Довжина маршруту:
            <p>
              {distanceInKilometers >= 1
                ? `${distanceInKilometers.toFixed(2)}km`
                : `${totalDistance.toFixed(2)}m`}
            </p>
            {routeInstructions.length > 0 && (
              <RouteWrap
                onTouchStart={stopEvent}
                onTouchMove={stopEvent}
                onTouchEnd={stopEvent}
              >
                <span>Маршрут:</span>
                <RouteWithScroll>
                  {routeInstructions.map((route, index) => (
                    <li key={`${route}_${index}`}>{index+1}. {route}</li>
                  ))}
                </RouteWithScroll>
              </RouteWrap>
            )}
          </MainDistance>
        </MainPopupBody>
      </MainPopup>
    </MainWrap>
  );
};

export default MainPageView;

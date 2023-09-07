"use client";

import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { VehicleData } from "@/types/vehicle";

import LiveCars from "./LiveCars";

const DynamicCarMap = ({
  carData,
  clientSettings,
  selectedVehicle,
}: {
  carData: VehicleData[];
  clientSettings: ClientSettings[];
  selectedVehicle: VehicleData | null; // Make sure it can handle null values
}) => {
  const clientMapSettings = clientSettings?.filter(
    (el) => el?.PropertDesc === "Map"
  )[0]?.PropertyValue;

  const clientZoomSettings = clientSettings?.filter(
    (el) => el?.PropertDesc === "Zoom"
  )[0]?.PropertyValue;

  if (!clientMapSettings) {
    return <>Map Loading...</>;
  }
  let mapCoordinates: [number, number] = [0, 0];

  const regex = /lat:([^,]+),lng:([^}]+)/;
  const match = clientMapSettings.match(regex);

  if (match) {
    const lat = parseFloat(match[1]);
    const lng = parseFloat(match[2]);
    mapCoordinates = [lat, lng];
  }
  const zoom = clientZoomSettings ? parseInt(clientZoomSettings) : 11;

  return (
    <>
      <div className="lg:col-span-4  md:col-span-3  sm:col-span-5 col-span-4 ">
        <div>
          <MapContainer
            id="map"
            center={mapCoordinates}
            zoom={zoom}
            className="w-full z-10"
            style={{ height: '71em' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
            />
            <LiveCars
              carData={carData}
              clientSettings={clientSettings}
              selectedVehicle={selectedVehicle}
            />
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default DynamicCarMap;

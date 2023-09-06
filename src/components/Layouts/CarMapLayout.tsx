'use client'
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import carpng from '../../../public/Images/carImage.png'
import { StaticImageData } from 'next/image';

interface GPSData {
    longitude: number;
    latitude: number;
    Altitude: number;
    Angle: number;
    satellites: number;
    speed: number;
}

interface OSMData {
    display_name: string;
    place_rank: number;
}

interface CarData {
    IMEI: string;
    gps: GPSData;
    OSM: OSMData;
    timestamp: string;
    vehicleMake: string;
    vehicleModel: string;
    vehicleNo: string;
}

interface CarMapProps {
    carData: CarData[];
}



const CarMap: React.FC<CarMapProps> = ({ carData }) => {
    console.log(carData, "layout page")
    const positions: [number, number][] = carData?.map((data) => [
        data.gps.latitude,
        data.gps.longitude,
    ]);

    const pos: string[] = carData?.map((datas) => datas?.vehicleNo);

    // Calculate the center of the positions
    const center: [number, number] = positions.reduce(
        (acc, [lat, lon]) => [acc[0] + lat, acc[1] + lon],
        [0, 0]
    );
    center[0] /= positions.length;
    center[1] /= positions.length;

    // Set zoom level
    const zoom = 12; // Adjust the zoom level as needed

    // Custom icon
    const customIcon = new Icon({
        iconUrl: (carpng as StaticImageData).src,
        iconSize: [38, 38], // Adjust the size as needed
    });

    return (
        <>
            <MapContainer center={center} zoom={zoom} className='w-full' style={{ height: '71.5em' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
                />

                {positions.map((position, index) => (
                    <Marker key={index} position={position} icon={customIcon}>
                        <Popup>
                            <div>
                                <h2>
                                    {carData[index]?.vehicleMake} {carData[index]?.vehicleModel}
                                </h2>
                                <p>IMEI: {carData[index]?.IMEI}</p>
                                <p>Location: {carData[index]?.OSM?.display_name}</p>
                                <p>Timestamp: {carData[index]?.timestamp}</p>
                            </div>
                        </Popup>
                        <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent>
                            {pos[index]}
                        </Tooltip>
                    </Marker>
                ))}
            </MapContainer>
            {/* <button className="bg-blue-300">click to fly</button> */}
        </>
    );
};

export default CarMap;
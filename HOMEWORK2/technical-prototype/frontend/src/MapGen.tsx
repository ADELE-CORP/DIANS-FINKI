import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Header } from './Header';

export default function NorthMacedoniaMap() {
    const [monumentsData, setMonumentsData] = useState(null);
    const [filter, setFilter] = useState('');
    const [filteredData, setFilteredData] = useState(null);

    const customIcon = new L.Icon({
        iconUrl: '/pin.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    });

    const northMacedoniaBounds: L.LatLngBoundsExpression = [
        [40.853659, 20.452902],
        [42.373535, 23.034051]
    ];

    const onEachMonument = (feature: any, latlng: any) => {
        if (feature.geometry && feature.geometry.type === "Point") {
            const marker = L.marker(latlng, { icon: customIcon });

            if (feature.properties && feature.properties.name) {
                marker.bindPopup(`<Popup>${feature.properties.name}</Popup>`);
            }

            return marker;
        }
    };

    useEffect(() => {
        fetch('http://localhost:3000/data')
            .then(res => res.json())
            .then(data => {
                const featureCollection: any = {
                    type: 'FeatureCollection',
                    features: data
                };
                setMonumentsData(featureCollection);
                setFilteredData(featureCollection);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        const mD = monumentsData as any;
        if (mD && mD.features) {
            const filteredFeatures = mD.features.filter((feature: any) =>
                JSON.stringify(feature.properties).toLowerCase().includes(filter.toLowerCase())
            );
            setFilteredData({ ...mD, features: filteredFeatures });
        }
    }, [filter, monumentsData]);

    return (
        <div className='mainn'>
            <Header />
            <div className='miss'>
                <MapContainer
                    center={[41.6086, 21.7453]}
                    zoom={7}
                    style={{ width: '850px', height: "600px" }}
                    maxBounds={northMacedoniaBounds as any}
                    minZoom={7}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {filteredData &&
                        <GeoJSON
                            key={(filteredData as any).features.length}
                            data={filteredData}
                            pointToLayer={onEachMonument as any}
                        />
                    }
                </MapContainer>
            </div>

            <p>
                <input
                    type="text"
                    placeholder="Filter by property..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
                <br></br>
                {filteredData &&
                    <h1>{(filteredData as any).features.length} Results</h1>
                }

                <br></br>

                The "ADELE-CORP" application is a comprehensive digital platform aimed at preserving, exploring, and promoting the rich tapestry of North Macedonia's cultural and historical sites. The application serves as an interactive guide that provides detailed information about various landmarks, historical events, and cultural narratives that form the unique heritage of the region.
                The scope of the application encompasses an extensive database of heritage sites, complete with multimedia galleries, descriptions, historical facts, and visitor information. It facilitates educational endeavors, tourist activities, and scholarly research by offering user-friendly navigation and personalized experiences based on user preferences and interests.
                Designed to be accessible for a diverse audience range, including local residents, international tourists, educators, students, and history enthusiasts, the app aims to foster a deeper understanding and appreciation of North Macedonia's historical and cultural significance.
                Through this application, we are committed to leveraging technology to safeguard cultural narratives and ensure that the legacy of North Macedonia's historical assets is available to a global audience, now and in the future.This architectural design document details the technical framework and strategies employed to realize this vision, ensuring that the application is robust, scalable, and capable of delivering a rich, interactive experience to its users.
            </p>
        </div>
    );
}

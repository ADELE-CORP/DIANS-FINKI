import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Header from "./pages/Header.tsx";
import Footer from "./pages/Footer.tsx";

import pin from "./images/pin.png"


export default function NorthMacedoniaMap() {
    const [monumentsData, setMonumentsData] = useState(null);
    const [filter, setFilter] = useState('');
    const [filteredData, setFilteredData] = useState(null);
    const [favorites, setFavorites] = useState([]);


    const addToFavorites = (monument) => {
        setFavorites(prevFavorites => [...prevFavorites, monument]);
        // Optionally, save to local storage or send to backend here
    };


    const customIcon = new L.Icon({
        iconUrl: pin,
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


//     const onEachMonument = (feature : any, latlng : any) => {
//         if (feature.geometry && feature.geometry.type === "Point") {
//             const marker = L.marker(latlng, { icon: customIcon });
//
//             if (feature.properties && feature.properties.name) {
//                 marker.on('popupopen', (event : any) => {
//                     handlePopupContent(event.popup, feature);
//                 });
//             }
//
//             return marker;
//         }
//     };
//
//     const handlePopupContent = (popup : any, feature : any) => {
//         const uniqueId = `favoriteLink-${feature.properties.id}`; // Unique ID for each link
//
//         const popupContent = `
//    <div>
//        <h3>${feature.properties.name}</h3>
//        <a id="${uniqueId}" href="#">Add to Favorites</a>
//    </div>
// `;
//         popup.setContent(popupContent);
//
//         // Wait for the popup content to be added to the DOM
//         setTimeout(() => {
//             const link = document.getElementById(uniqueId);
//             if (link) {
//                 link.onclick = (event) => {
//                     event.preventDefault();
//                     addToFavorites(feature);
//                 };
//             }
//         }, 10); // Increased delay to ensure DOM update
//     };




    useEffect(() => {
        fetch('http://localhost:4000/data')
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

        console.log(favorites)
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
        // Use flex and flex-col to create a column layout
        <div className="flex flex-col h-screen">
            {/* Make the map container grow and fill the available space */}
            <Header />
            <div className="grow mt-16">
                <MapContainer
                    center={[41.6086, 21.7453]}
                    zoom={7}
                    className="w-full h-full" // Set width and height to full
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
            <Footer />
        </div>

        //     <p>
        //         <input
        //             type="text"
        //             placeholder="Filter by property..."
        //             value={filter}
        //             onChange={(e) => setFilter(e.target.value)}
        //         />
        //         <br></br>
        //         {filteredData &&
        //             <h1>{(filteredData as any).features.length} Results</h1>
        //         }
        //
        //         <br></br>
        //     </p>
        // </div>
    );
}


import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLng, Layer   } from 'leaflet';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./pages/Header.tsx";
import Footer from "./pages/Footer.tsx";
import pin from "./images/pin.png";
import { useLocation } from 'react-router-dom';
import { Feature, Point } from 'geojson';
import { CSSProperties } from 'react';

import { FeatureCollection } from 'geojson';

interface MonumentData extends FeatureCollection<Point, MyGeoJSONProperties> {}

interface MyGeoJSONProperties {
    name: string;
    // add other properties as needed
}



interface MonumentData {
    type: "FeatureCollection";
}

interface Favorite {
    place: Feature<Point, MyGeoJSONProperties>;
    review: string;
}

declare global {
    interface Window {
        addToFavoritesFromPopup: (name: string) => void;
    }
}

interface ReviewModalProps {
    // ... other properties
    onSubmit: (favIndex: number) => void; // favIndex is always a number
}







const styles = {
    favoriteItem: {
        backgroundColor: '#4f83cc',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '5px',
        position: 'relative' as const,
        cursor: 'pointer'
    } as CSSProperties,
    reviewButton: {
        position: 'absolute' as const,
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)'
    }as CSSProperties,
    favoriteItemHover: {
        display: 'block'
    } as CSSProperties
};

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (favIndex: number) => void; // Accepts only number
    reviewText: string;
    setReviewText: (text: string) => void;
    favIndex: number | null;
}


function ReviewModal({ isOpen, onClose, onSubmit, reviewText, setReviewText, favIndex }: ReviewModalProps) {
    const textareaStyle = {
        width: '100%',
        height: '100px',
        marginBottom: '10px'
    };

    return (
        <div style={{ display: isOpen ? 'block' : 'none', position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', zIndex: 1000, border: '1px solid black' }}>
            <textarea
                id={`review-input-${favIndex}`}
                style={textareaStyle}
                placeholder="Leave your review here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
            <button onClick={() => favIndex !== null && onSubmit(favIndex)}>Submit Review</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default function NorthMacedoniaMap() {
    const [monumentsData, setMonumentsData] = useState<MonumentData>({ type: "FeatureCollection", features: [] });
    const [filter, setFilter] = useState('');
    const [filteredData, setFilteredData] = useState<MonumentData>({ type: "FeatureCollection", features: [] });
    const [favorites, setFavorites] = useState<Favorite[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFavIndex, setCurrentFavIndex] = useState<number | null>(null);

    const [currentReviewText, setCurrentReviewText] = useState('');
    const [hoveredFavIndex, setHoveredFavIndex] = useState<number | null>(null);

    useEffect(() => {
        fetch('https://adele-node-mongodb.onrender.com/data')
            .then(res => res.json())
            .then(data => {
                setMonumentsData({ type: 'FeatureCollection', features: data });
                setFilteredData({ type: 'FeatureCollection', features: data });
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);



    const location = useLocation();
    const userEmail = location.state?.email;

    useEffect(() => {
        if (userEmail) {
            toast.success(`Welcome back, ${userEmail}`);
        }
    }, [userEmail]);




    useEffect(() => {
        favorites.forEach((_, index) => {
            const listItem = document.querySelector(`li:nth-child(${index + 1})`);
            if (listItem instanceof HTMLElement) {
                listItem.addEventListener('mouseenter', () => {
                    const reviewButton = document.querySelector(`.review-button-${index}`);
                    if (reviewButton instanceof HTMLElement) {
                        reviewButton.style.display = 'block';
                    }
                });
                listItem.addEventListener('mouseleave', () => {
                    const reviewButton = document.querySelector(`.review-button-${index}`);
                    if (reviewButton instanceof HTMLElement) {
                        reviewButton.style.display = 'none';
                    }
                });
            }
        });
    }, [favorites]);





    useEffect(() => {
        if (monumentsData && monumentsData.features) {
            const filteredFeatures = monumentsData.features.filter((feature) =>
                JSON.stringify(feature.properties).toLowerCase().includes(filter.toLowerCase())
            );
            setFilteredData({ ...monumentsData, features: filteredFeatures });
        }
    }, [filter, monumentsData]);


    const addToFavorites = (name : string) => {
        const monument = monumentsData.features.find(f => f.properties.name === name);
        if (monument && !favorites.some(fav => fav.place.properties.name === name)) {
            setFavorites(prevFavorites => [...prevFavorites, { place: monument, review: "" }]);
            toast(`${monument.properties.name} added to favorites!`);
        } else if (monument) {
            toast.error(`${monument.properties.name} is already in favorites!`);
        }
    };

    window.addToFavoritesFromPopup = addToFavorites;

    const openReviewModal = (index : number) => {
        setCurrentFavIndex(index);
        setCurrentReviewText(favorites[index].review || '');
        setIsModalOpen(true);
    };

    const closeReviewModal = () => {
        setIsModalOpen(false);
        setCurrentReviewText('');
    };

    const submitReview = (favIndex : number) => {
        setFavorites(prev => prev.map((fav, index) => index === favIndex ? { ...fav, review: currentReviewText } : fav));
        setIsModalOpen(false);
        setCurrentReviewText('');
    };

    const customIcon = new L.Icon({
        iconUrl: pin,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    });

    const northMacedoniaBounds = new L.LatLngBounds(
        new L.LatLng(40.853659, 20.452902),
        new L.LatLng(42.373535, 23.034051)
    )
    const onEachMonument = (
        feature: Feature<Point, MyGeoJSONProperties>,
        latlng: LatLng
    ): Layer => {
        if (feature.geometry && feature.geometry.type === "Point") {
            const marker = L.marker(latlng, { icon: customIcon });
            if (feature.properties && feature.properties.name) {
                marker.bindPopup(`
        <div>
          <h3>${feature.properties.name}</h3>
          <button onclick="window.addToFavoritesFromPopup('${feature.properties.name}')">Add to Favorites</button>
        </div>
      `);
            }
            return marker;
        }
        // Handle other geometry types or return a default layer
        return L.layerGroup();
    };


    return (
        <div className="flex flex-col h-screen">
            <Header />
            <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="bg-white shadow p-4 mt-20">
                <div className="max-w-3xl mx-auto flex">
                    <input
                        className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none"
                        type="text"
                        placeholder="Search by name..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
                        // onClick={() => {
                        //     const filteredFeatures = monumentsData.features.filter((feature) =>
                        //         feature.properties.name.toLowerCase().includes(filter.toLowerCase())
                        //     );
                        //     setFilteredData({ ...monumentsData, features: filteredFeatures });
                        // }}
                    >
                        Search
                    </button>
                </div>
                <h1 className="text-center my-4">Total {filteredData.features.length > 0 ? filteredData.features.length - 1   : 0} results found</h1>
                <div className="favorites-list">
                    <h2>Favorites</h2>
                    <ul className="flex flex-col p-2 mt-1 w-100  ">
                        {favorites.map((fav, index) => (
                            <li
                                key={index}
                                style={styles.favoriteItem}
                                onMouseEnter={() => setHoveredFavIndex(index)}
                                onMouseLeave={() => setHoveredFavIndex(null)}
                            >
                                {index + 1}. {fav.place.properties.name}
                                {hoveredFavIndex === index && (
                                    <button
                                        style={styles.reviewButton}
                                        onClick={() => openReviewModal(index)}
                                    >
                                        Already visited? Please leave a review
                                    </button>
                                )}
                                {fav.review && <p>Review: {fav.review}</p>}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            <div className="grow">
                <MapContainer center={[41.6086, 21.7453]} zoom={7} className="w-full h-full" maxBounds={northMacedoniaBounds} minZoom={7}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
                    <GeoJSON key={filteredData.features.length} data={filteredData} pointToLayer={onEachMonument}/>
                </MapContainer>
            </div>
            <Footer />
            <ReviewModal isOpen={isModalOpen} onClose={closeReviewModal} onSubmit={submitReview} reviewText={currentReviewText} setReviewText={setCurrentReviewText} favIndex={currentFavIndex} />
        </div>
    );
}



import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Header from './pages/Header.tsx';
import MainContent from './pages/MainContent.tsx';
import Footer from './pages/Footer.tsx';
import Login from './pages/Login.tsx';
import Register from "./pages/Register.tsx";
import NorthMacedoniaMap from './MapGen.tsx';
import CulturalDistricts from "./pages/CulturalDisctrict.tsx";
import AboutUs from "./pages/AboutUs.tsx";
import {FavoritesProvider} from "./FavoritesContext.tsx";




function App() {
    return (
        <Router>
            <FavoritesProvider>
                <Routes>
                    <Route path="/" element={
                        <>
                            <Header/>
                            <MainContent/>
                            <CulturalDistricts/>
                            <Footer/>
                        </>
                    }/>
                    <Route path="/login" element={
                        <>
                            <Header/>
                            <Login/>
                            <Footer/>
                        </>
                    }/>
                    <Route path="/register" element={
                        <>
                            <Header/>
                            <Register/>
                            <Footer/>
                        </>
                    }/>
                    <Route path="/mapgen" element={<NorthMacedoniaMap/>}/>
                    <Route path="/aboutUs" element={<AboutUs/>}/>
                </Routes>
            </FavoritesProvider>
        </Router>
    );
}

export default App;

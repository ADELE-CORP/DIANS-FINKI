//
//
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './pages/Header.tsx';
import MainContent from './pages/MainContent.tsx';
import Footer from './pages/Footer.tsx';
import Login from './pages/Login.tsx';
import Register from "./pages/Register.tsx";
import NorthMacedoniaMap from './MapGen.tsx';
import CulturalDistricts from "./pages/CulturalDisctrict.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <>
                        <Header />
                        <MainContent />
                        <CulturalDistricts />
                        <Footer />
                    </>
                } />
                <Route path="/login" element={
                    <>
                        <Header />
                        <Login />
                        <Footer />
                    </>
                } />
                <Route path="/register" element={
                    <>
                        <Header />
                        <Register />
                        <Footer />
                    </>
                } />
                <Route path="/mapgen" element={<NorthMacedoniaMap />} />
            </Routes>
        </Router>
    );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Header from './pages/Header.tsx';
// import MainContent from './pages/MainContent.tsx';
// import Footer from './pages/Footer.tsx';
// import Login from './pages/Login.tsx';
// import NorthMacedoniaMap from './MapGen.tsx';
// import CulturalDistricts from "./pages/CulturalDisctrict.tsx";
// import Register from "./pages/Register.tsx";
//
// function App() {
//     return (
//         <Router>
//             <Header />
//             <Routes>
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 <Route path="/" element={<><MainContent /><CulturalDistricts /></>} />
//                 <Route path="/mapgen" element={<NorthMacedoniaMap />} />
//             </Routes>
//             <Footer />
//         </Router>
//     );
// }
//
// export default App;

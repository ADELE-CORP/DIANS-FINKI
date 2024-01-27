//
//


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





//
// function App() {
//     const [userEmail, setUserEmail] = useState('');
//
//     // Function to simulate user login, call this when the user logs in
//     const simulateUserLogin = (email : string) => {
//         setUserEmail(email); // Replace with actual login logic
//     };
//
//     return (
//         <Router>
//             <Header userEmail={userEmail} />
//             <Routes>
//                 <Route path="/" element={
//                     <>
//                         <MainContent />
//                         <CulturalDistricts />
//                         <Footer />
//                     </>
//                 } />
//                 <Route path="/login" element={
//                     <>
//                         <Login setUserEmail={simulateUserLogin} />
//                         <Footer />
//                     </>
//                 } />
//                 <Route path="/register" element={
//                     <>
//                         <Register />
//                         <Footer />
//                     </>
//                 } />
//                 <Route path="/mapgen" element={<NorthMacedoniaMap />} />
//                 <Route path="/profile" element={<Profile userEmail={userEmail} />} />
//             </Routes>
//         </Router>
//     );
// }
//
// export default App;



function App() {



    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <>
                        <Header  />
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
                <Route path="/aboutUs" element={<AboutUs />} />
            </Routes>
        </Router>
    );
}

export default App;

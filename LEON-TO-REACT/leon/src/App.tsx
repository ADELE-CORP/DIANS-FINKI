import React, { useState } from 'react';
import Header from './Header';
import LoginModal from './LoginModal';
import MainContent from './MainContent';
import Footer from './Footer';
import CulturalDisctrict from "./CulturalDisctrict.tsx";

function App() {
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleLoginClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setShowLoginModal(true);
    };

    const handleCloseModal = () => {
        setShowLoginModal(false);
    };

    return (
        <div>
            <Header onLoginClick={handleLoginClick} />
            {showLoginModal && <LoginModal onClose={handleCloseModal} />}
            <MainContent />
            <CulturalDisctrict />
            <Footer />
        </div>
    );
}

export default App;

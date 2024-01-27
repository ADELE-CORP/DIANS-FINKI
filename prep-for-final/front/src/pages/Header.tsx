


import React, { useState, useEffect } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import {  localStorageKey  } from '../FavoritesContext.tsx';



function Header() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['jwt']);
    const { t } = useTranslation();
    const [isLoggedIn, setIsLoggedIn] = useState(!!cookies.jwt);
    const [version, setVersion] = useState(0); // New state variable

    const handleLoginClick = () => {
        navigate('/login');
    };

    // const handleSignOut = () => {
    //     // Clear the JWT cookie
    //     removeCookie('jwt', { path: '/' });
    //     // Increment version to force a re-render
    //     setVersion(prevVersion => prevVersion + 1);
    //     // Delay the navigation to the login page
    //     setTimeout(() => {
    //         navigate('/login');
    //     }, 0);
    // };



    const location = useLocation();
    const userEmail = location.state?.email;

    const handleSignOut = async () => {
        // Clear the JWT cookie
        await removeCookie('jwt', { path: '/' });
        // Set isLoggedIn to false
        setIsLoggedIn(false);

        localStorage.removeItem('sessionId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem(`${localStorageKey}-${userEmail}`);
        location.state = {};

        navigate('/login');
    };


    useEffect(() => {
        // Update the isLoggedIn state when cookies.jwt changes
        setIsLoggedIn(!!cookies.jwt);
    }, [cookies.jwt, version]); // Listen to changes in version as well

    return (
        <nav>
            <ul>
                <li><Link to="/">{t('home')}</Link></li>
                <li><Link to="/aboutUs">{t('aboutUs')}</Link></li>
                <li><Link to="/mapgen">{t('culturalDistricts')}</Link></li>
                <li id="log-in">
                    {isLoggedIn ? (
                        <a onClick={handleSignOut}>{t('signOut')}</a>
                    ) : (
                        <a onClick={handleLoginClick}>{t('login')}</a>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Header;


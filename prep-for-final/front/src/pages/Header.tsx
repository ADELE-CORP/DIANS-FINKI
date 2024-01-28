


    import  { useState, useEffect } from 'react';
    import {Link, useLocation, useNavigate} from 'react-router-dom';
    import { useCookies } from 'react-cookie';
    import { useTranslation } from 'react-i18next';
    import {  localStorageKey  } from '../FavoritesContext.tsx';



    function Header() {
        const navigate = useNavigate();
        const [cookies, removeCookie] = useCookies(['jwt']);
        const { t } = useTranslation();
        const [isLoggedIn, setIsLoggedIn] = useState(!!cookies.jwt);

        const handleLoginClick = () => {
            navigate('/login');
        };

        const location = useLocation();





        const handleSignOut = async () => {
            // Clear the JWT cookie
            await removeCookie('jwt', { path: '/' });
            // Set isLoggedIn to false
            setIsLoggedIn(false);

            // Get the sessionId and userEmail from local storage
            const sessionId = localStorage.getItem('sessionId');
            const userEmail = localStorage.getItem('userEmail');

            console.log(sessionId);
            console.log(userEmail);

            const keys = Object.keys(localStorage);
            for(let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (key.startsWith(`${localStorageKey}-${sessionId}-${userEmail}`)) {
                    localStorage.removeItem(key);
                }
            }

            // Remove the user's favorites from local storage
            localStorage.removeItem(`${localStorageKey}-${sessionId}-${userEmail}`);

            // Clear the sessionId and userEmail from local storage
            localStorage.removeItem('sessionId');
            localStorage.removeItem('userEmail');

            // Wait a bit before accessing the keys
            setTimeout(() => {
                console.log(localStorage.getItem('sessionId'));
                console.log(localStorage.getItem('userEmail'));
            }, 1000);

            location.state = {};

            navigate('/login');
        };




        useEffect(() => {
            // Update the isLoggedIn state when cookies.jwt changes
            setIsLoggedIn(!!cookies.jwt);
        }, [cookies.jwt]);

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


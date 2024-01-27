// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
// import { useTranslation } from 'react-i18next';
//
// function Header() {
//     const navigate = useNavigate();
//     const [cookies, removeCookie] = useCookies(['jwt']);
//     const { t } = useTranslation();
//
//     const handleLoginClick = () => {
//         navigate('/login');
//     };
//
//     const handleHomeClick = () => {
//         navigate('/');
//     };
//
//     const handleSectionClick = (sectionId) => {
//         if (sectionId === 'home') {
//             navigate('/');
//         } else {
//             navigate(`/#${sectionId}`);
//         }
//     };
//
//     const handleSignOut = () => {
//         // Clear the JWT cookie
//         removeCookie('jwt', { path: '/' });
//         // Redirect to the home page or login page
//         navigate('/login');
//     };
//
//     return (
//         <nav>
//             <ul>
//                 <li><a onClick={() => handleSectionClick('home')}>{t('home')}</a></li>
//                 <li><a onClick={() => handleSectionClick('aboutUs')}>{t('aboutUs')}</a></li>
//                 <li><a onClick={() => handleSectionClick('culturalDistricts')}>{t('culturalDistricts')}</a></li>
//                 {cookies.jwt ? (
//                     <li id="log-in">
//                         <a onClick={handleSignOut}>{t('signOut')}</a>
//                     </li>
//                 ) : (
//                     <li id="log-in">
//                         <a onClick={handleLoginClick}>{t('login')}</a>
//                     </li>
//                 )}
//             </ul>
//         </nav>
//     );
// }
//
// export default Header;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';

function Header() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['jwt']);
    const { t } = useTranslation();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignOut = () => {
        // Clear the JWT cookie
        removeCookie('jwt', { path: '/' });
        // Redirect to the home page or login page
        navigate('/login');
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">{t('home')}</Link></li>
                <li><Link to="/aboutUs">{t('aboutUs')}</Link></li>
                <li><Link to="/mapgen">{t('culturalDistricts')}</Link></li>
                {cookies.jwt ? (
                    <li id="log-in">
                        <a onClick={handleSignOut}>{t('signOut')}</a>
                    </li>
                ) : (
                    <li id="log-in">
                        <a onClick={handleLoginClick}>{t('login')}</a>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Header;




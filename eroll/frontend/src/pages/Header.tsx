// import { useNavigate } from 'react-router-dom';
//
// function Header() {
//     const navigate = useNavigate();
//
//     const handleLoginClick = () => {
//         navigate('/login'); // assuming the path to your login page is '/login'
//     };
//
//     return (
//         <nav className="bg-gray-100 fixed top-0 left-0 right-0 z-50">
//             <ul className="flex justify-between items-center p-4">
//                 <li className="mr-6">
//                     <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">HOME</a>
//                 </li>
//                 <li className="mr-6">
//                     <a href="#aboutUs" className="text-blue-600 hover:text-blue-700 font-semibold">ABOUT US</a>
//                 </li>
//                 <li className="mr-6">
//                     <a href="#contactUs" className="text-blue-600 hover:text-blue-700 font-semibold">CONTACT US</a>
//                 </li>
//                 <li className="mr-6">
//                     <a href="#culturalDisctrics" className="text-blue-600 hover:text-blue-700 font-semibold">CULTURAL DISTRICTS</a>
//                 </li>
//                 <li className="mr-6">
//                     <button
//                         onClick={handleLoginClick}
//                         className="bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-600 font-semibold py-2 px-4 rounded-full"
//                     >
//                         LOGIN
//                     </button>
//                 </li>
//             </ul>
//         </nav>
//     );
// }
//
// export default Header;


//
// import { useNavigate } from 'react-router-dom';
//
// function Header() {
//     const navigate = useNavigate();
//
//     const handleLoginClick = () => {
//         navigate('/login'); // assuming the path to your login page is '/login'
//     };
//
//     const handleHomeClick = () => {
//         navigate('/'); // Navigate to the root path
//     };
//
//
//
//
//     return (
//         <nav>
//             <ul>
//                 <li><a href="#" onClick={handleHomeClick}>HOME</a></li>
//                 <li><a href="#aboutUs" onClick={handleHomeClick}>ABOUT US</a></li>
//                 <li><a href="#contactUs" onClick={handleHomeClick}>CONTACT US</a></li>
//                 <li><a href="#culturalDisctrics" onClick={handleHomeClick}>CULTURAL DISTRICTS</a></li>
//                 <li id="log-in"><a className="active" href="#about" onClick={handleLoginClick}>LOGIN</a></li>
//             </ul>
//         </nav>
//     );
// }
//
// export default Header;


import {useLocation, useNavigate} from 'react-router-dom';
import { useCookies } from "react-cookie";

function Header() {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleSignOut = () => {
        // Clear the JWT cookie
        removeCookie('jwt', { path: '/' });
        // Redirect to the home page or login page
        navigate('/login');
    };

    const location = useLocation();
    const userEmail = location.state?.email;

    return (
        <nav>
            <ul>
                <li><a href="#" onClick={handleHomeClick}>HOME</a></li>
                <li><a href="#aboutUs">ABOUT US</a></li>
                <li><a href="#contactUs">CONTACT US</a></li>
                <li><a href="#culturalDisctrics">CULTURAL DISTRICTS</a></li>
                {cookies.jwt ? (
                  <li id="log-in"><a href="#login" onClick={handleSignOut}>SIGN OUT</a>  </li>
                ) : (
                    <li id="log-in"><a href="#login" onClick={handleLoginClick}>LOGIN</a></li>
                )}
            </ul>
        </nav>
    );
}

export default Header;




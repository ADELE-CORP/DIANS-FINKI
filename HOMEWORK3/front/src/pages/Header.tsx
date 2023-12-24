


import { useNavigate} from 'react-router-dom';
import { useCookies } from "react-cookie";

function Header() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['jwt']);

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



    return (
        <nav>
            <ul>
                <li><a  onClick={handleHomeClick}>HOME</a></li>
                <li><a>ABOUT US</a></li>
                <li><a>CULTURAL DISTRICTS</a></li>
                {cookies.jwt ? (
                  <li id="log-in"><a onClick={handleSignOut}>SIGN OUT</a>  </li>
                ) : (
                    <li id="log-in"><a onClick={handleLoginClick}>LOGIN</a></li>
                )}
            </ul>
        </nav>
    );
}

export default Header;




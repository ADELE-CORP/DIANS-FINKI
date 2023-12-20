import React from 'react';

function Header({ onLoginClick  }) {
    return (
        <nav>
            <ul>
                <li><a href="#">HOME</a></li>
                <li><a href="#aboutUs">ABOUT US</a></li>
                <li><a href="#contactUs">CONTACT US</a></li>
                <li><a href="#culturalDisctrics">CULTURAL DISTRICTS</a></li>
                <li id="log-in"><a className="active" href="#about" onClick={onLoginClick}>LOGIN</a></li>
            </ul>
        </nav>
    );
}

export default Header;

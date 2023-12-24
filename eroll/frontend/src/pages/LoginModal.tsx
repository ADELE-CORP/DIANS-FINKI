import React, { useState } from 'react';

function LoginModal() {
    const [showModal, setShowModal] = useState(false);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <div>
            <button onClick={handleShow}>Login</button>
            {showModal && (
                <div id="id01" className="modal">
                    <form className="modal-content animate" action="" method="post">
                        <span onClick={handleClose} className="close" title="Close Modal">&times;</span>
                        <div className="container">
                            <img src="../images/secondStar.jpg" alt="star" className="star" id="secondStar" />
                            <h3 style={{ textAlign: 'center' }}>LOG IN</h3>
                            <input className="inputLogIn" type="text" placeholder="Email" name="uname" required />
                            <input className="inputLogIn" type="password" placeholder="Password" name="psw" required />
                            <button type="submit">ENTER</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default LoginModal;

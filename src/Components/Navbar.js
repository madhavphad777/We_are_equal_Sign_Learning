import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg fixed-top py-3" id="mainNav">
            <div className="container px-4 px-lg-5 d-flex justify-content-between align-items-center">
                <div className="logo">
                    <h1>
                        <Link to="/" className="navbar-brand mb-0 h1">We Are Equal</Link>
                    </h1>
                    {/* Uncomment below if you prefer to use an image logo */}
                    {/* <Link to="/"><img src="/static/assets/img/logo.png" alt="Logo" className="img-fluid"/></Link> */}
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                        <li className="nav-item"><Link to='/sign-kit/home' className="nav-link active">Home</Link></li>
                        <li className="nav-item"><Link to='/sign-kit/convert' className="nav-link">Convert</Link></li>
                        <li className="nav-item"><Link to='/sign-kit/learn-sign' className="nav-link">Learn Sign</Link></li>
                        <li className="nav-item"><Link to='/sign-kit/all-videos' className="nav-link">Videos</Link></li>
                        <li className="nav-item"><Link to='/sign-kit/feedback' className="nav-link">Feedback</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

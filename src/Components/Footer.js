import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className="page-footer font-small unique-color-dark mt-5">

            <div className='container-fluid text-white pt-3' style={{backgroundColor:'#00428a'}}>
                <div className="container text-md-left mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase font-weight-bold">WE ARE EQUAL</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width:'60px'}}/>
                            <p className='footer-text'>A comprehensive toolkit containing various features related to Indian Sign Language.</p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase font-weight-bold">Services</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width:'60px'}} />
                            <p><Link to='/sign-kit/convert' className='footer-link'>Convert</Link></p>
                            <p><Link to='/sign-kit/learn-sign' className='footer-link'>Learn Sign</Link></p>
                            <p><Link to='/sign-kit/all-videos' className='footer-link'>Videos</Link></p>
                        </div>

                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase font-weight-bold">Useful links</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width:'60px'}} />
                            <p><Link to='/sign-kit/home' className='footer-link'>Home</Link></p>
                            <p><Link to='/sign-kit/feedback' className='footer-link'>Feedback</Link></p>
                            <p><Link to='https://job-portal-2-p5bv.onrender.com' className='footer-link' target='blank'>Career</Link></p>
                        </div>

                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase font-weight-bold">Contact</h6>
                            <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{width:'60px'}}/>
                            <p><i className="fa fa-lg fa-home me-3 ms-0"></i><span className='footer-text'> We Are Equal</span></p>
                            <p><i className="fa fa-envelope me-3 ms-0"></i><span className='footer-text'> weareequal.contact@gmail.com</span> </p>
                        </div>
                    </div>
                </div>

                <div className="footer-copyright text-center py-3">© 2024 Copyright @We are Equal@</div>
            </div>
            </footer>
    )
}

export default Footer
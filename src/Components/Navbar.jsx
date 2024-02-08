// Navbar.js
import React from 'react';
import logo from '../logo.svg';
import '../css/bootstrap.min.css'

import '../css/style.css'

// Import external stylesheets
import '../lib/animate/animate.min.css'; // Animation library styles
import '../lib/owlcarousel/assets/owl.carousel.min.css'; // Owl Carousel styles
import '../lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css'; 

// Import external icon fonts
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome icons
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap icons
import { Link } from 'react-router-dom';

const Navbar = () => {
    const navItemStyle = { color: '#86B817' }; // Set the desired color

  return (
    <div className="container-fluid position-relative p-0">
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar px-4 px-lg-5 py-3 py-lg-0">
        <Link to="/" className="navbar-brand p-0">
          <h1 className="text-primary m-0"><i className="fa fa-map-marker-alt me-3"></i>Tourist</h1>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="fa fa-bars"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <Link to="/Home" className="nav-item nav-link" >Home</Link>
            <Link to="/about" className="nav-item nav-link">About</Link>
            <Link to="/service" className="nav-item nav-link">Services</Link>
            <Link to="/Listproducts" className="nav-item nav-link">MarketPlace</Link>
            {/* <div className="nav-item dropdown">
              <Link to="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Pages</Link>
              <div className="dropdown-menu m-0">
                <Link to="/destination" className="dropdown-item">Destination</Link>
                <Link to="/booking" className="dropdown-item">Booking</Link>
                <Link to="/team" className="dropdown-item">Travel Guides</Link>
                <Link to="/testimonial" className="dropdown-item">Testimonial</Link>
                <Link to="/404" className="dropdown-item">404 Page</Link>
              </div>
            </div> */}
            <Link to="/contact" className="nav-item nav-link">Contact</Link>
          </div>
          <Link to="/login" className="btn btn-primary rounded-pill py-2 px-4">Register</Link>
        </div>
      </nav>
      
    </div>
  );
};

export default Navbar;
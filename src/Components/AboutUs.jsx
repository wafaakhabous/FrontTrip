import React from 'react';
import '../css/bootstrap.min.css';
import '../css/style.css';
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className="container-xxl py-5 ">
      <div className="container">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">About Us</h6>
          <h1 className="mb-3">About Us</h1>
        </div>
        <div className='row about-us-container'>
            <div className='col-9 about-us-text'>
            Welcome to our vibrant community of travel enthusiasts at [Your Trip Blog Web Application Name]! We are passionate about exploring the world and believe that every journey is a story waiting to be told. Our web application is not just a platform; it's a gateway to a world of exciting adventures and shared experiences. Whether you're a seasoned globetrotter or a first-time explorer, [Your Trip Blog Web Application Name] is designed to inspire, connect, and empower you to document and share your unique travel tales effortlessly. From awe-inspiring landscapes to hidden gems, we provide a seamless and user-friendly space where you can chronicle your adventures, connect with fellow travelers, and discover new destinations. Join us in celebrating the spirit of exploration and let [Your Trip Blog Web Application Name] be your companion on the journey of a thousand stories. Happy travels!
            </div>
            <div className='col-2'>
                <img style={{height: 230}} src='https://img.freepik.com/free-photo/travel-concept-with-baggage_23-2149153260.jpg?size=626&ext=jpg&ga=GA1.2.2027902285.1696892702&semt=sph'/>
            </div>
        </div>
      </div>
    </div>
    );
}

export default AboutUs;
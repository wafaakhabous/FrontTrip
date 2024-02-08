import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import NavBar from '../Blogs/Navbar';
import SideBar from '../Blogs/SideBar';
import UserSideBar from '../Blogs/UserSideBar';
import Trip from './Trip';
import ItinerariesMap from '../ItinerariesMap';



const TripHome = () => {
    // Retrieve the object from sessionStorage
    const user = sessionStorage.getItem('user');
    const userObject = JSON.parse(user);
    const itineraries = [
        { city: 'Rabat' },
        { city: 'Casablanca' },
        // Add more itineraries as needed
      ];
    return (
        <div   >
        <NavBar></NavBar>
        <Row style={{height: '100vh'}} gutter={[16, 16]}>
           <Col span={4} style={{width: 'max-content'}} >
           </Col>
           <Col span={16}>
               <Row>
               { userObject.trips.map((trip) => (
                <Trip trip={trip}/>
               ))
               }
               </Row>
           </Col>
           <Col span={4}>
           </Col>
        </Row>   
     </div>
    )
}

export default TripHome;
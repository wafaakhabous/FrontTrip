import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Avatar, Image, Input, Tag } from 'antd';
import NavBar from './Blogs/Navbar';
import MarketPlaceProductCard from './MarketPlaceProductCard';



const SavedProducts = () => {
    const savedProducts = sessionStorage.getItem('savedProducts');
    const savedProductsObject = JSON.parse(savedProducts);
    return (
        <div>
            <NavBar/>
            <Row className='mt-3 d-flex justify-content-between'>
                {
                    savedProductsObject.map((product) => 
                    <Col span={5}>
                    <MarketPlaceProductCard
                     id={product.id}
                     name={product.name}
                     image={product.image}
                     price={product.price}
                     />
                    </Col>
                    )
                }
            </Row>
        </div>
    )
}

export default SavedProducts;
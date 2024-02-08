import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Avatar, Image, Input, Tag } from 'antd';
import NavBar from './Blogs/Navbar';
import MarketPlaceSideBar from './MarketPlaceSidebar';
import {HeartFilled, SearchOutlined, StarFilled } from '@ant-design/icons';
import TopSells from './TopSells';
import MarketPlaceProductCard from './MarketPlaceProductCard';
import MarketPlaceCategoryCard from './MarketPlaceCategoryCard';

const ProductsList = () => {
    const [products, setProducts] = useState([]);
// Fetch product data from your backend
useEffect(() => {
    // Replace the URL with your backend API endpoint
    fetch('http://localhost:8097/api/products/getAll')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
    }, []);

    return(
        <div>
            <NavBar/>
            <Row className='mt-3 d-flex justify-content-between'>
                <Col span={3}>
                    <MarketPlaceSideBar/>
                </Col>
                <Col span={20}>
                <Row className='mt-5 d-flex justify-content-between'>
                    {(products != undefined ? 
                       products.map((product) => 
                       <Col span={5}>
                        <MarketPlaceProductCard
                        name={product.name}
                        price={product.price}
                        image={product.image}
                       />
                       </Col>
                    ): ''
                    ) }
                </Row>
                </Col>
            </Row>
        </div>
    )

}

export default ProductsList;
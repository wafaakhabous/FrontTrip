import { Avatar, Card, Col, Row, Tag } from 'antd';
import React, { useEffect, useState } from 'react';


const TopSells = () => {
    const [products, setProducts] = useState([]);
// Fetch product data from your backend
useEffect(() => {
    // Replace the URL with your backend API endpoint
    fetch('http://localhost:8097/api/products/getAll')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
    }, []);
    return (
        <Card>
            <Row>
                <Col span={24} style={{color: '#0C111F', fontFamily: 'Inter', fontSize: 20}}>
                    TOP SELLS
                </Col>
            </Row>
            {
                products.slice(0,6).map((product) => 
                <Row className='mt-3 d-flex align-items-center'>
                <Col span={4}>
                    <Avatar style={{boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.1)'}} src={'../images/' + product.image} size={40} />
                </Col>
                <Col span={18}>
                  {product.name}
                </Col>
                <Col span={2}>
                    <Tag style={{fontFamily : 'Mulish', color:'#FFFFFF', backgroundColor: '#0C111F'}}>{product.price} $</Tag>
                </Col>
                </Row>
                )
            }
            {/* <Row className='mt-3 d-flex align-items-center'>
                <Col span={4}>
                    <Avatar style={{boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.1)'}} src='/images/powerbankRose.jpg' size={40} />
                </Col>
                <Col span={18}>
                  Power Bank 20K USB-A & C
                </Col>
                <Col span={2}>
                    <Tag style={{fontFamily : 'Mulish', color:'#FFFFFF', backgroundColor: '#0C111F'}}>60 $</Tag>
                </Col>
            </Row>
            <Row className='mt-3 d-flex align-items-center'>
                <Col span={4}>
                    <Avatar style={{boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.1)'}} src='/images/applewatch7.jpeg' size={40} />
                </Col>
                <Col span={18}>
                  Apple Watch Series 7 GPS
                </Col>
                <Col span={2}>
                    <Tag style={{fontFamily : 'Mulish', color:'#FFFFFF', backgroundColor: '#0C111F'}}>200 $</Tag>
                </Col>
            </Row>
            <Row className='mt-3 d-flex align-items-center'>
                <Col span={4}>
                    <Avatar style={{boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.1)'}} src='/images/appleairpods2.jfif' size={40} />
                </Col>
                <Col span={18}>
                  Apple Airpods 2nd Generation
                </Col>
                <Col span={2}>
                    <Tag style={{fontFamily : 'Mulish', color:'#FFFFFF', backgroundColor: '#0C111F'}}>200 $</Tag>
                </Col>
            </Row>
            <Row className='mt-3 d-flex align-items-center'>
                <Col span={4}>
                    <Avatar style={{boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.1)'}} src='/images/appleheadset.jpg' size={40} />
                </Col>
                <Col span={18}>
                  Apple Headset
                </Col>
                <Col span={2}>
                    <Tag style={{fontFamily : 'Mulish', color:'#FFFFFF', backgroundColor: '#0C111F'}}>150 $</Tag>
                </Col>
            </Row>
            <Row className='mt-3 d-flex align-items-center'>
                <Col span={4}>
                    <Avatar style={{boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.1)'}} src='/images/drysuit.jpg' size={40} />
                </Col>
                <Col span={18}>
                  Aqualung Fusion Bullet Drysuit
                </Col>
                <Col span={2}>
                    <Tag style={{fontFamily : 'Mulish', color:'#FFFFFF', backgroundColor: '#0C111F'}}>3400 $</Tag>
                </Col>
            </Row> */}
        </Card>
    )

}

export default TopSells;
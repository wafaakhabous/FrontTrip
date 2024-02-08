import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Avatar, Image, Input, Tag } from 'antd';
import {HeartFilled, SearchOutlined, StarFilled } from '@ant-design/icons';


const MostRecentProduct = () => {
    return ( 
        <Card className='shadow'>
        <Row>
            <Col span={12}>
                <img src={'../images/a39a7fa9-a5fd-43a7-9f0e-ca765514fac0_appleheadset.jpg'} style={{height: 250}}/>
            </Col>
            <Col span={12}>
             <Row>
                <Col span={24} style={{color: '#0C111F', fontFamily: 'Inter'}}>
                APPLE HEADSET
                </Col>
             </Row>
             <Row className='mt-3'>
                <Col span={3}>
                    <StarFilled style={{color : '#FBE329'}}/>
                </Col>
                <Col span={3}>
                    <StarFilled style={{color : '#FBE329'}}/>
                </Col>
                <Col span={3}>
                    <StarFilled style={{color : '#FBE329'}}/>
                </Col>
                <Col span={3}>
                    <StarFilled style={{color : '#FBE329'}}/>
                </Col>
                <Col span={3}>
                    <StarFilled style={{color : '#FBE329'}}/>
                </Col>
             </Row>
             <Row className='mt-3'>
                <Col span={24}>
                Wireless Headphone with 40mm drives , 22 hours of listening time Apple WI chip & class 1 .
                </Col>
             </Row>
             <Row className='mt-3'>
                <Col span={8}>
                    <Tag style={{backgroundColor : '#C7923E', color: 'white', fontSize: 20, height:25, fontFamily : 'Mulish'}}>200 $</Tag>
                </Col>
             </Row>
             <Row className='mt-3 d-flex align-items-center justify-content-around'>
                <Col span={3} style={{fontFamily: 'Inter'}}>
                    Color 
                </Col>
                <Col span={3}>
                    <Avatar style={{backgroundColor: 'red'}}/>
                </Col>
                <Col span={3}>
                    <Avatar style={{backgroundColor: '#C7923E'}}/>
                </Col>
                <Col span={3}>
                    <Avatar style={{backgroundColor: '#0500FF'}}/>
                </Col>
              </Row>
              <Row className='mt-3 d-flex justify-content-around'>
                <Col span={3}>
                    <Button style={{borderColor: '#0C111F'}} className='d-flex align-items-center'>
                        <HeartFilled style={{color: '#0C111F'}}/>
                    </Button>
                </Col>
                <Col span={6}>
                    <Button style={{borderColor: '#0C111F', color:'#0C111F',fontFamily : 'Mulish'}} className='d-flex align-items-center'>
                        Add to Cart
                    </Button>
                </Col>
                <Col span={6}>
                    <Button style={{borderColor: '#0C111F', backgroundColor: '#0C111F',color:'white',fontFamily : 'Mulish'}} className='d-flex align-items-center'>
                        Buy Now
                    </Button>
                </Col>
              </Row>
            </Col>
        </Row>
    </Card>
    )
}

export default MostRecentProduct;
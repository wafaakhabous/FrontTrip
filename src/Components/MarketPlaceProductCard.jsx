import { DollarCircleFilled, HeartFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Row, Col, Button } from 'antd';
import React, { useEffect, useState } from 'react';



const MarketPlaceProductCard = ({id,name, price,description, quantity, category,date, image, addToCart}) => {
    const [refresh,setRefresh] = useState(false);
    const addTosavedProducts = () => {
        let savedProducts = sessionStorage.getItem('savedProducts');
        let savedProductsObject = JSON.parse(savedProducts);
        if(savedProductsObject == null){
            savedProductsObject = [];
        }
        if(!savedProductsObject.includes(id)) {
            savedProductsObject.push(id);
        }
        sessionStorage.setItem('savedProducts', JSON.stringify(savedProductsObject));
        setRefresh(!refresh);
    }

    const isSaved = (id) => {
        let savedProducts = sessionStorage.getItem('savedProducts');
        let savedProductsObject = JSON.parse(savedProducts);
        if(savedProductsObject != null){
            return savedProductsObject.includes(id);
        }
        return false;
    }
    return (
        <Card>
            <Row className='d-flex justify-content-center'>
                <Col span={15}>
                    <img src={'../images/' + image} style={{height: 100}}/>
                </Col>
                {
                    (isSaved(id) ? 
                    <Col span={2} style={{left: 35, bottom: 15}}>
                    <HeartFilled style={{color:'#F04461'}}/>
                    </Col>
                    :'')
                }
            </Row>
            <Row className='text-center mt-3'>
                <Col span={24} style={{fontFamily : 'Mulish'}}>
                    {name}
                </Col>
            </Row>
            <Row className='text-center mt-2'>
                <Col span={24} style={{fontFamily : 'Mulish'}}>
                    {price} $
                </Col>
            </Row>
            <Row className='mt-2 flex justify-content-between' style={{float:"inline-start"}}>
                {
                    isSaved(id) ? '' :                 
                <Col span={4}>
                    <Button onClick={addTosavedProducts} style={{borderColor: '#F04461'}} className='d-flex align-items-center'>
                        <HeartFilled style={{color: '#F04461'}}/>
                    </Button>
                </Col>
                }

                <Col span={4}>
                    <Button style={{borderColor: '#EEAF22', color:'#0C111F',fontFamily : 'Mulish'}} className='d-flex align-items-center' onClick={addToCart}>
                      <ShoppingCartOutlined style={{color: '#EEAF22'}}/>
                    </Button>
                </Col>
                <Col span={4}>
                    <Button style={{borderColor: '#41DA7E', color:'#41DA7E',fontFamily : 'Mulish'}} className='d-flex align-items-center'>
                       <DollarCircleFilled/>
                    </Button>
                </Col>
            </Row>
        </Card>
    )
}

export default MarketPlaceProductCard;
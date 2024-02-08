import { Card, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';


const MarketPlaceCategoryCard = ({name, image}) => { 

    return (
        <Card className='shadow'>
            <Row className='d-flex align-items-center'>
                <Col span={12}>
                    <img src={'/images/'+image} style={{height: 50}}/>
                </Col>
                <Col span={10} style={{fontFamily : 'Mulish'}}>
                    {name}
                </Col>
            </Row>
        </Card>
    )
}

export default MarketPlaceCategoryCard;
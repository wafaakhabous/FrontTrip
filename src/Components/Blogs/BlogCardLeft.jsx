import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Image, Button, Avatar, Tag } from 'antd';

const BlogCardLeft = ({firstname, lastname, datestart, dateend, itineraries}) => {
    const showMore = () => {
        window.location.href = '/Blogs'
    }
    return (
        <Row>
            <Col span={11} style={{height: 400}}>
                <Image
                  src='/images/BlogImage.png'
                  height={400}
                />
            </Col>
            <Col span={11} style={{backgroundColor : 'white', height: 400, marginLeft : 90}}>
                <Row className='mt-4'>
                    <Col span={24} style={{fontFamily : 'Lora'}}>
                        <Row className='flex align-items-center'>
                            <Col span={4}>
                            <Avatar
                            src= '/images/user.avif'
                            size={50}
                            />
                            </Col>
                            <Col span={10} style={{fontFamily : 'Work Sans', right: 30}}>
                            {(firstname.slice(0,-1) == "" ? firstname.slice(1,firstname.length) : firstname.slice(0,-1)) + ' ' + (lastname.slice(0,-1) == "" ? lastname.slice(1,lastname.length) : lastname.slice(0,-1)) }
                            </Col>
                            <Col span={5}>
                                <Tag color="success">{datestart}</Tag>
                            </Col>
                            <Col span={4}>
                                <Tag color="error">{dateend}</Tag>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col span={18} style={{fontFamily : 'Lora', color: '#0C111F'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat elit sed pretium, egestas sed sit. Fames tincidunt rhoncus viverra eu ut scelerisque. Erat orci scelerisque adipiscing potenti sollicitudin semper aliquam in ultricies. Sem vitae amet, egestas aliquam mi a arcu. Feugiat at dignissim massa ornare. Platea eu orci enim est egestas fusce cras. Purus diam est vitae faucibus enim. Ultricies nunc vel magnis gravida quis sodales. Lacus, elit pellentesque massa odio. Sed dictumst condimentum sit quis 
                    </Col>
                </Row>
                <Row className='mt-3'>
                    {itineraries.map((elem) => (
                        <Col span={6} className='d-flex'>
                            <Avatar src='/images/marker.png'/>
                            <Tag className='d-flex align-items-center' style={{fontFamily : 'Mulish'}}>{elem.cityName}</Tag>
                        </Col>
                    ))}
                </Row>
                <Row className='mt-3'>
                    <Col span={6}>
                        <Button onClick={showMore} type='primary' style={{fontFamily : 'Mulish', backgroundColor: '#C7923E', color: 'white'}}>Learn More</Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default BlogCardLeft;
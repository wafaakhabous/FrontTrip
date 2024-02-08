import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Avatar, Image, Input, Tag, Modal, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';




const LeftChatMessage = ({chat, firstname, lastName, key}) => {

    return (
        <Row className='mt-3' key={key} style={{width: 1200, height: 100}}>
            <Col span={12} style={{backgroundColor: '#ECEAEA', borderRadius: '16px 16px 16px 0px'}}>
                <Row className='m-3 d-flex align-items-center'>
                <Col span={3}>
                <Avatar size={64} icon={<UserOutlined />} />
            </Col>
            <Col span={6}>
                {firstname }
            </Col>
            <Col span={12} className='d-flex justify-content-end'>
                        {chat}
            </Col>
                    
                </Row>
            </Col>
            <Col span={12}>
            </Col>
        </Row>
    )
}

export default LeftChatMessage;
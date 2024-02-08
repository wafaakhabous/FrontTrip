import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Avatar, Image, Input, Tag, Modal, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';




const RightChatMessage = ({chat, firstname, lastName, key}) => {

    return (
        <Row key={key} style={{width: 1200, height: 100}}>
            <Col span={12}>
            </Col>
            <Col span={12} style={{backgroundColor: '#ECEAEA', borderRadius: '16px 16px 0px 16px'}}>
                <Row className='mt-3 d-flex align-items-center justify-content-end'>
                    <Col span={15}>
                        {chat}
                    </Col>
                <Col span={3}>
                {firstname}
                </Col>
                 <Col span={3}>
                  <Avatar size={64} icon={<UserOutlined />} />
                 </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default RightChatMessage;
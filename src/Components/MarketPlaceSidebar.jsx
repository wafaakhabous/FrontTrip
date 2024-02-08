import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Avatar, Image, Menu } from 'antd';
import { DollarCircleFilled, HeartFilled, HistoryOutlined, SettingFilled, ShoppingCartOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';


const MarketPlaceSideBar = () => {

    return ( 
        <Menu  mode='inline' style={{height: '100vh', backgroundColor: '#FFFFFF', color: '#0C111F', fontFamily:'Inter'}}>
            <Menu.Item key='' onClick={() => {window.location.href = '/Cart'}}>
            <ShoppingCartOutlined /> 
            <span>Cart</span>
            </Menu.Item>
            <Menu.Item key=''>
            <HeartFilled/> 
            <span>Saved</span>
            </Menu.Item>
            <Menu.Item key=''>
            <UnorderedListOutlined/> 
            <span>Categories</span>
            </Menu.Item>
            <Menu.Item key=''>
            <HistoryOutlined/> 
            <span>History</span>
            </Menu.Item>
            <Menu.Item key=''>
            <UserOutlined/> 
            <span>Profil</span>
            </Menu.Item>
            <Menu.Item key=''>
            <DollarCircleFilled/> 
            <span>Sells</span>
            </Menu.Item>
            <Menu.Item key=''>
            <SettingFilled/> 
            <span>Settings</span>
            </Menu.Item>
        </Menu>
    )
}

export default MarketPlaceSideBar;
import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Col, Divider, Menu, Row } from 'antd';
import React, { useState } from 'react';

const SideBar = () => {
/** Menu Items */    
const menuItems = [ 
    {
        label : 'Blogs',
        key : 'blogs'
    },
    {
        label : 'trips',
        key : 'trips'
    }
]
const [current, setCurrent] = useState('blogs');
const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
    window.location.href = e.key;
};   
return (
    <Menu onClick={onClick} selectedKeys={[current]} mode='inline' style={{height: '100vh', backgroundColor: '#FFFFFF', color: '#0C111F'}}>
        <Menu.Item key='/Trips/Add'>
           {/* <Avatar src='https://img.freepik.com/free-vector/travel-elements-collection-flat-style_23-2147763912.jpg?size=626&ext=jpg&ga=GA1.1.2027902285.1696892702&semt=ais'/> */}
           <PlusOutlined />
           <span>Add Trip</span>
        </Menu.Item>
    </Menu>
  );
};

export default SideBar;

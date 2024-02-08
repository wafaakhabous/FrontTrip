import { PlusOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Divider, Menu, Row } from 'antd';
import React, { useEffect, useState } from 'react';



const UserSideBar = () => {
    const [users, setusers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchusers = async () => {
          try {
            const response = await fetch('http://localhost:8035/users');
            const data = await response.json();
            setusers(data);
            setLoading(false);
            console.log(data);
          } catch (error) {
            console.error('Error fetching users:', error);
            setLoading(false);
          }
        };
        fetchusers();
      }, []); 
    const [current, setCurrent] = useState('blogs');
const onClick = (e) => {
    //console.log('click ', e);
    setCurrent(e.key);
}; 
    return (
        <Card style={{height: '100vh'}}>
            {users != undefined ? users.map((user) => (
                <Row className='mt-3 d-flex align-items-center'>
                    <Col span={5}>
                     <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
                    </Col>
                    <Col span={19}>
                        {user.firstname + " " + user.lastname} 
                    </Col>
                    <Divider/>
                </Row>
            )) : (<Row></Row>)}
        </Card>
        
    )
}

export default UserSideBar;
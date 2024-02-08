import React, { useState, useEffect } from 'react';
import { PlusCircleFilled, PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Menu,Dropdown, Row, List } from 'antd';
import axios from 'axios';


const InvitationDropdown = ({ invitations }) => {
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [userSenderData, setUserSenderData] = useState({});
    const [requestDetails, setRequestDetails] = useState({});
    useEffect(() => {
      const fetchUserSenderData = async (userSenderId) => {
        try {
          const response = await axios.get(`http://localhost:8035/users/${userSenderId}`);
          if (response.status === 200) {
            setUserSenderData(prevState => ({
              ...prevState,
              [userSenderId]: response.data.username
            }));
          }
        } catch (error) {
          console.error('Error fetching user sender data:', error);
        }
      };
      const fetchRequestDetails = async (requestId) => {
        try {
          const response = await axios.get(`http://localhost:8035/comp/${requestId}`);
          if (response.status === 200) {
            setRequestDetails((prevState) => ({
              ...prevState,
              [requestId]: response.data,
            }));
          }
        } catch (error) {
          console.error('Error fetching request details:', error);
        }
      };
    
      invitations.forEach((invitation) => {
        if (!userSenderData[invitation.userSender]) {
          fetchUserSenderData(invitation.userSender);
        }
        if (!requestDetails[invitation.requestId]) {
          fetchRequestDetails(invitation.requestId);
        }
      });
    }, [invitations, userSenderData, requestDetails]);
  
    const handleUserClick = (userId) => {
      const userProfileURL = `http://localhost:3000/Userprofile/${userId}`;
      window.open(userProfileURL, '_blank');
    };
  
    return (
      <Menu>
      {invitations.map((invitation) => (
        <Menu.Item key={invitation.id} style={{ padding: '0' }}>
          <List.Item>
            <a href="#" onClick={() => handleUserClick(invitation.userSender)}>
              {userSenderData[invitation.userSender] || 'Loading...'} invited you for a trip from{' '}
              {requestDetails[invitation.requestId]?.source || 'Loading...'} to{' '}
              {requestDetails[invitation.requestId]?.destination || 'Loading...'}
            </a>
          </List.Item>
        </Menu.Item>
      ))}
      <Menu.Item key="view-all" style={{ padding: '0' }}>
        <Button type="primary" block>
          View All Invitations
        </Button>
      </Menu.Item>
    </Menu>
    );
  };
const NavBar = () => {

    const handleSignOut = () => {
        // Implement your sign-out logic here
        // For example, clear the user data from local storage and redirect to the sign-in page
        localStorage.removeItem('user');
        // Redirect to the sign-in page
        window.location.href = '/login';
      };

    const [invitations, setInvitations] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const receiverId = user ? user.id : null;
  
    useEffect(() => {
      const fetchInvitations = async () => {
        try {
          const response = await axios.get(`http://localhost:8035/inv/inv/${receiverId}`);
          setInvitations(response.data);
        } catch (error) {
          console.error('Error fetching invitations:', error);
        }
      };
  
      if (receiverId) {
        fetchInvitations();
      }
    }, [receiverId]);
/** Menu Items */    
const menuItems = [ 
    {
        label : 'Blogs',
        key : 'blogs',
        icon : <Avatar src='https://img.freepik.com/free-vector/hand-drawn-essay-illustration_23-2150268421.jpg?size=626&ext=jpg&ga=GA1.2.2027902285.1696892702&semt=sph' />
    },
    {
        label : 'Voyages',
        key : 'voyages'
    }
]
const [current, setCurrent] = useState('blogs');
const onClick = (e) => {
    console.log('click ', e);
    if (e.key === 'invitations'  ) {
        // Don't redirect, just toggle the dropdown
        return;
    }
    setCurrent(e.key);
    window.location.href = e.key;
};   
return (
    <Row>
        <Col span={24}>
            <Menu onClick={onClick} selectedKeys={[current]} mode='horizontal' className='flex justify-content-center align-items-center' style={{height: 80, backgroundColor: '#0C111F'}}>
                <Menu.Item key='logo' style={{right: 400}}>
                    <Avatar style={{backgroundColor:'lightgrey', fontFamily:'Inter'}}>
                        T
                    </Avatar>
                    <span style={{fontFamily:'Inter', color:'white'}}>Travela</span>
                </Menu.Item>
                <Menu.Item key='/Welcome' className='flex align-items-center'>
                    <span style={{fontFamily: 'Inter', color: '#FFFFFF'}}>Blogs</span>
                </Menu.Item>
                <Menu.Item key='/Trips' className='flex align-items-center'>
                    <span style={{fontFamily: 'Inter', color: '#FFFFFF'}}>Trips</span>
                </Menu.Item>
                <Menu.Item key='/MarketPlace' className='flex align-items-center'>
                    <span style={{fontFamily: 'Inter', color: '#FFFFFF'}}>MarketPlace</span>
                </Menu.Item>
                <Menu.Item key='/MesCommandes' className='flex align-items-center'>
                    <span style={{fontFamily: 'Inter', color: '#FFFFFF'}}>Commandes</span>
                </Menu.Item>
                <Menu.Item key='/travel-requests' className='flex align-items-center'>
                    <span style={{fontFamily: 'Inter', color: '#FFFFFF'}}>Requests</span>
                </Menu.Item>
                <Menu.Item key="invitations" className='flex align-items-center'>
                    <Dropdown overlay={<InvitationDropdown invitations={invitations} />} trigger={['click']}>
                    <span style={{fontFamily: 'Inter', color: '#FFFFFF'}}>Invitations</span>
            </Dropdown>
          </Menu.Item>
          <Menu.Item  onClick={handleSignOut}>
                    <span style={{fontFamily: 'Inter', color: '#FFFFFF'}}>
                     Sign out</span>
            </Menu.Item>
            </Menu>
        </Col>
         
    </Row>
  );
};

export default NavBar;

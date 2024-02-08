import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Avatar, Image, Input, Tag, Modal, message } from 'antd';
import NavBar from './Blogs/Navbar';
import MarketPlaceSideBar from './MarketPlaceSidebar';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import LeftChatMessage from './LeftChatMessage';
import RightChatMessage from './RightChatMessage';

var stompClient =null;

const Forum = () => {
      // Add a new state to hold messages
    //const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [msgsend, setMsgsend] = useState([]);
    const [msgreceive, setMsgreceive] = useState([]);
    const [user, setUser] = useState(null);     
    const [otheruser, setOtherUser] = useState(null);     
    const [privateChats, setPrivateChats] = useState(new Map());     
    const [publicChats, setPublicChats] = useState([]); 
    const [tab,setTab] =useState("CHATROOM");
    const [userData, setUserData] = useState({
        username: '',
        username2: '',
        receivername: '',
        connected: false,
        message: ''
    });
    ////////////////////////////////////////////

    // Function to fetch messages between users
    const fetchALLMessages = async (sender, receiver) => {
       
        try {
            const response = await fetch(`http://localhost:8083/api/messages/by-sender-receiver?senderName=${sender}&receiverName=${receiver}`);
             if (response.ok ) {
                const data = await response.json();
                setMsgsend([...data]);
 
                 //console.log('*************************Fetched Messages DATA:', data);
                 
             } else {
                 console.error('Failed to fetch messages');
             }
         } catch (error) {
             console.error('Error fetching messages:', error);
         }
     };

 
 
    // Function to fetch messages between users
    /*const fetchMessages = async (sender, receiver) => {
       
        // console.log("sender :::: ",sender);
         //console.log("receiver :::: ",receiver);
         try {
            const response = await fetch(`http://localhost:8090/api/messages/by-sender-receiver?senderName=${sender}&receiverName=${receiver}`);
             if (response.ok) {
                 const data = await response.json();
                 setMessages([...data]);
 
                 //console.log('*************************Fetched Messages DATA:', data);
                 
             } else {
                 console.error('Failed to fetch messages');
             }
         } catch (error) {
             console.error('Error fetching messages:', error);
         }
     };*/
 
     useEffect(() => {
        // Replace the URL with your backend API endpoint
        fetch('http://localhost:8035/users')
          .then((response) => response.json())
          .then((data) => setUsers(data))
          .catch((error) => console.error('Error fetching users:', error));
          console.log(users);
        }, []);
 
    useEffect(() => {
        console.log('**************************Fetched Messages receiver:', msgreceive);
    }, [msgreceive]);
    useEffect(() => {
        console.log('**************************Fetched Messages sender:', msgsend);
    }, [msgsend]);
    /*useEffect(() => {
        //console.log('**************************Fetched Messages:', messages);
    }, [messages]);*/
    useEffect(() => {
        console.log('**************************Fetched User:', user);
        console.log('**************************Fetched Other User:', otheruser);
    }, [user,otheruser]);
    useEffect(() => {
        //console.log("heeeeeeeeere",userData);
    }, [userData]);
    useEffect(() => {
        //console.log("heeeeeeeeere",userData);
    }, [userData]);
    ////////////////////////////////////////////


   
    

    const connect =async (username,username2)=>{
        try {
            // Fetch user object based on the username
            const response = await fetch(`http://localhost:8083/api/messages/UserByName/${username}`);
            const response2 = await fetch(`http://localhost:8083/api/messages/UserByName/${username2}`);
            
            if (response.ok && response2.ok) {
                console.log("eror whyyyyyyyyyyyy : ",response.json);
                const userDONNEES = await response.json();
                const userODONNEES = await response2.json();

                setUser(userDONNEES);
                setOtherUser(userODONNEES);

                if(!privateChats.get(userODONNEES.name)){
                    console.log(" *** privateChats adding 1 ***** ",userODONNEES.name);

                    privateChats.set(userODONNEES.name,[]);
                    setPrivateChats(new Map(privateChats));
                }

                fetchALLMessages(username, username2);
                // Use the fetched user data as needed
               // console.log('Fetched user data:', userData);
    
                // Proceed with WebSocket connection setup
                let Sock = new SockJS(`http://localhost:8083/ws`);
                stompClient = over(Sock);
                stompClient.connect({}, onConnected, onError);
            } else {
                console.error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/chatroom/public', onMessageReceived);
        stompClient.subscribe('/user/'+userData.username+'/private', onPrivateMessage);
        console.log("Subscribed to /user/" + userData.username + "/private");
    };

    const userJoin=()=>{
          var chatMessage = {
            senderName: userData.username,
            status:"JOIN"
          };
          stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    };

    const onMessageReceived = (payload)=>{
        var payloadData = JSON.parse(payload.body);
        switch(payloadData.status){
           /* case "JOIN":
                console.log("************HEEREE USER ::::::: ",payloadData.senderName," HEEREE USER2 ::::::: ",user);
                if(!privateChats.get(payloadData.senderName) && user && (payloadData.senderName !== user.name)){
                    privateChats.set(payloadData.senderName,[]);
                    setPrivateChats(new Map(privateChats));
                }
                break;*/
            case "MESSAGE":
                publicChats.push(payloadData);
                setPublicChats([...publicChats]);
                break;
            default :
                break;
        }
    };
    
    const onPrivateMessage = (payload)=>{
        console.log(" *** ON PRIVATE MSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSG ***** ",);

        //console.log("here console  :::",payload);
        var payloadData = JSON.parse(payload.body);
        if(privateChats.get(payloadData.senderName)){
            privateChats.get(payloadData.senderName).push(payloadData);
            setPrivateChats(new Map(privateChats));
            console.log(" *** privateChats adding noooooo ***** ",);
            console.log(" *** privateChats adding 3 ***** ",payloadData.senderName);

            

        }else{
            let list =[];
            list.push(payloadData);
            console.log(" *** privateChats adding 2 ***** ",payloadData.senderName," ** list ** ", list);
            privateChats.set(payloadData.senderName,list);
            setPrivateChats(new Map(privateChats));
        }
    };

    const onError = (err) => {
        console.log(err);
        
    };

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    };
   /* const sendValue=()=>{
            if (stompClient) {
              var chatMessage = {
                senderName: userData.username,
                message: userData.message,
                status:"MESSAGE"
              };
              //console.log(chatMessage);
              stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
              setUserData({...userData,"message": ""});
            }
    };*/

    const sendPrivateValue=async ()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }

          const response = await fetch(`http://localhost:8083/api/messages/AddChat/${userData.username}/${tab}/${userData.message}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chatMessage),
        }); 
          
          if (response.ok) {
                
                console.log('************************GOOD INSERTION', );
                
            } else {
                const errorMessage = await response.text(); // Get the error message from the response
                console.error('Failed to fetch messages. Error:', errorMessage);
            }            
          stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
        }
    };

    

    const handleUsername=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username": value});
    };
    const handleUsername2=(event)=>{
        const {value}=event.target;
        setUserData({...userData,"username2": value});
    };

    const registerUser=()=>{
        const userObjectString = sessionStorage.getItem('user');
        if(userObjectString) { 
            const userObject = JSON.parse(userObjectString);
            console.log(userObject.name);
            console.log(userData.username2);
            setUserData(prevData => ({
                ...prevData,
                username : userObject.name
            }));
            connect(userObject.name,userData.username2);
        }
        //console.log("*******here is the client : ",userData.username);
        // Fetch messages between users when a private chat is selected
        //fetchMessages("imane", "najat");
        
        ////////////////////////////////////////////
    };
    return ( 
        <div>
        <NavBar/>
        <Row className='mt-3 d-flex justify-content-between'>
            <Col span={3}>
                <MarketPlaceSideBar/>
            </Col>
            <Col span={21} >
                <Row className='mt-3 d-flex justify-content-around'>   
                {users.map((user) => (
                    <Col span={4}>
                        <Card>
                            <Row>
                                <Col>
                                {user.name}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                <Button onClick={() => {
                                    setUserData(prevData => ({
                                        ...prevData,
                                        username2: user.name
                                    }));
                                    registerUser();
                                    setTab(user.name)
                                }}>
                                    Connect
                                </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
                </Row>
                <Row className='mt-3'>
                    {userData.connected? 
                    /* <ul className="chat-messages">
                    {[...msgsend].map((chat, index) => (
                        <li className={`message ${chat.sender.name === userData.username && "self"}`} key={index}>
                            {chat.sender.name !== userData.username && <div className="avatar">{chat.sender.name}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.sender.name === userData.username && <div className="avatar self">{chat.sender.name}</div>}
                        </li>
                    ))}
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                    ))}
                </ul> */
                 (<div> 
                    {[...privateChats.get(tab)].map((chat,index)=>(
                        <Row>
                            {chat.senderName !== userData.username ? <LeftChatMessage key={index} chat={chat.message} firstname={chat.senderName}/> : <RightChatMessage key={index} chat={chat.message} firstname={chat.senderName}/>}
                        </Row>
                    ))}

                 <Row style={{ position: 'fixed', bottom: 0, width: 1500}}>
                    <Col span={18}>
                        <Input value={userData.message} onChange={handleMessage} type='text' />
                    </Col>
                    <Col span={4}>
                        <Button type='button' onClick={sendPrivateValue}>Send</Button>
                    </Col>
                </Row> 
                </div>) 
                // <div className="send-message">
                //     <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} /> 
                //     <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                // </div>
                    : 
                    <div>
                        not hey
                    </div>
                    }
                </Row>
            </Col>
        </Row>    
        </div>

    )
}

export default Forum;
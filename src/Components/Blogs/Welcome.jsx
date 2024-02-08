import React, { useEffect, useState } from 'react';
import NavBar from './Navbar';
import SideBar from './SideBar';
import { Card, Col, Row, Button, Avatar, Image } from 'antd';
import Blog from './Blog';
import UserSideBar from './UserSideBar';
import BlogCardRight from './BlogCardRight';
import BlogCardLeft from './BlogCardLeft';

const Welcome = ({user}) => {
    let allBlogs = [];
    let rabatBlogs = [];
    const [blogs, setblogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [users, setusers] = useState([]);

    const fetchblogs = async () => {
      try {
        const response = await fetch('http://localhost:8093/api/vi/blogs');
        const data = await response.json();
        setblogs(data);
        setLoading(false);
        console.log(data);
        console.log("Rabat blogs" + rabatBlogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchblogs();
    }, []);  

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

    const filterBlogsRabat = () => {
      setblogs(rabatBlogs);
    }

    const filterBlogsAll = () => {
      setblogs(allBlogs);
    }

  return (
     <div>
        <NavBar></NavBar>
        {/* <Row style={{height: '100vh'}} gutter={[16, 16]}>
           <Col span={4} style={{width: 'max-content'}} >
              <SideBar/>
           </Col>
           <Col span={16}>
              {
                blogs.map((blog) => (
                  <Row>
                    <Col span={24}>
                      <Blog id={blog.id}
                            fetchBlogs={fetchblogs}
                            firstname={users.map((user) => {if(user.trips.some(obj => obj.id === blog.trip.id)) return user.firstname})} 
                            lastname={users.map((user) => {if(user.trips.some(obj => obj.id === blog.trip.id)) return user.lastname})}
                      description={(blog.description != null ? blog.description : "No description has been added for this blog")} itineraries={blog.trip.itineraries} commentaires={blog.comments} datestart={blog.trip.datestart} dateend={blog.trip.dateend}/>
                    </Col>
                  </Row>
                ))
              }
           </Col>
           <Col span={4}>
              <UserSideBar/>
           </Col>
        </Row>    */}
      <Row className='flex justify-content-center'>
        <Col span={20} className='ml-5'>
          <Row className='mb-5 mt-5'>
            <Col span={24} style={{backgroundColor : '#0C111F', height: 400, borderRadius: 60}}>
              <Row>
                <Col span={14}>
                  <Row className='m-5'>
                    <Col span={24}>
                      <span style={{color: '#C7923E', fontFamily: 'Inter'}}>
                      THE BEST DEALS ON THE WORLD'S BEST DESTINATIONS
                      </span>
                    </Col>
                  </Row>
                  <Row className='m-5'>
                    <Col span={24}>
                      <span style={{color: '#FFFFFF', fontFamily: 'Volkhov', fontSize: 50}}>
                      Best travel and destinations
                      </span>
                    </Col>
                  </Row>
                  <Row className='m-5'>
                    <Col span={24}>
                      <span style={{color: '#FFFFFF', fontFamily: 'Inter'}}>
                      With travala you can experience new travel and the best tourist destinations that we have to offer
                      </span>
                    </Col>
                  </Row>
                </Col>
                <Col span={8}>
                <img src='/images/Traveller.png' style={{height: 400}} />
                </Col>
              </Row>
            </Col>
        </Row>
        {/* <Row className='d-flex justify-content-around mb-5'>
          <Col span={4}>
          <Card onClick={filterBlogsRabat} style={{height: 40}} className='d-flex align-items-center justify-content-center'>
            <Avatar src='/images/marker.png'/>
            <span style={{fontFamily: 'Volkhov'}}>Rabat</span>
          </Card>
          </Col>
          <Col span={4}>
          <Card style={{height: 40}} className='d-flex align-items-center justify-content-center'>
            <Avatar src='/images/marker.png'/>
            <span style={{fontFamily: 'Volkhov'}}>Casablanca</span>
          </Card>
          </Col>
          <Col span={4}>
          <Card style={{height: 40}} className='d-flex align-items-center justify-content-center'>
            <Avatar src='/images/marker.png'/>
            <span style={{fontFamily: 'Volkhov'}}>Marrakech</span>
          </Card>
          </Col>
          <Col span={4}>
          <Card onClick={filterBlogsAll} style={{height: 40}} className='d-flex align-items-center justify-content-center'>
            <Avatar src='/images/marker.png'/>
            <span style={{fontFamily: 'Volkhov'}}>All</span>
          </Card>
          </Col>
        </Row> */}
        <Row>
          <Col style={{fontFamily: 'Volkhov', fontSize: 50, color: '#0C111F'}}> Popular Destinations</Col>
        </Row>
        <Row className='d-flex justify-content-center'>
          <Col span={9}>
            {/* <img style={{borderRadius: 20, height: 515, width: 400}} src='/images/rabat.avif'/>
            <Row className='d-flex justify-content-center'>
              <Col span={14}>
              <Card style={{bottom: 60, right: 25, height: 50}} className='d-flex justify-content-center align-items-center'>
                <Avatar src='/images/marker.png'/>
                <span style={{fontFamily: 'Volkhov', fontSize: 20}}>Rabat</span>
              </Card>
              </Col>
            </Row> */}
            <Card style={{height: 410, backgroundImage: "url('https://img.freepik.com/free-photo/vertical-view-famous-koutoubia-mosque-marrakech_268835-3960.jpg?size=626&ext=jpg&ga=GA1.2.2027902285.1696892702&semt=sph')", backgroundSize:'cover'}}>
              <Card style={{top: 300, height:60}} className='d-flex align-items-center justify-content-center'>
                <Avatar src='/images/marker.png'/>
                <span style={{fontFamily: 'Volkhov', fontSize: 20}}>Rabat</span>
              </Card>
            </Card>
          </Col>
          <Col span={9}>
            <Row>
              <Col span={24}>
              <Card style={{height: 200, backgroundImage: "url('https://img.freepik.com/free-photo/wide-angle-shot-several-camels-sitting-trees-desert_181624-52740.jpg?size=626&ext=jpg&ga=GA1.2.2027902285.1696892702&semt=sph')", backgroundSize:'cover', backgroundPositionX:'center',backgroundPositionY:'center'}}>
                <Card style={{top: 120, height:50}} className='d-flex align-items-center justify-content-center'>
                <Avatar src='/images/marker.png'/>
                <span style={{fontFamily: 'Volkhov', fontSize: 20}}>Marrakech</span>
                </Card>
              </Card>
              </Col>
            </Row>
            <Row className='mt-2 mb-5'>
              <Col span={24}>
              <Card style={{height: 200, backgroundImage: "url('https://img.freepik.com/free-photo/beautiful-view-biggest-mosque-casablanca-morocco-hassan-ii-mosque_181624-61388.jpg?size=626&ext=jpg&ga=GA1.2.2027902285.1696892702&semt=sph')", backgroundSize:'cover', backgroundPositionX:'center',backgroundPositionY:'center'}}>
                <Card style={{top: 120, height:50}} className='d-flex align-items-center justify-content-center'>
                <Avatar src='/images/marker.png'/>
                <span style={{fontFamily: 'Volkhov', fontSize: 20}}>Casablanca</span>
                </Card>
              </Card>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col style={{fontFamily: 'Volkhov', fontSize: 50, color: '#0C111F'}}> Blogs</Col>
        </Row>
        {
        blogs.map((blog, index) => (
          index % 2 == 0 ? 
          <BlogCardRight 
          firstname={users.map((user) => {if(user.trips.some(obj => obj.id === blog.trip.id)) return user.firstname})} 
          lastname={users.map((user) => {if(user.trips.some(obj => obj.id === blog.trip.id)) return user.lastname})}
          datestart={blog.trip.datestart}
          dateend={blog.trip.dateend}
          itineraries={blog.trip.itineraries}
          /> 
          : 
          <BlogCardLeft
          firstname={users.map((user) => {if(user.trips.some(obj => obj.id === blog.trip.id)) return user.firstname})} 
          lastname={users.map((user) => {if(user.trips.some(obj => obj.id === blog.trip.id)) return user.lastname})}
          datestart={blog.trip.datestart}
          dateend={blog.trip.dateend}
          itineraries={blog.trip.itineraries}
          /> 
        ))
        }  
        </Col>
      </Row>  

     </div>
      
  );
};

export default Welcome;

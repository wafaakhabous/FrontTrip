import { Avatar, Button, Card, Carousel, Col, Divider, Form, Image, Input, List, Row, Tag, Timeline } from 'antd';
import React, { useState } from 'react';

const Blog = ({firstname, lastname, commentaires,datestart,dateend, itineraries, description,id, fetchBlogs}) => {
const items = [];
if(itineraries != undefined) {
   itineraries.map((elem) => 
   items.push(
    {
        children : elem.cityName + ' : ' + elem.datestart + ' ==========> ' + elem.dateend
    }
   )
);
}

const dateFormat = (date) => {
  const inputDate = new Date(date);
  const options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(inputDate);
  return formattedDate
}
 
const onFinish = async (values) => {
    let blog = {
      'id' : id
    }
    values['blog'] = blog;
    const currentDate = new Date();
    const isoDateString = currentDate.toISOString();
    values['time'] = isoDateString;
    try {
      const response = await fetch('http://localhost:8093/api/vi/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           //Add any other headers as needed
        },
        body: JSON.stringify(values),
      })
      if(response.ok){
          console.log("Comment added.");
          fetchBlogs();
      }
  } catch(error){
      console.error('Error : ', error.message);
  }
  };
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };   
return (
    <Card className='mt-3'>
       <Row>
          <Col span={8}>
            <Avatar size={42} src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.2.2027902285.1696892702&semt=sph"/>
            <span>{(firstname.slice(0,-1) == "" ? firstname.slice(1,firstname.length) : firstname.slice(0,-1)) + ' ' + (lastname.slice(0,-1) == "" ? lastname.slice(1,lastname.length) : lastname.slice(0,-1)) }</span>
          </Col>
       </Row>
       {/**<Carousel autoplay>
          <Image width={400} src='https://img.freepik.com/free-photo/aerial-drone-view-rabat-morocco-atlantic-ocean-rocky-coastline-with-lighthouse-blue-water_1268-23512.jpg?size=626&ext=jpg&ga=GA1.1.2027902285.1696892702&semt=sph'/>
          <Image height={300} src='https://img.freepik.com/free-photo/alley-medina-marrakech-sunlight-blue-sky-mor_181624-52529.jpg?size=626&ext=jpg&ga=GA1.1.2027902285.1696892702&semt=sph'/>      
       </Carousel>    */}
       
    <Card className='mt-3' type="inner" title="Description du blog" headStyle={{backgroundColor: '#86B817' , color:'white'}}>
        <Row>
            <Col span={18}>
              {(description == undefined ? 'Ce blog ne contient aucune description' : description)}
            </Col>
            <Col span={6}>
                <Tag color='green'>
                    {(datestart == undefined ? 'Undefined' : datestart)}
                </Tag>
                <Tag color='red'>
                {(dateend == undefined ? 'Undefined' : dateend)}
                </Tag>
            </Col>
        </Row>
        <Timeline className='mt-4' items={items}/>
    </Card>
    <Card
      style={{
        marginTop: 16,
      }}
      type="inner"
      title="Commentaires"
      headStyle={{backgroundColor: '#86B817' , color:'white'}}
    >
        {
            /** If no comments exist */
        commentaires.length == 0 ? (
            <Image 
            width={100}
            src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150696455.jpg?size=626&ext=jpg&ga=GA1.1.2027902285.1696892702&semt=sph" />
        /** If comments exist */    
        ) : (
          <List itemLayout='horizontal' dataSource={commentaires} 
                  renderItem={(item,index) => (
                    <Row className='flex align-items-center justify-content-around'>
                      <Col span={16}>
                      <List.Item>
                        <List.Item.Meta
                           avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                           title={<a href="https://ant.design">Undefined</a>}
                           description={item.text}
                        /> 
                    </List.Item>
                      </Col>
                      <Col span={4}>
                        <Tag>{dateFormat(item.time)}</Tag>
                      </Col>
                    </Row>
              
                  )}
            />
        )
      }
      <Divider/>
      <Form onFinish={onFinish}>
        <Row>
            <Col span={10}> 
               <Form.Item name="text">
                 <Input placeholder='Exprimez vous ... '/>
               </Form.Item>
            </Col>
            <Col span={4}>
                <Button type='primary' htmlType="submit" style={{backgroundColor: '#86B817' , color:'white'}}>
                    Poster
                </Button>
            </Col>
        </Row>
        
      </Form>
    </Card>
  </Card>
  );
};

export default Blog;

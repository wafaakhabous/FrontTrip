import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, Row } from 'antd';
import NavBar from '../Blogs/Navbar';
import SideBar from '../Blogs/SideBar';
import FormItem from 'antd/es/form/FormItem';


const AddTrip = () => {
    const onFinish = async (values) => {
        values['publisher'] = JSON.parse(sessionStorage.getItem('user'));
        //console.log('Success:', values);
        let itineraries = [];
        itineraries.push({
          'cityName': values['cityname1'],
          'datestart' : values['datestartitinerary1'],
          'dateend' : values['dateenditinerary1']
        });
        itineraries.push({
          'cityName': values['cityname2'],
          'datestart' : values['datestartitinerary2'],
          'dateend' : values['dateenditinerary2']
        });
        delete values['cityname1'];
        delete values['datestartitinerary1'];
        delete values['dateenditinerary1'];
        delete values['cityname2'];
        delete values['datestartitinerary2'];
        delete values['dateenditinerary2'];
        values['itineraries'] = itineraries;
        console.log('Success:', values);
          // try {
          //     const response = await fetch('http://localhost:8093/api/vi/trips', {
          //       method: 'POST',
          //       headers: {
          //         'Content-Type': 'application/json',
          //          //Add any other headers as needed
          //       },
          //       body: JSON.stringify(values),
          //     })
          //     if(response.ok){
          //         console.log("Trip added.");
          //         const user = await fetch('http://localhost:8035/users/'+JSON.parse(sessionStorage.getItem('user')).id , {
          //           method: 'GET',
          //           headers: {
          //           'Content-Type': 'application/json',
          //          //Add any other headers as needed
          //         },
          //         });
          //         if(user.ok) { 
          //           let userObj = await user.json();
          //           //console.log(userObj);
          //           sessionStorage.setItem('user', JSON.stringify(userObj));
          //           console.log("Updated user");
          //         }

          //     }
          // } catch(error){
          //     console.error('Error : ', error.message);
          // }
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      // Validate the first itinerary date 

    return (
        <div className='bg-light'>
        <NavBar></NavBar>
        <Row style={{height: '100vh'}} gutter={[16, 16]}>
           <Col span={4} style={{width: 'max-content'}} >
              <SideBar/>
           </Col>
           <Col span={16}>
              <Card className='mt-5'>
                <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                    <Form.Item
                    label="Date start"
                    name="datestart"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your Start Date!',
                      },
                    ]}
                    >
                        <Input type='date'></Input>
                    </Form.Item>
                    <FormItem
                    label="Date End"
                    name="dateend"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your End Date!',
                      },
                    ]}
                    >
                        <Input type='date'></Input>
                    </FormItem>
                    <Divider/>
                    <FormItem
                    label="Date Start"
                    name="datestartitinerary1"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your Start Date!',
                        
                      },
                    ]}
                    >
                      <Input type='date'></Input>
                    </FormItem>
                    <FormItem
                    label="Date End"
                    name="dateenditinerary1"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your End Date!',
                      },
                    ]}
                    >
                      <Input type='date'></Input>
                    </FormItem>
                    <FormItem
                    label="City name"
                    name="cityname1"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your city name!',
                      },
                    ]}
                    >
                      <Input type='text'></Input>
                    </FormItem>

                    <Divider/>
                    <FormItem
                    label="Date Start"
                    name="datestartitinerary2"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your Start Date!',
                      },
                    ]}
                    >
                      <Input type='date'></Input>
                    </FormItem>
                    <FormItem
                    label="Date End"
                    name="dateenditinerary2"
                    rules={[
                      {
                        required: true,
                        message: 'Please select your End Date!',
                      },
                    ]}
                    >
                      <Input type='date'></Input>
                    </FormItem>
                    <FormItem
                    label="City name"
                    name="cityname2"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your city name!',
                      },
                    ]}
                    >
                      <Input type='text'></Input>
                    </FormItem>
                    <FormItem
                          wrapperCol={{
                            offset: 8,
                            span: 16,
                          }}
                    >
                        <Button type='primary' htmlType='submit' style={{backgroundColor: '#86B817', color:'white'}}>
                            Create
                        </Button>
                    </FormItem>
                    

                </Form>
              </Card>
           </Col>
        </Row>   
     </div>
    )
}

export default AddTrip;
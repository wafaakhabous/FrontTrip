import React, { useEffect, useState } from 'react';
import NavBar from '../Blogs/Navbar';
import SideBar from '../Blogs/SideBar';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Space, Typography, Col, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';


const AddTripGenerique = () => {
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        // Handle form submission logic here
        console.log('Received values:', values);
         try {
               values['publisher'] = JSON.parse(sessionStorage.getItem('user'));
               const response = await fetch('http://localhost:8093/api/vi/trips', {
                method: 'POST',
                 headers: {
                   'Content-Type': 'application/json',
                    //Add any other headers as needed
                 },
                 body: JSON.stringify(values),
               })
              if(response.ok){
                   console.log("Trip added.");
                 const user = await fetch('http://localhost:8035/users/'+JSON.parse(sessionStorage.getItem('user')).id , {
                     method: 'GET',
                     headers: {
                     'Content-Type': 'application/json',
                    //Add any other headers as needed
                   },
                 });
                   if(user.ok) { 
                     let userObj = await user.json();
                     //console.log(userObj);
                     sessionStorage.setItem('user', JSON.stringify(userObj));
                     console.log("Updated user");
                   }

               }
           } catch(error){
               console.error('Error : ', error.message);
           }
      }; 
    return (
        <div className='bg-light'>
        <NavBar></NavBar>
        <Row style={{height: '100vh'}} gutter={[16, 16]}>
           <Col span={4} style={{width: 'max-content'}} >
           </Col>
           <Col span={16}>
              <Card className='mt-5'>
              <Form
              onFinish={onFinish}
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      form={form}
      name="dynamic_form_complex"
      style={{
        maxWidth: 600,
      }}
      autoComplete="off"
      initialValues={{
        itineraries: [{}],
      }}

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
      <Form.List name="itineraries">
        {(fields, { add, remove }) => (
          <div
            style={{
              display: 'flex',
              rowGap: 16,
              flexDirection: 'column',
            }}
          >
            {fields.map((field) => (
              <Card
                size="small"
                title={`Itinerary ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item label="City Name" name={[field.name, 'cityName']}>
                  <Input />
                </Form.Item>
                <FormItem
                    label="Date Start"
                    name={[field.name, 'datestart']}
                    rules={[
                      {
                        required: true,
                        message: 'Please select your start Date!',
                      },
                    ]}
                    >
                      <Input type='date'></Input>
                </FormItem>
                <FormItem
                    label="Date End"
                    name={[field.name, 'dateend']}
                    rules={[
                      {
                        required: true,
                        message: 'Please select your end Date!',
                      },
                    ]}
                    >
                      <Input type='date'></Input>
                </FormItem>

                {/* Nest Form.List */}
                {/* <Form.Item label="List">
                  <Form.List name={[field.name, 'list']}>
                    {(subFields, subOpt) => (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          rowGap: 16,
                        }}
                      >
                        {subFields.map((subField) => (
                          <Space key={subField.key}>
                            <Form.Item noStyle name={[subField.name, 'first']}>
                              <Input placeholder="first" />
                            </Form.Item>
                            <Form.Item noStyle name={[subField.name, 'second']}>
                              <Input placeholder="second" />
                            </Form.Item>
                            <CloseOutlined
                              onClick={() => {
                                subOpt.remove(subField.name);
                              }}
                            />
                          </Space>
                        ))}
                        <Button type="dashed" onClick={() => subOpt.add()} block>
                          + Add Sub Item
                        </Button>
                      </div>
                    )}
                  </Form.List>
                </Form.Item> */}
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Item
            </Button>
          </div>
        )}
      </Form.List>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
      <Button htmlType='submit'>
        submit
      </Button>
    </Form>

              </Card>
           </Col>
        </Row>
        </div>
    )
}


export default AddTripGenerique;
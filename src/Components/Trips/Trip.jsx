import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Divider, Form, Input, Modal, Upload, Row, Tag } from 'antd';
import ItinerariesMap from '../ItinerariesMap';
import { PlusOutlined } from '@ant-design/icons';




const Trip = ({trip}) => {
    const itineraries = [];
    const [blogs, setblogs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const normFile = (e) => {
      if (Array.isArray(e)) {
        return e;
      }
      return e?.fileList;
    };
    trip.itineraries.map((elem) => {
        itineraries.push({city : elem.cityName})
    })

    const fetchblogs = async () => {
        try {
          const response = await fetch('http://localhost:8093/api/vi/blogs');
          const data = await response.json();
          setblogs(data);
          console.log(data);
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      };

    useEffect(() => {
        fetchblogs();
      }, []);

      const isIdPresentInBlogs = (idToCheck) => {
        return blogs.some((blog) =>
          blog.trip.id == idToCheck
        );
      };

      const onFinish = async(values) => {
        values['trip'] = trip;
        values['image'] = values.upload[0]?.originFileObj.name;
        const formData = new FormData();
        formData.append('image',values.upload[0]?.originFileObj);
        delete values['upload'];
        try {
          const response = await fetch('http://localhost:8093/api/vi/blogs/saveImage', {
            method: 'POST',
            body: formData,
          });
          if(response.ok){
             try {
                 const response = await fetch('http://localhost:8093/api/vi/blogs', {
                   method: 'POST',
                   headers: {
                     'Content-Type': 'application/json',
                      //Add any other headers as needed
                   },
                   body: JSON.stringify(values),
                 })
                 if(response.ok){
                     console.log("Blog added.");
                     //window.location.reload();
                     fetchblogs();
                 }
             } catch(error){
                 console.error('Error : ', error.message);
             }
          } else {
            console.error("ERROR OCCURED");
          }

        }catch(error){
          console.error(error);
        }
        // try {
        //     const response = await fetch('http://localhost:8093/api/vi/blogs', {
        //       method: 'POST',
        //       headers: {
        //         'Content-Type': 'application/json',
        //          //Add any other headers as needed
        //       },
        //       body: JSON.stringify(values),
        //     })
        //     if(response.ok){
        //         console.log("Blog added.");
        //         //window.location.reload();
        //         fetchblogs();
        //     }
        // } catch(error){
        //     console.error('Error : ', error.message);
        // }
        console.log(values);
      }
      const showModal = () => {
        setIsModalOpen(true);
      };
      const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      const beforeUpload = (file, fileList) => {
        // Allow only one file to be uploaded
        return fileList.length === 0;
      };
    return (
                <Col span={12} className='mt-5'>
                    <Card title='Trip card' className='text-center' headStyle={{backgroundColor:'#86B817' , color:'white'}}>
                        <Row className='flex justify-content-between'>
                            <Col span={4}>
                                <Tag>#{trip.id}</Tag>
                            </Col>
                            <Col span={4}>
                                <Tag color='red'>{trip.datestart}</Tag>
                            </Col>
                            <Col span={4}>
                                <Tag color='green'>{trip.dateend}</Tag>
                            </Col>
                        </Row>
                        <Divider/>
                        <span className='text-center'>Itineraries</span>
                        <Row>
                            <Col span={24} style={{height: 100}}>
                              <ItinerariesMap itineraries={itineraries}/>
                            </Col>
                        </Row>
                        <Row className='mt-3 flex justify-content-center'>
                          <Col span={4}>
                              <Button className='primary' style={{ backgroundColor : '#108ee9', color: 'white'}} onClick={showModal}>
                                 Show
                              </Button>
                          </Col>
                        </Row>
                        <Divider/>
                        {
                            (!isIdPresentInBlogs(trip.id) ? 
                            <Form layout='inline' onFinish={onFinish}>
                            <Form.Item 
                            label='Blog Description' 
                            name='description'
                            rules={[
                                {
                                  required: true,
                                  message: 'Please input your blog description!',
                                },
                              ]}
                            >
                                <Input type='text'/>
                            </Form.Item>

                            <Form.Item label="image" valuePropName="fileList" getValueFromEvent={normFile} name="upload">
          <Upload beforeUpload={beforeUpload} listType="picture-card">
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 4,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>

                            <Form.Item>
                                <Button type='primary' htmlType='submit' style={{backgroundColor: '#86B817', color:'white'}}>
                                    Post
                                </Button>
                            </Form.Item>
                        </Form> :
                         <Tag className='mt-2' color="#108ee9">This trip is already associated to a blog</Tag>
                        )
                        }
                        
                    </Card>
                    

                    <Modal title="Itinenaries map" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                      <Row>
                        <Col span={20}>
                        <ItinerariesMap itineraries={itineraries} height={500}/>
                        </Col>
                      </Row>
                    </Modal>
      
                </Col>
    )
}

export default Trip;
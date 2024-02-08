import React from 'react';
import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Typography, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const AddProduct = () => {
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const beforeUpload = (file, fileList) => {
    // Allow only one file to be uploaded
    return fileList.length === 0;
  };
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('image', values.upload[0]?.originFileObj);
    formData.append('name', values.name);
    formData.append('price', values.price);
    formData.append('quantite', values.quantite);
    formData.append('description', values.description);
    formData.append('nomCategorie', values.select);

    try {
      const response = await fetch('http://localhost:8097/api/products/create', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Product created successfully!');
        // You can add additional logic here, such as redirecting the user or showing a success message.
        message.success('Product created successfully!');
      } else {
        console.error('Failed to create product:', response.statusText);
        // Handle error, show error message, etc.
        message.error('Failed to create product. Please try again.');
      }
    } catch (error) {
      console.error('Error creating product:', error.message);
      // Handle error, show error message, etc.
      message.error('Error creating product. Please try again.');
    }
  };

  return (
    <Card
      title={<Title level={2} style={{ marginLeft: 150, marginTop: 20 }}>Ajouter un Produit</Title>}
      bordered
      style={{
        maxWidth: 600,
        margin: '0 auto', // Center the form
        borderColor: 'green', // Set border color to green
      }}
    >
      <Form
        labelCol={{
          span: 6, // Adjust the label column width
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        labelAlign="left" // Set labelAlign to 'left'
        onFinish={onFinish}

      >
        <Form.Item label="Nom Produit" name="name">
          <Input />
        </Form.Item>

       

        <Form.Item label="Price" name="price">
          <Input />
        </Form.Item>

        <Form.Item label="Categorie" name="select">
          <Select>
            <Select.Option value="demo1">Demo1</Select.Option>
            <Select.Option value="demo2">Demo2</Select.Option>
            <Select.Option value="demo3">Demo3</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Quantité" name="quantite">
          <InputNumber />
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
        <Form.Item label="" name="button">
        <Button htmlType="submit" style={{ marginLeft: 140 ,width:200}} className='btn btn-outline-success'>
          Enregister
        </Button>
      </Form.Item>
      </Form>
    </Card>
  );
};

export default AddProduct;

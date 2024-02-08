import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Input, InputNumber, Select, Typography, Upload, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { useParams } from 'react-router-dom';

const { Title } = Typography;
const { Option } = Select;

const Editproduct = () => {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8090/api/products/get/${id}`)
      .then((response) => response.json())
      .then((data) => setProductDetails(data))
      .catch((error) => console.error('Error fetching product details:', error));
  }, [id]);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const beforeUpload = (file, fileList) => {
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
      const response = await fetch(`http://localhost:8090/api/products/update/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        console.log('Product updated successfully!');
        message.success('Product updated successfully!');
      } else {
        console.error('Failed to update product:', response.statusText);
        message.error('Failed to update product. Please try again.');
      }
    } catch (error) {
      console.error('Error updating product:', error.message);
      message.error('Error updating product. Please try again.');
    }
  };

  return (
    <Card
      title={<Title level={2} style={{ marginLeft: 150, marginTop: 20 }}>Modifier un Produit</Title>}
      bordered
      style={{
        maxWidth: 600,
        margin: '0 auto',
        borderColor: 'green',
      }}
    >
      {productDetails && (
        <Form
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          labelAlign="left"
          onFinish={onFinish}
          initialValues={productDetails}
        >
          <Form.Item
            label="Nom Produit"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter the product name',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: 'Please enter the product price',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Categorie"
            name="select"
            rules={[
              {
                required: true,
                message: 'Please select the product category',
              },
            ]}
          >
            <Select>
              <Option value="demo1">Demo1</Option>
              <Option value="demo2">Demo2</Option>
              <Option value="demo3">Demo3</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please enter the product description',
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Quantité"
            name="quantite"
            rules={[
              {
                required: true,
                message: 'Please enter the product quantity',
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            name="upload"
            rules={[
              {
                required: true,
                message: 'Please upload an image',
              },
            ]}
          >
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
            <Button htmlType="submit" style={{ marginLeft: 140, width: 200 }} className='btn btn-outline-success'>
              Update product
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default Editproduct;
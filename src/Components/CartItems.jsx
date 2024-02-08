import React, { useEffect, useState } from 'react';
import { Avatar, List, Row, Col, Space, Typography, Modal, Button, InputNumber } from 'antd';
import { LikeOutlined, MessageOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import NavBar from './Blogs/Navbar';
import MarketPlaceSideBar from './MarketPlaceSidebar';

const { Title } = Typography;

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(0);

  useEffect(() => {
    // Fetch cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, []);

  const IconText = ({ icon, text, onClick }) => (
    <Space>
      {React.createElement(icon, { onClick })}
      {text}
    </Space>
  );

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };
  const handleDelete = () => {
    if (selectedItem) {
      const updatedCart = cartItems.filter((item, index) => index !== selectedItem.index);
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setDeleteModalVisible(false);
    }
  };

  const handleUpdate = () => {
    if (selectedItem && editedQuantity >= 0) {
      const updatedCart = cartItems.map((item, index) =>
        index === selectedItem.index ? { ...item, quantity: editedQuantity } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      setUpdateModalVisible(false);
    }
  };
  const redirectToPage = (path) => {
    window.location.href = path;
  };

  const handleCommander = () => {
    // Check if session storage exists
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      redirectToPage('/CommandeValidate');
    } else {
      // Redirect to the login page if session storage doesn't exist
      redirectToPage('/login');
    }
  };

  return (
    <div>
    <NavBar/>
    <Row className='mt-3 d-flex justify-content-between'>
      <Col span={3}>
        <MarketPlaceSideBar/>
      </Col>
      <Col span={20}>
      <Row justify="center" align="middle" style={{ minHeight: '100vh',marginTop:-60 }}>
      <Col xs={20} sm={18} md={16} lg={14} xl={12}>
        <List
          itemLayout="vertical"
          size="large"
          bordered
          dataSource={cartItems}
          renderItem={(item, index) => (
            <List.Item
              key={index}
              actions={[
                // <IconText
                //   icon={EyeOutlined}
                //   text="View"
                //   onClick={() => console.log('View clicked')}
                // />,
                <IconText
                  icon={EditOutlined}
                  text="Edit Quantity"
                  onClick={() => {
                    setSelectedItem({ item, index });
                    setEditedQuantity(item.quantity);
                    setUpdateModalVisible(true);
                  }}
                />,
                <IconText
                  icon={DeleteOutlined}
                  text="Delete"
                  onClick={() => {
                    setSelectedItem({ item, index });
                    setDeleteModalVisible(true);
                  }}
                />,
              ]}
              extra={
                <img
                  width={100}
                  height={100}
                  alt={item.name}
                  src={`../images/${item.image}`}
                />
              }
            >
              <List.Item.Meta
                title={<a href={`https://ant.design/${item.id}`}>{item.name}</a>}
                description={`Price: ${item.price} DH, Quantity: ${item.quantity}`}
              />
              {item.description}
            </List.Item>

          )}
        />
 <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Title level={4}>Total Price: {calculateTotalPrice()} DH</Title>
          <Button onClick={handleCommander}>Commander</Button>
        </div>  
        {/* Modal for confirming delete action */}
        <Modal
          title="Confirm Delete"
          visible={deleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setDeleteModalVisible(false)}>
              Cancel
            </Button>,
            <Button key="delete" type="primary" onClick={handleDelete}>
              Delete
            </Button>,
          ]}
        >
          <p>Are you sure you want to delete this item from your cart?</p>
        </Modal>

        {/* Modal for updating quantity */}
        <Modal
          title={`Update Quantity for ${selectedItem ? selectedItem.item.name : ''}`}
          visible={updateModalVisible}
          onCancel={() => setUpdateModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setUpdateModalVisible(false)}>
              Cancel
            </Button>,
            <Button key="update" type="primary" onClick={handleUpdate}>
              Update
            </Button>,
          ]}
        >
          {selectedItem && (
            <>
              <p>{`Current Quantity: ${selectedItem.item.quantity}`}</p>
              <p>Update Quantity:</p>
              <InputNumber
                min={0}
                value={editedQuantity}
                onChange={(value) => setEditedQuantity(value)}
              />
            </>
          )}
        </Modal>
      </Col>
    </Row>
      </Col>
    </Row>  
    </div>
  );
};

export default CartItems;

import React, { useEffect, useState } from 'react';
import { Avatar,Form, Input, List, Row, Col, Space, Typography, Modal, Button, InputNumber, Tabs, message } from 'antd';
import { LikeOutlined, MessageOutlined, EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import NavBar from './Blogs/Navbar';
import SideBar from './Blogs/SideBar';
import Item from 'antd/es/list/Item';
import MarketPlaceSideBar from './MarketPlaceSidebar';

const { Title } = Typography;
const { TabPane } = Tabs;

const CommandeValidate = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [editedQuantity, setEditedQuantity] = useState(0);
  const [editedUser, setEditedUser] = useState({});
  const [activeTab, setActiveTab] = useState("1"); // Added state for the active tab


  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')) || {});


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

  const handleCommander = async () => {
    // Check if session storage exists
    const user = JSON.parse(sessionStorage.getItem('user'));
  
    if (user) {
      try {
        // Prepare data for creating command
        const commandData = {
          id_user: user.id,
          total: calculateTotalPrice(),
          statut: 'APPROVED',
        };
  
        // Make a POST request to create a command
        const commandResponse = await fetch('http://localhost:8097/api/commandes/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(commandData),
        });
  
        if (commandResponse.ok) {
          const commandJson = await commandResponse.json();
          const commandId = commandJson.id_cmd;
  
          console.log('Command created successfully:', commandJson);
          console.log('Thiiiiiiiiis is id', commandId);
  
          // Loop through cart items and create ligneCommande for each
          for (const item of cartItems) {
            const ligneCommandeData = {
              id_produit: item.id,
              qte: item.quantity,
              prix: item.price,
              id_cmd: commandId,
            };
  
            // Make a POST request to create ligneCommande
            const ligneCommandeResponse = await fetch('http://localhost:8097/api/Lignecmd/lignecommandes', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(ligneCommandeData),
            });
  
            if (!ligneCommandeResponse.ok) {
              console.error('Failed to create ligne commande:', ligneCommandeResponse.status, ligneCommandeResponse.statusText);
              // Handle error cases for ligne commande here
            }
          }
  
          for (const item of cartItems) {
            const updatedProductResponse = await fetch(`http://localhost:8097/api/products/updateQuantity/${item.id}?quantity=${item.quantity}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (updatedProductResponse.ok) {
              // Quantity updated successfully, proceed with other operations
            } else {
              console.error('Failed to update product quantity:', updatedProductResponse.status, updatedProductResponse.statusText);
              // Handle error cases for updating product quantity here
            }
          }
          
          // Ligne commandes created successfully
          // Clear the cart or perform any other necessary actions
          setCartItems([]);
          localStorage.removeItem('cartItems');
          message.success('Votre commande est passée avec success');
  
          // Redirect to the desired page
          redirectToPage('/Welcome');
        } else {
          console.error('Failed to create command:', commandResponse.statusText);
          // Handle error cases for command here
        }
      } catch (error) {
        console.error('Error during command and ligne commandes creation:', error.message);
        // Handle network or other errors here
      }
    } else {
      // Redirect to the login page if session storage doesn't exist
      redirectToPage('/login');
    }
  };
  
  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8035/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedUser),
      });
  
      if (response.ok) {
        // If the update is successful, switch to the second tab
        setActiveTab('2');
        sessionStorage.setItem('user', JSON.stringify(editedUser));

      } else {
        console.error('Failed to update user:', response.statusText);
        // Handle error cases for user update here
      }
    } catch (error) {
      console.error('Error during user update:', error.message);
      // Handle network or other errors here
    }
  };
  
  return (
    <>
      <NavBar />
      <Row style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Col span={4} offset={0}>
          <MarketPlaceSideBar/>
        </Col>
        
        <Col span={16} offset={1} >
        <Tabs defaultActiveKey={activeTab} activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
          <TabPane tab="User Information" key="1">
          <Row>
                <Col span={12} offset={6}>
                  <Title style={{ textAlign: 'center', marginBottom: 20, color: 'grey' }}>
                    User Information
                  </Title>
                  {/* Render editable user information */}
                  {user && (
                    <>
                      <Form>
                        <Form.Item label="Name">
                          <Input
                            value={user.firstname || ''}
                            onChange={(e) => setEditedUser({ ...editedUser, firstname: e.target.value })}
                          />
                        </Form.Item>
                        <Form.Item label="Email">
                          <Input
                            value={user.email}
                            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                          />
                        </Form.Item>
                        <Form.Item label="Nationality">
                          <Input
                            value={user.nationality || ''}
                            onChange={(e) => setEditedUser({ ...editedUser, nationality: e.target.value })}
                          />
                        </Form.Item>
                        <Form.Item label="Address">
                          <Input
                            value={user.address || ''}
                            onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
                          />
                        </Form.Item>
                      </Form>
                      
                      <Button type="primary" onClick={handleSaveEdit}>
                        Save
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="My Cart" key="2">
              <Title style={{ textAlign: 'center', marginBottom: 20, color: 'grey' }}>
                My Cart
              </Title>
              {/* Render your cart items here */}
              <List
                itemLayout="vertical"
                size="large"
                bordered
                dataSource={cartItems}
                renderItem={(item, index) => (
                  <List.Item
                    key={index}
                    actions={[
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
                <Button onClick={handleCommander}>Valider ma commande </Button>
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
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default CommandeValidate;

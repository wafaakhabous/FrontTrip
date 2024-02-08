import React, { useEffect, useState } from 'react';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Input, Modal, Row, Typography, Select, Button } from 'antd';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Navbar2 from './Blogs/Navbar';
const { Meta } = Card;
const { Text } = Typography;
const { Option } = Select;

const CardProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSorting, setSelectedSorting] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1); // Initialize quantity with 1

  // Fetch product data from your backend
  useEffect(() => {
    // Replace the URL with your backend API endpoint
    fetch('http://localhost:8097/api/products/getAll')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Define filteredProducts at the top of the component
  const filteredProducts = products
    .filter((product) => {
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || product.nom_categorie === selectedCategory;
      return matchesSearchTerm && matchesCategory;
    })
    .sort((a, b) => {
      if (selectedSorting === 'asc') {
        return a.price - b.price;
      } else if (selectedSorting === 'desc') {
        return b.price - a.price;
      }
      return 0;
    });
    const handleViewDetails = (product, showQuantity) => {
      setSelectedProduct({
        ...product,
        quantity: showQuantity ? quantity : undefined,
      });
      setModalVisible(true);
    };
  
    const handleAddToCart = () => {
      // Implement your logic to add the selected product and quantity to the cart
      console.log(`Added ${quantity} ${selectedProduct.name} to the cart`);
  
      // Save the product and quantity to local storage
      const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      const newCartItem = {
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        quantity: quantity,
        image:selectedProduct.image
      };
      const updatedCartItems = [...cartItems, newCartItem];
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  
      setModalVisible(false); // Close the modal after adding to cart
    };

  return (
    <>{(sessionStorage.getItem('user') != null ? <Navbar2/> :  <Navbar/>)}
     
     {/* Fixed link to the cart */}
     <Link to="/Cart" style={{ position: 'fixed', top: 120, right: 20, zIndex: 1000 }} className='btn btn-primary'>
        <ShoppingCartOutlined style={{ fontSize: '24px', marginRight: '8px' }} />
        Cart
      </Link>
      <div style={{ marginTop: 20, textAlign: 'center' }}>
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 200, marginRight: 16 }}
        />
        <Select
          placeholder="Filter by category"
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
          style={{ width: 200, marginRight: 16 }}
        >
          <Option value="">All Categories</Option>
          <Option value="demo1">Categorie 1</Option>
          <Option value="demo2">Categorie 2</Option>
          <Option value="demo3">Categorie 3</Option>
        </Select>
        <Select
          placeholder="Sort by price"
          value={selectedSorting}
          onChange={(value) => setSelectedSorting(value)}
          style={{ width: 200 }}
        >
          <Option value="">No sorting</Option>
          <Option value="asc">Price: Low to High</Option>
          <Option value="desc">Price: High to Low</Option>
        </Select>
      </div>
      <Row gutter={[70, 20]} justify="center" style={{ marginTop: 20 }}>
        {filteredProducts.length === 0 ? (
          <Col span={24} style={{ textAlign: 'center', marginTop: 20 }}>
            <Text type="warning">No products found with the specified criteria.</Text>
          </Col>
    ) : (
      filteredProducts.map((product) => (
        <Col key={product.id} span={6}>
          <Card
            style={{
              width: '100%',
            }}
            cover={
              <img
                alt={product.name}
                src={'../images/' + product.image}
                style={{ width: 272, height: 200, cursor: 'pointer' }}
                onClick={() => handleViewDetails(product, false)}
              />
            }
            actions={[
              <ShoppingCartOutlined key="add-to-cart" onClick={() => handleViewDetails(product, true)} />,
              <EyeOutlined key="view-details" onClick={() => handleViewDetails(product, false)} />,
            ]}
          >
            <Meta
              title={product.name}
              description={
                <>
                  <strong>Price: {product.price} DH</strong>
                </>
              }
            />
          </Card>
        </Col>
      ))
    )}
  </Row>

  {/* Modal for displaying product details and Add to Cart functionality */}
  <Modal
    title="Product Details"
    visible={modalVisible}
    onCancel={() => setModalVisible(false)}
    footer={
      selectedProduct && selectedProduct.quantity !== undefined
        ? [
            <Button key="cancel" onClick={() => setModalVisible(false)}>
              Cancel
            </Button>,
            <Button key="addToCart" type="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>,
          ]
        : [
            <Button key="cancel" onClick={() => setModalVisible(false)}>
              Close
            </Button>,
          ]
    }
  >
    {selectedProduct && (
      <>
        <img
          alt={selectedProduct.name}
          src={'../images/' + selectedProduct.image}
          style={{ width: '100%', height: 'auto' }}
        />
        <p>{`Name: ${selectedProduct.name}`}</p>
        <p>{`Price: ${selectedProduct.price} DH`}</p>
        <p>{`Description: ${selectedProduct.description}`}</p>
        {/* Add more details as needed */}
        {selectedProduct.quantity !== undefined && (
          <p>
            Quantity:{' '}
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
            />
          </p>
        )}
      </>
    )}
  </Modal>
</>
);
};

export default CardProduct;
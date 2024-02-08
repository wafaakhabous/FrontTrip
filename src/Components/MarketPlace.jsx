import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button, Avatar, Image, Input, Tag, Modal, message } from 'antd';
import NavBar from './Blogs/Navbar';
import MarketPlaceSideBar from './MarketPlaceSidebar';
import {HeartFilled, SearchOutlined, StarFilled } from '@ant-design/icons';
import TopSells from './TopSells';
import MarketPlaceProductCard from './MarketPlaceProductCard';
import MarketPlaceCategoryCard from './MarketPlaceCategoryCard';
import MostRecentProduct from './MostRecentProduct';


const MarketPlace = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSorting, setSelectedSorting] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const savedProducts = sessionStorage.getItem('savedProducts');
    const savedProductsObject = JSON.parse(savedProducts);
    

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

    const moveToProducts = () => {
        window.location.href = '/Products'
    }

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
        message.success('Product Added Successfuly to your cart ');
  
        setModalVisible(false); // Close the modal after adding to cart
      };

    return ( 
        <div>
            <NavBar/>
            <Row className='mt-3 d-flex justify-content-between'>
                <Col span={3}>
                    <MarketPlaceSideBar/>
                </Col>
                <Col span={20} >
                <Row>
                  <Col span={14} style={{fontFamily: 'Volkhov', fontSize: 50, color: '#C7923E'}}> 
                  MarketPlace
                  </Col>
                  <Col span={10} className='mt-4'>
                    <Row className='d-flex justify-content-end'>
                        <Col span={10}>
                        <Input placeholder='Search'/>
                        </Col>
                        <Col span={10}>
                        <Button className='d-flex align-items-center' type='primary' style={{fontFamily : 'Mulish', backgroundColor: '#C7923E', color: 'white'}}>
                        <SearchOutlined/>
                        Search
                        </Button>
                        </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className='mt-3 d-flex justify-content-between'>
                    <Col span={14}>
                        <Row>
                            <MostRecentProduct/>
                        </Row>
                        <Row className='mt-5 d-flex justify-content-between align-items-center'>
                            <Col span={18} style={{fontFamily: 'Volkhov', fontSize: 35, color: '#0C111F'}}>
                                Popular Products
                            </Col>
                            <Col span={2}>
                              <Button onClick={moveToProducts} type='primary' style={{fontFamily : 'Mulish', color: '#FFFFFF', backgroundColor:'#C7923E'}}>
                              Show All
                              </Button>
                            </Col>
                        </Row>
                        <Row className='mt-5 d-flex justify-content-between'>
                            {/* <Col span={7}>
                                <MarketPlaceProductCard/>
                            </Col>
                            <Col span={7}>
                                <MarketPlaceProductCard/>
                            </Col>
                            <Col span={7}>
                                <MarketPlaceProductCard/>
                            </Col> */}
                            {
                            products.slice(0,3).map((product) => 
                                <Col span={7}>
                                    <MarketPlaceProductCard addToCart={() => handleViewDetails(product,false)} id={product.id} image={product.image} name={product.name} price={product.price} />
                                </Col>
                            )
                        }
                        </Row>

                    </Col>

                    <Col span={8}>
                        <Row>
                        <Card className='shadow' style={{background: 'linear-gradient(to bottom right, #C7923E, white)'}}>
                            <Row>
                                <Col span={18} style={{color: '#FFFFFF', fontFamily: 'Inter'}}>
                                 BOOK YOUR TICKETS FROM ONCF OFFICIAL SITE
                                </Col>
                            </Row>
                            <Row className='d-flex justify-content-end'>
                                <Col span={6} style={{right: 80}}>
                                    <img src='/images/tgv.png' style={{height: 100}}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                  <Button type='primary' style={{backgroundColor: '#FFFFFF', color: '#0C111F', fontFamily : 'Mulish'}}>
                                    Buy Now
                                  </Button> 
                                </Col>
                            </Row>
                        </Card>
                        </Row>
                        <Row className='mt-4'>
                            <Col span={24}>
                            <TopSells/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='mt-5 d-flex justify-content-between align-items-center'>
                    <Col span={18} style={{fontFamily: 'Volkhov', fontSize: 35, color: '#0C111F'}}>
                        Popular Categories
                    </Col>
                    <Col span={2}>
                        <Button type='primary' style={{fontFamily : 'Mulish', color: '#FFFFFF', backgroundColor:'#C7923E'}}>
                            Show All
                        </Button>
                    </Col>
                </Row>
                <Row className='mt-5 d-flex justify-content-between'>
                    <Col span={5}>
                        <MarketPlaceCategoryCard name='Watchs' image='watchCategory.png'/>
                    </Col>
                    <Col span={5}>
                        <MarketPlaceCategoryCard name='HeadSets' image='a39a7fa9-a5fd-43a7-9f0e-ca765514fac0_appleheadset.jpg'/>
                    </Col>
                    <Col span={5}>
                        <MarketPlaceCategoryCard name='Powerbanks' image='090f57b6-2135-4121-84b3-179771ba7288_powerbankRose.jpg'/>
                    </Col>
                    <Col span={5}>
                        <MarketPlaceCategoryCard name='Airpods' image='206591d1-3242-4e44-a158-36b75cee27a3_appleairpods2.jfif'/>
                    </Col>
                </Row>
                </Col>
            </Row>
              {/* Modal for displaying product details and Add to Cart functionality */}
  <Modal
    title="Product Details"
    visible={modalVisible}
    onCancel={() => setModalVisible(false)}
    footer={
      selectedProduct && selectedProduct.quantite !== undefined
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
        <p>{`Name: ${selectedProduct.name}`} </p>
        <p>{`Price: ${selectedProduct.price} DH`}</p>
        <p>{`Description: ${selectedProduct.description}`}</p>
        <p>{`quantity: ${selectedProduct.quantite}`}</p>
        {/* Add more details as needed */}
        {selectedProduct.quantite !== undefined && (
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
        </div>
    )
}

export default MarketPlace;
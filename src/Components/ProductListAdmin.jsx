import React, { useEffect, useState } from 'react';
import { ShoppingCartOutlined, EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Input, Table, Typography, Select, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from './Navbar';
import Navbar from './Navbar';

const { Text } = Typography;
const { Option } = Select;

const ProductListAdmin = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSorting, setSelectedSorting] = useState('');
  const [deleteProductId, setDeleteProductId] = useState(null); // Track the ID of the product to delete
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // Fetch product data from your backend
  useEffect(() => {
    // Replace the URL with your backend API endpoint
    fetch('http://localhost:8097/api/products/getAll')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const showDeleteModal = (productId) => {
    setDeleteProductId(productId);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = () => {
    // Send a DELETE request to your backend to delete the product
    fetch(`http://localhost:8090/api/products/delete/${deleteProductId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // If the deletion was successful, update the state
          setProducts((prevProducts) => prevProducts.filter((product) => product.id !== deleteProductId));
          message.success('Product deleted successfully!');

        } else {
          console.error('Failed to delete product');
          message.error('Failed to delete product. Please try again.');

        }
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => {
        // Reset the state after deletion
        setDeleteProductId(null);
        setIsDeleteModalVisible(false);
      });
  };

  const handleCancelDelete = () => {
    // Reset the state when canceling the delete action
    setDeleteProductId(null);
    setIsDeleteModalVisible(false);
  };

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

    const columns = [
        {
          title: 'Product Name',
          dataIndex: 'name',
          key: 'name',
          width: 150,
          ellipsis: true,
          render: (text, record) => <Link to={`/product/${record.id}`}>{text}</Link>,
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          width: 100,
          ellipsis: true,
          render: (text) => <strong>{text} DH</strong>,
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
          width: 200,
          ellipsis: true,
          render: (text) => <span>{text}</span>,
        },
        {
          title: 'Nom Categorie',
          dataIndex: 'nom_categorie',
          key: 'nom_categorie',
          width: 150,
          ellipsis: true,
          render: (text) => <span>{text}</span>,
        },
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
          width: 100,
          render: (text) => <span><img src={`../images/${text}`} style={{ width: 50, height: 50 }} alt="Product" /></span>,
        },
        {
            title: 'Actions',
            key: 'actions',
            width: 100,
            render: (text, record) => (
              <>
                <EyeOutlined key={`view-details-${record.id}`} style={{ marginRight: 8 }} />
                <Link to={`/edit-product/${record.id}`}>
            <EditOutlined key={`edit-${record.id}`} style={{ marginRight: 8 }} />
          </Link>
            <DeleteOutlined key={`delete-${record.id}`} onClick={() => showDeleteModal(record.id)} />
              </>
            ),
          },
        ];
      const handleEdit = (productId) => {
        // Handle edit action, for example, redirect to the edit page
        console.log(`Edit product with ID ${productId}`);
      };
      

  return (
    <>
     <Navbar/>
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
        <Link to='/addProduct' className='btn btn-success' style={{ width: 200, marginRight: 16, height:30, float: 'right' }}>
        Add
       </Link>
      </div>
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Text type="warning">No products found with the specified criteria.</Text>
        </div>
      ) : (
        <Table dataSource={filteredProducts} columns={columns} style={{marginTop:100}} />
      )}
    
  {/* Delete Confirmation Modal */}
  <Modal
  title="Confirm Delete"
  visible={isDeleteModalVisible}
  onOk={handleDelete}
  onCancel={handleCancelDelete}
>
  <p>Are you sure you want to delete this product?</p>
</Modal>
</>
);
};

export default ProductListAdmin;
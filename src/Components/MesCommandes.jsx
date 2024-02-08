import React, { useEffect, useState } from 'react';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Table, Typography, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import NavBar from './Blogs/Navbar';
import SideBar from './Blogs/SideBar';
import { Col, Row } from 'antd';
import MarketPlaceSideBar from './MarketPlaceSidebar';



const { Text } = Typography;

const MesCommandes = () => {
  const [commands, setCommands] = useState([]);
  const [deleteCommandId, setDeleteCommandId] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
  const [ligneCommandes, setLigneCommandes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8097/api/commandes/getAll')
      .then((response) => response.json())
      .then((data) => {
        const userIdInSession = JSON.parse(sessionStorage.getItem('user')).id;
        const filteredCommands = data.filter((command) => command.id_user === userIdInSession);
        setCommands(filteredCommands);
      })
      .catch((error) => console.error('Error fetching commands:', error));
  }, []);

  const showDeleteModal = (commandId) => {
    setDeleteCommandId(commandId);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = () => {
    fetch(`http://localhost:8097/api/commandes/delete/${deleteCommandId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setCommands((prevCommands) => prevCommands.filter((command) => command.id !== deleteCommandId));
          message.success('Command deleted successfully!');
        } else {
          console.error('Failed to delete command');
          message.error('Failed to delete command. Please try again.');
        }
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => {
        setDeleteCommandId(null);
        setIsDeleteModalVisible(false);
      });
  };

  const handleCancelDelete = () => {
    setDeleteCommandId(null);
    setIsDeleteModalVisible(false);
  };

  const showDetailsModal = async (command) => {
    setSelectedCommand(command);
    try {
      const response = await fetch(`http://localhost:8097/api/Lignecmd/lignecommandes/${command.id_cmd}`);
      if (response.ok) {
        const ligneCommandesData = await response.json();
        setLigneCommandes(ligneCommandesData);
        setIsDetailsModalVisible(true);
      } else {
        console.error('Failed to fetch ligneCommandes');
      }
    } catch (error) {
      console.error('Error fetching ligneCommandes:', error);
    }
  };

  const handleCancelDetailsModal = () => {
    setSelectedCommand(null);
    setLigneCommandes([]);
    setIsDetailsModalVisible(false);
  };
  const columns = [
    {
      title: 'Command ID',
      dataIndex: 'id_cmd',
      key: 'id-cmd',
      width: 100,
      render: (text) => <Link to={`/command/${text}`}>{text}</Link>,
    },
    {
      title: 'User ID',
      dataIndex: 'id_user',
      key: 'id_user',
      width: 100,
    },
    {
      title: 'Total Price',
      dataIndex: 'total',
      key: 'total',
      width: 100,
      render: (text) => <strong>{text} DH</strong>,
    },
    {
      title: 'Status',
      dataIndex: 'statut',
      key: 'statut',
      width: 100,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      render: (text, record) => (
        <>
          <EyeOutlined
            key={`view-details-${record.id}`}
            style={{ marginRight: 8 }}
            onClick={() => showDetailsModal(record)}
          />
          <DeleteOutlined key={`delete-${record.id}`} onClick={() => showDeleteModal(record.id)} />
        </>
      ),
    },
  ];
  const columnsLigneCommandes = [
    {
      title: 'Product ID',
      dataIndex: 'id_produit',
      key: 'id_produit',
    },
    // {
    //   title: 'Product Image',
    //   dataIndex: 'image_produit',
    //   key: 'image_produit',
    // },
    {
      title: 'Quantity',
      dataIndex: 'qte',
      key: 'qte',
    },
    {
      title: 'Price',
      dataIndex: 'prix',
      key: 'prix',
      render: (text) => <strong>{text} DH</strong>,
    },
  ];


  return (
    <>
            <NavBar></NavBar>
            <Row style={{height: '100vh'}} gutter={[16, 16]}>
           <Col span={4} style={{width: 'max-content'}} >
            <MarketPlaceSideBar/>
           </Col>
           <Col span={16}>  
<div style={{marginLeft:350}}><br></br><br></br> <Text><b>Mes commandes</b></Text></div>          

            <Table dataSource={commands} columns={columns} style={{ marginTop: 20 }} />

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        visible={isDeleteModalVisible}
        onOk={handleDelete}
        onCancel={handleCancelDelete}
      >
        <p>Are you sure you want to delete this command?</p>
      </Modal>
      
      </Col>    {/* Details Modal */}
      <Modal
            title={`Command Details - ${selectedCommand?.id_cmd || ''}`}
            visible={isDetailsModalVisible}
            onCancel={handleCancelDetailsModal}
            footer={null}
          >
            {selectedCommand && (
              <div>
                <p>User ID: {selectedCommand.id_user}</p>
                <p>Total Price: {selectedCommand.total} DH</p>
                <p>Status: {selectedCommand.statut}</p>
                {/* Render details for each ligne commande in a decorated table */}
                <Table dataSource={ligneCommandes} columns={columnsLigneCommandes} bordered />
              </div>
            )}
          </Modal>
      </Row>
    </>
  );
};

export default MesCommandes;
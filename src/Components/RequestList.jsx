import React, { useState, useEffect } from 'react';
import NavBar from './Blogs/Navbar';
import { Link } from 'react-router-dom';
import '../css/RequestsCards.css';

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  
  // const [isModalOpen, setIsModalOpen] = useState(false); // State for managing popup visibility
  const userString = localStorage.getItem('user');
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null); // State for tracking selected request
  const [isAddRequestModalOpen, setIsAddRequestModalOpen] = useState(false);
  const user = JSON.parse(userString);
  const userId = user ? user.id : null;
  const [loading, setLoading] = useState(true);

  const handleAddRequest = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
  
    try {
      if (!userId) {
        console.error('UserId is not defined');
        return;
      }
  
      const formData = new FormData(event.target); // Get form data
      const source = formData.get('source');
      const destination = formData.get('destination');
      const date= formData.get('date');
      const description= formData.get('description');
      // Validate source and destination fields
      if (!source || !destination) {
        console.error('Source and destination are required');
        return;
      }
  
      const newRequest = {
        userId: userId,
        source: source,
        destination: destination,
        date: date,
        description: description
        //date: formData.get('date'),
        // description: formData.get('description')
      };
  
      const response = await fetch('http://localhost:8035/comp/comp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRequest),
      });
  
      if (response.ok) {
        const updatedRequests = await response.json();
        setRequests(Array.isArray(updatedRequests) ? updatedRequests : []);
        setIsAddRequestModalOpen(false); // Close the popup after successfully adding the request
        window.location.href = 'travel-requests';
      } else {
        console.error('Failed to add request');
      }
    } catch (error) {
      console.error('Error during API request:', error);
    }
  };
  

  const handleSendInvitation = async () => {
    try {
      if (!userId || !selectedRequest || !selectedRequest.userId) {
        console.error('User ID or selected request not defined');
        return;
      }

      const newInvitation = {
        userSender: userId,
        userReceiver: selectedRequest.userId,
        requestId: selectedRequest.id
      };

      const response = await fetch('http://localhost:8035/inv/inv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInvitation),
      });

      if (response.ok) {
        console.log('Invitation sent successfully');
      } else {
        console.error('Failed to send invitation');
      }
    } catch (error) {
      console.error('Error during API request:', error);
    }
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8035/comp/comp');

        if (response.ok) {
          const data = await response.json();

          // Fetch additional user details for each request
          const requestsWithUserDetails = await Promise.all(
            data.map(async (request) => {
              const userResponse = await fetch(`http://localhost:8035/users/${request.userId}`);
              const userData = await userResponse.json();
              return { ...request, username: userData.username, sexe: userData.sexe };
            })
          );
          setRequests(Array.isArray(requestsWithUserDetails) ? requestsWithUserDetails : []);
        } else {
          console.error('Failed to fetch data', response);
        }
      } catch (error) {
        console.error('Error during API request:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const handleClickCard = (request) => {
    setSelectedRequest(request);
    setIsCardModalOpen(true);
  };
  const toggleModal = () => {
    setIsAddRequestModalOpen(!isAddRequestModalOpen);
  };

  const toggleCardModal = () => {
    setIsCardModalOpen(!isCardModalOpen);
  };
  return (
    <div style={{ fontFamily: 'Arial, sans-serif'  }}>
     <NavBar></NavBar>
      <section className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col text-center mb-5">
              <p className="lead">Travel compagnon List</p>
              {/* Use Link component to redirect to CreateRequestForm */}
              {/* <Link className="button-52" to="/create-request">Add Request</Link> */}
              {/* Button to open the popup */}
              <Link className="button-52" onClick={toggleModal}>Add Request</Link>
            </div>
          </div>
          <div className="row">
            {requests.map((request) => (
              <div key={request.id} className="col-sm-12 col-md-6 col-lg-4 mb-4">
                <div className="card text-dark card-has-bg"  onClick={() => handleClickCard(request)}>
                  <div className="card-img-overlay d-flex flex-column">
                    <div className="card-body">
                      <small className="card-meta mb-2">from {request.source} to {request.destination}</small>
                      <h4 className="card-title mt-0">
                        <a className="text-dark" href="https://creativemanner.com"></a>
                      </h4>
                      <small>
                        <i className="far fa-clock"></i> {request.date}
                      </small>
                    </div>
                    <div className="card-footer">
                      <div className="media">
                        <img
                          className="mr-3 rounded-circle"
                          src="https://assets.codepen.io/460692/internal/avatars/users/default.png?format=auto&version=1688931977&width=80&height=80"
                          alt="Generic placeholder image"
                          style={{ maxWidth: '50px' }}
                        />
                        <div className="media-body">
                          <h6 className="my-0 text-dark d-block">{request.username}</h6>
                          <small> {request.sexe}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


       {/* Popup component */}
      
    
    {isAddRequestModalOpen  && (
  <div className="popup">
    <div className="popup-inner">
      <h2>Add Request</h2>
      <form onSubmit={handleAddRequest}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="source">Source:</label>
            <input type="text" id="source" name="source" />
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination:</label>
            <input type="text" id="destination" name="destination" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" rows="4"></textarea>
          </div>
        </div>
        <div className="form-group button-group">
          <button type="submit" className="button-52">Add Request</button>
          <button type="button" className="button-52" onClick={toggleModal}>Close Popup</button>
        </div>
      </form>
    </div>
  </div>
)}



{/* Card Details Popup */}
{isCardModalOpen && selectedRequest && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Request Details</h2>
            <div className="media-body">
              <h6 className="my-0 text-dark d-block">{selectedRequest.username}</h6>
              <small> {selectedRequest.sexe}</small>
              <h6 className="my-0 text-dark d-block">Date</h6>
              <small> {selectedRequest.date}</small>
              <h6 className="my-0 text-dark d-block">Description</h6>
              <small> {selectedRequest.description}</small>
            </div>
            <button type="button" className="button-52" onClick={toggleCardModal}>Close Popup</button>
            {/* Button to send invitation */}
            <button type="button" className="button-52" onClick={handleSendInvitation}>Send Invitation</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestList;

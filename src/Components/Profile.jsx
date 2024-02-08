import React, { useEffect, useState } from 'react';
import NavBar from './Blogs/Navbar';

const Profile = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    address: '',
    nationality: '',
    sexe: '',
     profilePicture: '',
  });
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    profilePicture: null, 
  });
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log(parsedUser);
      setUserData(parsedUser);
    }
  }, []);
  const handleEditProfileClick = () => {
    // Initialize the form fields with the current user data
    setUpdatedUserData({ ...userData ,profilePicture: null});
    setShowEditProfileModal(true);
  };

  const handleModalClose = () => {
    setShowEditProfileModal(false);
  };
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setUserData((prevData) => ({
        ...prevData,
        profilePicture: files[0],
      }));
    } else {
      setUpdatedUserData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const handleSaveProfile = async () => {
    const formData = new FormData();
//    formData.append('profilePicture', userData.profilePicture);

    // Append each field of updatedUserData individually
    Object.keys(updatedUserData).forEach((key) => {
        formData.append(key, updatedUserData[key]);
    });

    try {
        console.log('Sending request:', formData);
        const response = await fetch(`http://localhost:8035/users/${userData.id}`, {
            method: 'PUT',
            body: formData,
            headers: 
            {

            },
        });

        console.log('Response:', response);

        if (response.ok) {
            // Profile update successful
            const updatedUser = await response.json();
            // Update local state or perform any other actions as needed
            setUserData(updatedUser);
        } else {
            // Handle error cases
            console.error('Profile update failed');
        }
    } catch (error) {
        console.error('Error during profile update:', error);
    }

    // Close the modal after handling the API response
    setShowEditProfileModal(false);
};

  
  return (
    
      
      <div   ><NavBar></NavBar>
{showEditProfileModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="card p-4" style={{ width: '350px', backgroundColor: '#efefef', border: 'none', cursor: 'pointer', transition: 'all 0.5s' }}>
              <h2>Edit Profile</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={updatedUserData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="firstname" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    name="firstname"
                    value={updatedUserData.firstname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastname" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    value={updatedUserData.lastname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                    <label htmlFor="sexe" className="form-label">
                      Sex
                    </label>
                    <select
                      className="form-select"
                      id="sexe"
                      name="sexe"
                      value={updatedUserData.sexe}
                      onChange={handleInputChange}
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>
                <div className="mb-3">
                  <label htmlFor="nationality" className="form-label">
                    Nationality
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nationality"
                    name="nationality"
                    value={updatedUserData.nationality}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={updatedUserData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={updatedUserData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                <label htmlFor="profilePicture" className="form-label">
                  Profile Picture
                </label>
                <input type="file" className="form-control" id="profilePicture" name="profilePicture" onChange={handleInputChange} />
              </div>
                <button type="button" className="btn btn-primary" onClick={handleSaveProfile}>
                  Save
                </button>
                <button type="button" className="btn btn-secondary ms-2" onClick={handleModalClose}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      <div className="card p-4" style={{ width: '350px', backgroundColor: '#efefef', border: 'none', cursor: 'pointer', transition: 'all 0.5s' }}>
        
        <div className="image d-flex flex-column justify-content-center align-items-center">
          <button className="btn btn-success" style={{ height: '140px', width: '140px', borderRadius: '50%' }}>
            <img src={'../images/comment-image2.jpg'} height="100" width="100" alt="Profile" style={{ borderRadius: 50 }}/>
          </button>
          <span className="name mt-3" style={{ fontSize: '22px', fontWeight: 'bold' }}>{userData.firstname} {userData.lastname}</span>
          <span className="idd">@{userData.username}</span>
          <div className="d-flex flex-row justify-content-center align-items-center gap-2">
            <span className="idd1">{userData.email}</span>
            <span><i className="fa fa-copy"></i></span>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <span className="number"> {userData.sexe}  | {userData.nationality}</span>
          </div>
          <div className="d-flex mt-2">
            <button className="btn1 btn-dark" style={{ height: '40px', width: '150px', border: 'none', backgroundColor: '#000', color: '#aeaeae', fontSize: '15px' }}
            onClick={handleEditProfileClick}>Edit Profile</button>
          </div>
          <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
            <span><i className="fa fa-twitter"></i></span>
            <span><i className="fa fa-facebook-f"></i></span>
            <span><i className="fa fa-instagram"></i></span>
            <span><i className="fa fa-linkedin"></i></span>
          </div>
          <div className="px-2 rounded mt-4 date" style={{ backgroundColor: '#ccc' }}>
            <span className="join" style={{ fontSize: '14px', color: '#a0a0a0', fontWeight: 'bold' }}>Joined May,2021</span>
          </div>
        </div>
      </div>
      </div>
     
  );
};
export default Profile;
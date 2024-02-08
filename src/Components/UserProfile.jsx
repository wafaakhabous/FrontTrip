import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const UserProfile = () => {

     const { userId } = useParams();
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8035/users/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div className="card p-4" style={{ width: '350px', backgroundColor: '#efefef', border: 'none', cursor: 'pointer', transition: 'all 0.5s' }}>
        <div className="image d-flex flex-column justify-content-center align-items-center">
          <button className="btn btn-success" style={{ height: '140px', width: '140px', borderRadius: '50%' }}>
            <img src={userData.profilePicture || '../images/default-profile-picture.jpg'} height="100" width="100" alt="Profile" style={{ borderRadius: 50 }} />
          </button>
          <span className="name mt-3" style={{ fontSize: '22px', fontWeight: 'bold' }}>{userData.firstname} {userData.lastname}</span>
          <span className="idd">@{userData.username}</span>
          <div className="d-flex flex-row justify-content-center align-items-center gap-2">
            <span className="idd1">{userData.email}</span>
            <span><i className="fa fa-copy"></i></span>
          </div>
          <div className="d-flex flex-row justify-content-center align-items-center mt-3">
            <span className="number">{userData.sexe} | {userData.nationality}</span>
          </div>
          <div className="px-2 rounded mt-4 date" style={{ backgroundColor: '#ccc' }}>
            <span className="join" style={{ fontSize: '14px', color: '#a0a0a0', fontWeight: 'bold' }}>Joined May,2021</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

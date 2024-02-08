import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/util.css';
import '../css/main.css';
import Profile from './Profile'; // Adjust the path as needed

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    firstname:'' /* provide the user's first name here */,
  lastname:'' /* provide the user's last name here */,
  email:'' /* provide the user's email here */,
  address: ''/* provide the user's address here */,
  nationality:'' /* provide the user's nationality here */,
  sexe:'' /* provide the user's gender/sex here */,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const postData = {
      username: formData.username,
      password: formData.password,
    };
  
    try {
      const response = await fetch('http://localhost:8035/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
  
      if (response.ok) {
        const user = await response.json(); // Parse the response as JSON
        localStorage.setItem('user', JSON.stringify(user));
        console.log('User information:', user);
        window.location.href = './Welcome';
      } else {
        console.error('Failed to login:', response.statusText);
        // Handle error cases here
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle network or other errors here
    }
  };
  

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form
            className="login100-form validate-form p-l-55 p-r-55 p-t-178"
            onSubmit={handleSubmit}
          >
            <span className="login100-form-title">Sign In</span>

            <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
              <input
                className="input100"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <span className="focus-input100"></span>
            </div>

            <div className="wrap-input100 validate-input" data-validate="Please enter password">
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <span className="focus-input100"></span>
            </div>

            <div className="text-right p-t-13 p-b-23">
              <span className="txt1">Forgot</span>
              <a href="#" className="txt2">
                Username / Password?
              </a>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Sign in</button>
            </div>

            <div className="flex-col-c p-t-170 p-b-40">
              <span className="txt1 p-b-9">Don’t have an account?</span>
              <a href="SignUp" className="txt3">
                Sign up now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

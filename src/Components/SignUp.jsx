import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/util.css';
import '../css/main.css';
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    nationality: '',
    sexe: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'firstname',
      'lastname',
      'username',
      'email',
      'password',
      'confirmPassword',
      'address',
      'nationality',
      'sexe',
    ];
    const newErrors = {};
    let hasErrors = false;

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
        hasErrors = true;
      }
    });

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
      hasErrors = true;
    }

    setErrors(newErrors);

    return !hasErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Prepare data for the POST request
    const postData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      address: formData.address,
      nationality: formData.nationality,
      sexe: formData.sexe,
    };

    try {
      // Make a POST request to the backend API
      const response = await fetch('http://localhost:8035/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        console.log('User successfully registered!');
        window.location.href = './profile';
        // You can redirect the user to a success page or perform any other actions
      } else {
        console.error('Failed to register user:', response.statusText);
        // Handle error cases here
      }
    } catch (error) {
      console.error('Error during user registration:', error.message);
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
            <span className="login100-form-title">Sign Up</span>
  
            <div className="row">
              <div className="col-md-6">
                {/* First column of inputs */}
                <div className="wrap-input100 validate-input m-b-16">
                  <input
                    className="input100"
                    type="text"
                    name="firstname"
                    placeholder="First Name"
                    value={formData.firstname}
                    onChange={handleChange}
                    required
                  />
                  <span className="focus-input100"></span>
                  {errors.firstname && (
                    <span className="text-danger">{errors.firstname}</span>
                  )}
                </div>
  
                <div className="wrap-input100 validate-input m-b-16">
                  <input
                    className="input100"
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    value={formData.lastname}
                    onChange={handleChange}
                    required
                  />
                  <span className="focus-input100 "></span>
                  {errors.lastname && (
                    <span className="text-danger">{errors.lastname}</span>
                  )}
                </div>
  
                <div className="wrap-input100 validate-input m-b-16">
                  <input
                    className="input100"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                  <span className="focus-input100 "></span>
                  {errors.username && (
                    <span className="text-danger">{errors.username}</span>
                  )}
                </div>
  
                <div className="wrap-input100 validate-input m-b-16">
                  <input
                    className="input100"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <span className="focus-input100"></span>
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>
              </div>
  
              <div className="col-md-6">
                {/* Second column of inputs */}
                <div className="wrap-input100 validate-input m-b-16">
                  <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <span className="focus-input100"></span>
                  {errors.password && (
                    <span className="text-danger">{errors.password}</span>
                  )}
                </div>
  
                <div className="wrap-input100 validate-input m-b-16">
                  <input
                    className="input100"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <span className="focus-input100"></span>
                  {errors.confirmPassword && (
                    <span className="text-danger">{errors.confirmPassword}</span>
                  )}
                </div>
  
                <div className="wrap-input100 validate-input m-b-16">
                  <input
                    className="input100"
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                  <span className="focus-input100 "></span>
                  {errors.address && (
                    <span className="text-danger">{errors.address}</span>
                  )}
                </div>
  
                <div className="wrap-input100 validate-input m-b-16">
                  <input
                    className="input100"
                    type="text"
                    name="nationality"
                    placeholder="Nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                  />
                  <span className="focus-input100"></span>
                  {errors.nationality && (
                    <span className="text-danger">{errors.nationality}</span>
                  )}
                </div>
  
                <div className="wrap-input100 validate-input m-b-16">
                  <select
                    className="input100"
                    name="sexe"
                    value={formData.sexe}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                  <span className="focus-input100"></span>
                  {errors.sexe && (
                    <span className="text-danger">{errors.sexe}</span>
                  )}
                </div>
              </div>
            </div>
  
            <div className="container-login100-form-btn">
              <button className="login100-form-btn">Sign Up</button>
            </div>
  
            <div className="flex-col-c p-t-170 p-b-40">
              <span className="txt1 p-b-9">already have an account?</span>
              <a href="Login" className="txt3">
                Sign in now
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
                  };  

export default SignUp;

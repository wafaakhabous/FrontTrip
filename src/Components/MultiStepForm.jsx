// src/MultiStepForm.js
import React, { useState } from 'react';
import '../css/StyleForm.css'; // Import the styles

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const[formData, setFormData] = useState({
    date_start_1 : '',
    date_end_1 : '',
    cityname1 : '',
    date_start_2 : '',
    date_end_2 : '',
    cityname2 : '',
    date_start_trip : '',
    date_end_trip : '',
    description : ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    console.log('Back button clicked. Previous step:', step - 1);
    setStep((prevStep) => prevStep - 1);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    console.log("HHHHHHHHHHHHHH");
    if(formData.cityname1 !== '' && formData.date_start_1 !== '' && formData.date_end_1 !== '' &&
       formData.date_start_2 !== '' && formData.date_end_2 !== '' && formData.cityname2 !== '' &&
       formData.date_start_trip !== '' && formData.date_end_trip !== '' && formData.description !== '')
       {
        // Make a POST request to the backend API
      const response = await fetch('http://localhost:8093/api/vi/blogs/AddBlog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if(response.ok){
        console.log("ADDDDDDDDDDDDDDD");
      } else {
        console.log("NOOOOOOOOOOOOOOO");
      }
      
    }
    // Add form submission logic here
  };

  return (
    <div className="formbold-main-wrapper">
      <div className="formbold-form-wrapper">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="formbold-steps">
            <ul>
              <li className={`formbold-step-menu1 ${step === 1 ? 'active' : ''}`}>
                <span>1</span>
                Itineraries
              </li>
              <li className={`formbold-step-menu2 ${step === 2 ? 'active' : ''}`}>
                <span>2</span>
                Trip
              </li>
              <li className={`formbold-step-menu3 ${step === 3 ? 'active' : ''}`}>
                <span>3</span>
                Blog
              </li>
            </ul>
          </div>

          <div className={`formbold-form-step-${step} active`}>
            {step === 1 && (
              <div className="formbold-input-flex">
                <div>
                  <label htmlFor="date_start_1" className="formbold-form-label">
                    Date Start
                  </label>
                  <input
                    type="date"
                    name="date_start_1"
                    id="date_start_1"
                    className="formbold-form-input"
                    value={formData.date_start_1}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="date_end_1" className="formbold-form-label">
                    Date End
                  </label>
                  <input
                    type="date"
                    name="date_end_1"
                    id="date_end_1"
                    className="formbold-form-input"
                    value={formData.date_end_1}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="cityname1" className="formbold-form-label">
                    City Name
                  </label>
                  <input
                    type="text"
                    name="cityname1"
                    placeholder="City name.."
                    id="cityname1"
                    className="formbold-form-input"
                    value={formData.cityname1}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="formbold-input-flex">
              <div>
                <label htmlFor="date_start_2" className="formbold-form-label">
                  Date Start
                </label>
                <input
                  type="date"
                  name="date_start_2"
                  id="date_start_2"
                  className="formbold-form-input"
                  value={formData.date_start_2}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="date_end_2" className="formbold-form-label">
                  Date End
                </label>
                <input
                  type="date"
                  name="date_end_2"
                  id="date_end_2"
                  className="formbold-form-input"
                  value={formData.date_end_2}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="cityname2" className="formbold-form-label">
                  City Name
                </label>
                <input
                  type="text"
                  name="cityname2"
                  placeholder="City name.."
                  id="cityname2"
                  className="formbold-form-input"
                  value={formData.cityname2}
                  onChange={handleChange}
                />
              </div>
            </div>
            )}

            {step === 2 && (
              <div className="formbold-input-flex">
              <div>
                <label htmlFor="date_start_trip" className="formbold-form-label">
                  Date Start
                </label>
                <input
                  type="date"
                  name="date_start_trip"
                  id="date_start_trip"
                  className="formbold-form-input"
                  value={formData.date_start_trip}
                    onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="date_end_trip" className="formbold-form-label">
                  Date End
                </label>
                <input
                  type="date"
                  name="date_end_trip"
                  id="date_end_trip"
                  className="formbold-form-input"
                  value={formData.date_end_trip}
                    onChange={handleChange}
                />
              </div>
            </div>
            )}

            {step === 3 && (
              <div>
                <label htmlFor="description" className="formbold-form-label">
                  Blog Description
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="description"
                  id="description"
                  className="formbold-form-input"
                  value={formData.description}
                    onChange={handleChange}
                />
              </div>
            )}
          </div>

          <div className="formbold-form-btn-wrapper">
          
              <button className="formbold-btn" onClick={handleBack} style={{backgroundColor:'lightgray'}}>
                Back
              </button>
          
            <button className="formbold-btn" onClick={step < 3 ? handleNext : handleSubmit}>
              {step < 3 ? 'Next Step' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MultiStepForm;

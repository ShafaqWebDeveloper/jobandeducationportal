import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ApplicationForm() {
  const { jobId } = useParams(); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: event.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('resume', formData.resume);
    data.append('jobId', jobId);
  
    try {
       await axios.post('http://localhost:8001/jobapply', data);
      alert("job application successfully submited")
    } catch (error) {
      console.error('Error submitting application:', error);
    alert("error in submitting job application")
    }
  };
  
  return (
    <div className="application-form">
      <h2>Apply for Job ID: {jobId}</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Resume:</label>
          <input type="file" name="resume" onChange={handleFileChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ApplicationForm;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CourseApplicationForm() {
  const { cid } = useParams();
  const [formData, setFormData] = useState({
    aname: '',
    aemail: '',
    apass: '',
    aphone: '',
    aaddress: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('aname', formData.aname);
    data.append('aemail', formData.aemail);
    data.append('apass', formData.apass);
    data.append('aphone', formData.aphone);
    data.append('aaddress', formData.aaddress);
    data.append('acourseid', cid);

    try {
        await axios.post('http://localhost:8001/courseapply', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        alert('Application submitted successfully!');
    } catch (error) {
        console.error('Error submitting application:', error);
        alert('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="application-form">
      <h2>Apply for Course ID: {cid}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="aname" value={formData.aname} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="aemail" value={formData.aemail} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="apass" value={formData.apass} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone no:</label>
          <input type="number" name="aphone" value={formData.aphone} onChange={handleChange} required />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="aaddress" value={formData.aaddress} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CourseApplicationForm;

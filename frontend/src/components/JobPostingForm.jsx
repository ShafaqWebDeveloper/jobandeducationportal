import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const JobPostingForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    jtitle: '',
    jdes: '',
    jcompany: '',
    jlocation: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.jtitle) tempErrors.jtitle = "title is required.";
    if (!formData.jdes) tempErrors.jdes = "job description is required.";
    if (!formData.jcompany) tempErrors.jcompany = "company name is required.";
    if (!formData.jlocation) tempErrors.jlocation = "location is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const token = localStorage.getItem('token');
      axios.post('http://localhost:8001/post-job', formData , {
        headers: {
            'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        alert("job posted successfully");
        setFormData({
          jtitle: '',
          jdes: '',
          jcompany: '',
          jlocation: ''
        });
        onSubmit(response.data);
      })
      .catch(error => {
        console.error('Error submitting application:', error);
        console.log('Full Error:', error); // Log the full error object
        if (error.response && error.response.status === 403) {
          
          alert('Only administrators can post jobs.');
        } else {
          alert('Failed to submit application. Please try again.');
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <label>
        Job Title:
        <input
          type="text"
          name="jtitle"
          value={formData.jtitle}
          onChange={handleChange}
          className={errors.jtitle ? 'error' : ''}
        />
        {errors.jtitle && <span className="error-text">{errors.jtitle}</span>}
      </label>
      <label>
        Description:
        <input
          type="text"
          name="jdes"
          value={formData.jdes}
          onChange={handleChange}
          className={errors.jdes ? 'error' : ''}
        />
        {errors.jdes && <span className="error-text">{errors.jdes}</span>}
      </label>
      <label>
        Company:
        <input
          type="text"
          name="jcompany"
          value={formData.jcompany}
          onChange={handleChange}
          className={errors.jcompany ? 'error' : ''}
        />
        {errors.jcompany && <span className="error-text">{errors.jcompany}</span>}
      </label>
      <label>
        Location:
        <input
          type="text"
          name="jlocation"
          value={formData.jlocation}
          onChange={handleChange}
          className={errors.jlocation ? 'error' : ''}
        />
        {errors.jlocation && <span className="error-text">{errors.jlocation}</span>}
      </label>
      <button type="submit" className="submit-button">Save</button>
    </form>
  );
};

JobPostingForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default JobPostingForm;

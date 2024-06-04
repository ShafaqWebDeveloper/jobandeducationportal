import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const RegistrationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    uname: '',
    uemail: '',
    upassword: '',
    urole: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!formData.uname) tempErrors.uname = "Name is required.";
    if (!formData.uemail) tempErrors.uemail = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.uemail)) tempErrors.uemail = "Email is invalid.";
    if (!formData.upassword) tempErrors.upassword = "Password is required.";
    if (formData.upassword.length < 6) tempErrors.upassword = "Password must be at least 6 characters long.";
    if (!formData.urole) tempErrors.urole = "Role is required.";
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
      axios.post('http://localhost:8001/register', formData)
        .then(response => {
          console.log('Registration successful:', response.data);
          setFormData({
            uname: '',
            uemail: '',
            upassword: '',
            urole: ''
          });
          onSubmit(response.data);
        })
        .catch(error => console.error('There was an error!', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <label>
        Name:
        <input
          type="text"
          name="uname"
          value={formData.uname}
          onChange={handleChange}
          className={errors.uname ? 'error' : ''}
        />
        {errors.uname && <span className="error-text">{errors.uname}</span>}
      </label>
      <label>
        Email:
        <input
          type="email"
          name="uemail"
          value={formData.uemail}
          onChange={handleChange}
          className={errors.uemail ? 'error' : ''}
        />
        {errors.uemail && <span className="error-text">{errors.uemail}</span>}
      </label>
      <label>
        Password:
        <input
          type="password"
          name="upassword"
          value={formData.upassword}
          onChange={handleChange}
          className={errors.upassword ? 'error' : ''}
        />
        {errors.upassword && <span className="error-text">{errors.upassword}</span>}
      </label>
      <label>
        Role:
        <select name="urole" value={formData.urole} onChange={handleChange}>
          <option value="">Select a role</option>
          <option value="Student">Student</option>
          <option value="Job Seeker">Job Seeker</option>
          <option value="Administrator">Administrator</option>
        </select>
        {errors.urole && <span className="error-text">{errors.urole}</span>}
      </label>
      <button type="submit" className="submit-button">Register</button>
    </form>
  );
};

RegistrationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegistrationForm;

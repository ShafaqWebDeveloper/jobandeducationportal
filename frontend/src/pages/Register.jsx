// src/pages/Register.js
import React from 'react';
import RegistrationForm from '../components/RegistrationForm';

const Register = () => {
  const handleRegistration = (data) => {
    console.log('User registered:', data);
    alert("registered successfully");
  };

  return (
    <div>
      <h1>Register</h1>
      <RegistrationForm onSubmit={handleRegistration} />
    </div>
  );
};
export default Register;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found in local storage');
                return;
            }
             await axios.post('http://localhost:8001/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            // Clear all stored user info from local storage
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userRole');
            // Show an alert
            alert('Logged out successfully');
            // Redirect to login page
            navigate('/');
        } catch (err) {
            if (err.response && err.response.status === 403) {
                alert('Session expired. Please log in again.');
                localStorage.removeItem('token');
                localStorage.removeItem('userEmail');
                localStorage.removeItem('userRole');
                navigate('/');
            } else {
                console.error('Error logging out:', err);
            }
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;

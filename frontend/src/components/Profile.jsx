import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8001/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` // Assuming you store the token in localStorage
            }
        })
        .then(response => {
            console.log('Response from backend:', response.data); // Log the response data
            setUserProfile(response.data);
        })
        .catch(error => {
            console.error('Error fetching user profile:', error);
        });
    }, []);

    console.log('User profile:', userProfile); // Log the userProfile state

    return (
        <div>
            {userProfile ? (
                <div>
                    <h2>Profile</h2>
                    <h1>Email: {userProfile.email}</h1>
                    <h1>Role: {userProfile.role}</h1>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Profile;

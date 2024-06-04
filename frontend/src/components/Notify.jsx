import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notify = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            axios.get('http://localhost:8001/notify')
                .then(response => {
                    setData(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the data!', error);
                });
        };

        fetchData();
        const interval = setInterval(fetchData, 5000); // Poll every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>A new person applied for a job</h1>
            <div className="jobs">
                <table className='job-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Job ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((job, index) => (
                            <tr key={index}>
                                <td>{job.name}</td>
                                <td>{job.email}</td>
                                <td>{job.jobId}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Notify;

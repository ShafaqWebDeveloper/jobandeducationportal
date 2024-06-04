import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8001/jobs')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handleApply = (jobId) => {
        navigate(`/jobapply/${jobId}`);
    };

    return (
        <div><h1>Jobs</h1>
            <div className="jobs">
                <table className='job-table'>
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Description</th>
                            <th>Company Name</th>
                            <th>Location</th>
                            <th>Apply</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((job) => (
                            <tr key={job.jid}>
                                <td>{job.jtitle}</td>
                                <td>{job.jdes}</td>
                                <td>{job.jcompany}</td>
                                <td>{job.jlocation}</td>
                                <td>
                                    <button onClick={() => handleApply(job.jid)}>Apply now</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Jobs;

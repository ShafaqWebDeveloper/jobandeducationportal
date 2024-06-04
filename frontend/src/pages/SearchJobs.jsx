// SearchJobs.jsx
import React, { useState } from 'react';
import JobSearch from '../components/JobSearch';
import '../styles.css';

const SearchJobs = () => {
  const [jobs, setJobs] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`http://localhost:8001/search-jobs?search=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched jobs:', data); // Debugging statement
      setJobs(data); 
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (
    <div>
      <h1>Search Jobs</h1>
      <JobSearch jobs={jobs} onSearch={handleSearch} />
    </div>
  );
};

export default SearchJobs;

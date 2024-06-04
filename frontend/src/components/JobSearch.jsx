// JobSearch.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const JobSearch = ({ jobs, onSearch }) => {
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search term:', e.target.searchTerm.value); 
    onSearch(e.target.searchTerm.value);
  };
  const handleApply = (jobId) => {
    navigate(`/jobapply/${jobId}`);
  };
  return (
    <div className="job-search">
      <form onSubmit={handleSearch} className="job-search-form">
        <input type="text" name="searchTerm" placeholder="Search for jobs..." />
        <button type="submit">Search</button>
      </form>
      <div className="jobs">
        {jobs.map((job) => (
          
            <table className='job-table' key={job.jid}> <thead><tr><th>Job Title</th><th>Description</th><th>Company Name</th><th>Location</th><th>Apply</th></tr></thead>
            <tbody><tr><td>{job.jtitle}</td><td>{job.jdes}</td><td>{job.jcompany}</td><td>{job.jlocation}</td><td><button onClick={() => handleApply(job.jid)}>Apply now</button></td></tr></tbody></table>
        ))}
      </div>
    </div>
  );
};

JobSearch.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      jid: PropTypes.number.isRequired,
      jtitle: PropTypes.string.isRequired,
      jcompany: PropTypes.string.isRequired,
      jlocation: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default JobSearch;

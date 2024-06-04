// src/components/JobList.js
import React from 'react';
import PropTypes from 'prop-types';

const JobList = ({ jobs }) => (
  <ul className="job-list">
    {jobs.map((job, index) => (
      <li key={index} className="job-list-item">
        <h3>{job.title}</h3>
        <p>{job.description}</p>
        <p>{job.company} - {job.location}</p>
      </li>
    ))}
  </ul>
);

JobList.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default JobList;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const CourseSearch = ({ onSearch }) => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all courses initially
    fetch('/search-course')
      .then(response => response.json())
      .then(data => setFilteredCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.searchTerm.value.toLowerCase();

    fetch(`/search-course?search=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setFilteredCourses(data);
        onSearch(searchTerm);
      })
      .catch(error => console.error('Error searching courses:', error));
  };

  const handleApply = (cid) => {
    navigate(`/courseapply/${cid}`);
  };
  const handleProgress = (cid) => {
    navigate(`/addprogress/${cid}`);
  };
  return (
    <div className="job-search">
      <form onSubmit={handleSearch} className="job-search-form">
        <input type="text" name="searchTerm" placeholder="Search for Courses.." />
        <button type="submit">Search</button>
      </form>
      <div className="jobs">
      <table className='job-table' >
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Fee</th>
                <th>Apply</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
        {filteredCourses.map((c) => (
          
              <tr key={c.cid}>
                <td>{c.cname}</td>
                <td>{c.cdes}</td>
                <td>{c.cduration}</td>
                <td>{c.cfee}</td>
                <td><button onClick={() => handleApply(c.cid)}>Apply now</button></td>
                <td><button onClick={() => handleProgress(c.cname)}>Add Progress</button></td>
              </tr>
            
        ))}
        </tbody>
          </table>
      </div>
    </div>
  );
};

CourseSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default CourseSearch;

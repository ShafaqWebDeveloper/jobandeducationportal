// SearchCourse.jsx
import React, { useState } from 'react';
import CourseSearch from '../components/CourseSeach';
import '../styles.css';

const SearchCourse = () => {
  const [course, set] = useState([]);

  const handleSearch = async (searchTerm) => {
    try {
      const response = await fetch(`http://localhost:8001/search-course?search=${searchTerm}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched course:', data); 
      set(data); 
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  };

  return (
    <div>
      <h1>Search Course</h1>
      <CourseSearch course={course} onSearch={handleSearch} />
    </div>
  );
};

export default SearchCourse;

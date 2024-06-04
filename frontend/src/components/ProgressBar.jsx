import React , { useState, useEffect }from 'react'
import axios from 'axios';
import '../styles.css';
const ProgressBar = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/progress')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the course data!', error);
      });
  }, []);
  return (
    <div>
      <h1>Course Progress</h1>
      
        {courses.map((course, index) => {
          const progress = (course.completedunit / course.totalunit) * 100;
          return (
            <div key={index}>
              <h2>{course.pcname}</h2>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
              </div>
              <p>{course.completedunit} / {course.totalunit} units completed</p>
            </div>
          );
        })}
      
    </div>
  )
}

export default ProgressBar

import React ,{ useState }from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Progress = () => {
  const { cid } = useParams();
  const [formData, setFormData] = useState({
    completedunit: '',
    totalunit: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append('pcname', cid);
    data.append('completedunit', formData.completedunit);
    data.append('totalunit', formData.totalunit);
    

    try {
        await axios.post('http://localhost:8001/addprogress', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        alert('Progress submitted successfully!');
    } catch (error) {
        console.error('Error submitting progress:', error);
        alert('Failed to submit progress. Please try again.');
    }
  };

  return (
    <div className="application-form">
      <h2>Progress for Course Name: {cid}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>No of Completed units:</label>
          <input type="number" name="completedunit" value={formData.completedunit} onChange={handleChange} required />
        </div>
        <div>
          <label>No of Total units:</label>
          <input type="number" name="totalunit" value={formData.totalunit} onChange={handleChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Progress

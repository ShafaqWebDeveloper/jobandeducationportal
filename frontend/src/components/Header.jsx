
import React  from 'react';
import { Link } from 'react-router-dom';
import {FaBell} from 'react-icons/fa'

const Header = () => (

  <header>
    <nav>
      <ul className='nav'>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/post-job">Post Job</Link></li>
        <li>
            <Link to="/notify">
              <FaBell icon={FaBell} />
            </Link>
          </li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/search-jobs">Search Jobs</Link></li>
        <li><Link to="/search-course">Course List</Link></li>
        <li><Link to="/progress">Progress</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/logout">Logout</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;

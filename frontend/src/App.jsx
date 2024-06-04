// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Register from './pages/Register';
import PostJob from './pages/PostJob';
import SearchJobs from './pages/SearchJobs';
import SearchCourse from './pages/SearchCourse';
import ApplicationForm from './components/JobApplicationForm';
import CourseApplication from './components/CourseApplicationForm';
import Login from './components/Login';
import Logout from './components/Logout';
import Jobs from './components/Jobs';
import Profile from './components/Profile';
import Progress from './components/Progress';
import Progressbar from './components/ProgressBar';
import Notify from './components/Notify';
import './styles.css';

const App = () => (
  <Router>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/search-jobs" element={<SearchJobs />} />
        <Route path="/search-course" element={<SearchCourse />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/notify" element={<Notify />} />
        <Route path="/progress" element={<Progressbar />} />
        <Route path="/addprogress/:cid" element={<Progress />} />
        <Route path="/jobapply/:jobId" element={<ApplicationForm />} /> 
        <Route path="/courseapply/:cid" element={<CourseApplication />} />
        
      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;

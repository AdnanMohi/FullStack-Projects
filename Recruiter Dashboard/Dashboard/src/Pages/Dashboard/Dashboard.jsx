import React, { useEffect, useState } from 'react';
import { useCandidate } from '../../hooks/query/candidate';
import './dash.css';
import { Button } from 'antd';
import { useAuth } from '../../Auth/AuthProvider';
import { useNavigate } from 'react-router-dom';



const Dashboard = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { data: candidates, error, isLoading } = useCandidate();
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [filters, setFilters] = useState({
    jobName: '',
    location: '',
    minSalary: '',
    maxSalary: '',
    minExperience: '',
    maxExperience: ''
  });

  useEffect(() => {
    // Add event listener for back button
    const handlePopState = (e) => {
        signOut();
        navigate('/signin');
      }
    window.addEventListener('popstate', handlePopState);
    
    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [signOut, navigate]); // Remove signOut from dependencies

  // Update filtered candidates when candidates change
  useEffect(() => {
    if (candidates) {
      setFilteredCandidates(candidates);
    }
  }, [candidates]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filterCandidates = () => {
    const filtered = candidates.filter(candidate => {
      // Apply filters
      const matchJobName = candidate.jobName.toLowerCase().includes(filters.jobName.toLowerCase());
      const matchLocation = candidate.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchSalary = (filters.minSalary === '' || candidate.minSalary >= parseInt(filters.minSalary, 10)) &&
                         (filters.maxSalary === '' || candidate.maxSalary <= parseInt(filters.maxSalary, 10));
      const matchExperience = (filters.minExperience === '' || candidate.minExperience >= parseInt(filters.minExperience, 10)) &&
                              (filters.maxExperience === '' || candidate.maxExperience <= parseInt(filters.maxExperience, 10));

      // Return true if all filters match
      return matchJobName && matchLocation && matchSalary && matchExperience;
    });

    setFilteredCandidates(filtered);
  };

  const handleSearchClick = () => {
    filterCandidates();
  };

  const handleSignOut = () => {
    signOut();
    navigate('/signin', { replace: true });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching candidate data: {error.message}</div>;

  return (
    <div className="main-container">
      <Button onClick={handleSignOut}>Sign Out</Button>
      <h1 className="heading">Candidate Data</h1>
      <div className="candidate-filter-container">
        {/* Input fields for filtering criteria */}
        <input className="filter-input" type="text" name="jobName" value={filters.jobName} onChange={handleInputChange} placeholder="Job Name" />
        <input className="filter-input" type="text" name="location" value={filters.location} onChange={handleInputChange} placeholder="Location" />
        <input className="filter-input" type="number" name="minSalary" value={filters.minSalary} onChange={handleInputChange} placeholder="Min Salary" />
        <input className="filter-input" type="number" name="maxSalary" value={filters.maxSalary} onChange={handleInputChange} placeholder="Max Salary" />
        <input className="filter-input" type="number" name="minExperience" value={filters.minExperience} onChange={handleInputChange} placeholder="Min Experience" />
        <input className="filter-input" type="number" name="maxExperience" value={filters.maxExperience} onChange={handleInputChange} placeholder="Max Experience" />

        {/* Search button */}
        <button className="search-button" onClick={handleSearchClick}>Search</button>
      </div>

      {/* Display filtered candidates in a table */}
      <table className="candidate-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Job Name</th>
            <th>Location</th>
            <th>Min Salary</th>
            <th>Max Salary</th>
            <th>Min Experience</th>
            <th>Max Experience</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidates.map((candidate, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{candidate.jobName}</td>
              <td>{candidate.location}</td>
              <td>{candidate.minSalary}</td>
              <td>{candidate.maxSalary}</td>
              <td>{candidate.minExperience}</td>
              <td>{candidate.maxExperience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

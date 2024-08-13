import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ onFilterChange }) => {
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');

  const handleJobTypeChange = (e) => {
    const selectedJobType = e.target.value;
    setJobType(selectedJobType);
    onFilterChange({ jobType: selectedJobType, location });
  };

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocation(selectedLocation);
    onFilterChange({ jobType, location: selectedLocation });
  };

  return (
    <div className="filter-bar">
      <select  value={jobType} onChange={handleJobTypeChange}>
        <option value="">All Job Types</option>
        <option value="Full time">Full time</option>
        <option value="Part time">Part time</option>
        <option value="Contract">Contract</option>
      </select>
      <select value={location} onChange={handleLocationChange}>
        <option value="">All Locations</option>
        <option value="Remote">Remote</option>
        <option value="Office">Office</option>
      </select>
    </div>
  );
};

export default Filter;

import React, { useState } from 'react';
import './Filter.css';

const Filter= ({ onFilterChange }) => {
  const [jobType, setJobType] = useState('Full time');
  const [location, setLocation] = useState('Remote');

  const handleSearch = () => {
    onFilterChange({ jobType, location });
  };

  return (
    <div className="filter-bar">
      <select value={jobType} onChange={(e) => setJobType(e.target.value)}>
        <option value="Full time">Full time</option>
        <option value="Part time">Part time</option>
        <option value="Contract">Contract</option>
      </select>
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value="Remote">Remote</option>
        <option value="Office">Office</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Filter;

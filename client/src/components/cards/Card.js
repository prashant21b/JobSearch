import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import Filter from '../Filter';
import './Card.css';
import { GrNext,GrPrevious } from "react-icons/gr";
const Card = ({ data, filteredData, setFilteredData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when data changes
  }, [filteredData]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredData.slice(indexOfFirstCard, indexOfLastCard);

  const totalPages = Math.ceil(filteredData.length / cardsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFilterChange = (filters) => {
    const { jobType, location } = filters;
    const newFilteredData = data.filter(job => {
      const matchesJobType = jobType ? job.type === jobType : true;
      const matchesLocation = location ? job.location === location : true;
      return matchesJobType && matchesLocation;
    });
    setFilteredData(newFilteredData);
  };

  return (
    <div className='App container'>
      <Filter onFilterChange={handleFilterChange} />
      {currentCards.map((job) => (
        <JobCard
          key={job.id}
          companyName={job.companyName}
          companyUrl={job.companyUrl}
          location={job.location}
          postedOn={job.postedOn}
          title={job.title}
          type={job.type}
          skills={job.skills}
          link={job.link}
        />
      ))}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
        <GrPrevious />
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        <GrNext />
        </button>
      </div>
    </div>
  );
};

export default Card;

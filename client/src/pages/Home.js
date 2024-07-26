import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import Card from '../components/cards/Card';
import axios from 'axios';
import dummyData from '../dummyData';
export const Home = () => {
    const [filteredData, setFilteredData] = useState(dummyData);
    const [searchQuery, setSearchQuery] = useState('');
    const onSubmit = (searchQuery) => {
        console.log(searchQuery)
        const filtered =dummyData.filter(job => {
          const matchesTitle = job.title.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesType = job.type.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesLocation = job.location.toLowerCase().includes(searchQuery.toLowerCase());
    
          return matchesTitle || matchesType || matchesLocation;
        });
          console.log(filtered)
        setFilteredData(filtered);
      };
  console.log(dummyData)
    return (
        <>
            <SearchBar onSubmit={onSubmit}/>
            <div className='cnt' style={{ display: 'flex' }}>
                <div className='right' style={{ width: '70%' }}>
                    <Card data={filteredData} />
                </div>
            </div>
        </>
    );
};

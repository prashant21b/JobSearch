import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Card from '../components/cards/Card';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
//import dummyData from '../dummyData';
import { baseUrl } from '../url';


export const Home = () => {
  const [filteredData, setFilteredData] = useState([]);
  // const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false)
  const onSubmit = (searchQuery) => {
    console.log(searchQuery)
    const filtered = filteredData.filter(job => {
      const matchesTitle = job.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = job.type.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = job.location.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTitle || matchesType || matchesLocation;
    });
    console.log(filtered)
    setFilteredData(filtered);
  };
  console.log(baseUrl, "baseurl")
  const getData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseUrl}/jobs/alljob`)
      console.log(response)
      setFilteredData(response.data.jobs)
      setLoading(false)
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getData()
  }, [])
  //console.log(dummyData)
  return (
    <>
      <SearchBar onSubmit={onSubmit} />
      <div className='cnt' style={{ display: 'flex' }}>
        <div className='right' style={{ width: '100%' }}>
          {
            loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )
              : <Card data={filteredData} />
          }

        </div>
      </div>
    </>
  );
};

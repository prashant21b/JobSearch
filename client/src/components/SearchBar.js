import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({onSubmit }) => {
    const [searchQuery,setSearchQuery]=useState('')
    const submitHandler=()=>{
        onSubmit(searchQuery)
    }
    return (
        <div className="search-container">
            {/* <div className="search-bar">
                <input
                    type="text"
                    value={searchQuery}
                    placeholder="Enter search query"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <button onClick={submitHandler} className="search-button">Submit</button>
            </div> */}
        </div>
    );
};

export default SearchBar;

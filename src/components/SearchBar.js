import React from 'react';
import './SearchBar.css';

const SearchBar = ({ searchQuery, handleSearchChange }) => {

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Rechercher un profil Twitter..."
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;

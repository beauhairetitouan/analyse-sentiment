import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
    );
};

export default SearchBar;
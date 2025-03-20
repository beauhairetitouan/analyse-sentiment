import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const onSearchClick = async () => {
        if (!searchQuery.trim()) return;

        try {
            const response = await fetch(`/api/twitter/user/${searchQuery}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            setUserData(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching user:', error);
            setError('Failed to fetch user data');
            setUserData(null);
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Rechercher un profil Twitter..."
                className="search-input"
            />
            <FontAwesomeIcon
                icon={faSearch}
                className="search-icon"
                onClick={onSearchClick}
            />
            {error && <p className="error-message">{error}</p>}
            {userData && (
                <div className="user-info">
                    <h3>{userData.data.name}</h3>
                    <p>@{userData.data.username}</p>
                </div>
            )}
        </div>
    );
};

export default SearchBar;

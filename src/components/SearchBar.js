import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const SearchBar = ({ searchQuery, handleSearchChange }) => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [tweets, setTweets] = useState([]);

    const onSearchClick = async () => {
        if (!searchQuery.trim()) return;

        try {
            const response = await fetch(`http://localhost:5001/api/twitter/user/${searchQuery}`);
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

    useEffect(() => {
        const fetchTweets = async () => {
            if (userData && userData.data && userData.data.id) {
                try {
                    const userId = userData.data.id;
                    const tweetsResponse = await fetch(`http://localhost:5001/api/twitter/users/${userId}/tweets`);
                    if (!tweetsResponse.ok) {
                        throw new Error('Failed to fetch user tweets');
                    }
                    const tweetsData = await tweetsResponse.json();
                    setTweets(tweetsData.data || []);
                    setError(null);
                } catch (error) {
                    console.error('Error fetching user tweets:', error);
                    setError('Failed to fetch user tweets');
                    setTweets([]);
                }
            }
        };

        if (userData) {
            fetchTweets();
        }
    }, [userData]);

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
            {tweets.length > 0 && (
                <div className="tweets-section">
                    <h3>Latest Tweets:</h3>
                    <ul>
                        {tweets.map((tweet) => (
                            <li key={tweet.id}>{tweet.text}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchBar;

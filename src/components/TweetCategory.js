import React from 'react';
import './TweetCategory.css';
import TweetCard from './TweetCard';

const TweetCategory = ({ title }) => {
    return (
        <div className="tweets-category">
            <h2>{title}</h2>
            <div className="tweet-list">
                <TweetCard text="test" />
            </div>
        </div>
    );
};

export default TweetCategory;
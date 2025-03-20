import React from 'react';
import './TweetCard.css';

const TweetCard = ({ text }) => {
    return (
        <div className="tweet-card">
            <p>{text}</p>
        </div>
    );
};

export default TweetCard;
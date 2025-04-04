import React from 'react';
import './TweetCard.css';

const TweetCard = ({ title, text }) => {
    if (title === 'Positifs') {
        return (
            <div className="tweet-card positive">
                <p>{text}</p>
            </div>
        );
    }
    else if (title === 'Neutres') {
        return (
            <div className="tweet-card neutral">
                <p>{text}</p>
            </div>
        );
    }
    else if (title === 'Négatifs') {
        return (
            <div className="tweet-card negative">
                <p>{text}</p>
            </div>
        );
    }
};

export default TweetCard;

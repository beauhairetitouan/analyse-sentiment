import React from 'react';
import './TweetCategory.css';
import TweetCard from './TweetCard';

const TweetCategory = ({ title, tweets }) => {
    return (
        <div className="tweets-category">
            <h2>{title}</h2>
            <div className="tweet-list">
                {tweets.length > 0 ? (
                    tweets.map((tweet) => (
                        <TweetCard key={tweet.id} text={tweet.text} />
                    ))
                ) : (
                    <p>Aucun tweet trouvé dans cette catégorie.</p>
                )}
            </div>
        </div>
    );
};

export default TweetCategory;

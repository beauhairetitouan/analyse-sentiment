import React from 'react';
import TweetCategory from './TweetCategory';
import './TweetsSection.css';

const TweetsSection = () => {
    return (
        <div className="tweets-section">
            <TweetCategory title="Positifs" />
            <TweetCategory title="Neutres" />
            <TweetCategory title="Négatifs" />
        </div>
    );
};

export default TweetsSection;
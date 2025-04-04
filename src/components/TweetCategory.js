import React from 'react';
import './TweetCategory.css';
import TweetCard from './TweetCard';

const TweetCategory = ({ title, tweets, total }) => {
    const numberOfTweets = tweets.length;
    const percentOfTweets = ((numberOfTweets / total) * 100).toFixed(2);
    return (
        <div className='tweet-category-container'>
            <div className="tweets-category">
                <h2>{title}</h2>
                <div className="tweet-list">
                    {tweets.length > 0 ? (
                        tweets.map((tweet) => (
                            <TweetCard key={tweet.id} title={title} text={tweet.text} />
                        ))
                    ) : (
                        <p>Aucun tweet trouvé dans cette catégorie.</p>
                    )}
                </div>
            </div>
            {title === 'Positifs' ? (
                <div className="number-of-tweets positive-text">
                    {numberOfTweets === 0 ? (
                        <p></p>
                    ) : numberOfTweets === 1 ? (
                        <p>1 tweet - {percentOfTweets}%</p>
                    ) : (
                        <p>{numberOfTweets} tweets - {percentOfTweets}%</p>
                    )}
                </div>
            ) : title === 'Neutres' ? (
                <div className="number-of-tweets neutral-text">
                    {numberOfTweets === 0 ? (
                        <p></p>
                    ) : numberOfTweets === 1 ? (
                        <p>1 tweet - {percentOfTweets}%</p>
                    ) : (
                        <p>{numberOfTweets} tweets - {percentOfTweets}%</p>
                    )}
                </div>
            ) : (
                <div className="number-of-tweets negative-text">
                    {numberOfTweets === 0 ? (
                        <p></p>
                    ) : numberOfTweets === 1 ? (
                        <p>1 tweet - {percentOfTweets}%</p>
                    ) : (
                        <p>{numberOfTweets} tweets - {percentOfTweets}%</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TweetCategory;

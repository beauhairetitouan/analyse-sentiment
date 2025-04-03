import React, { useState, useEffect, useCallback } from 'react';
import TweetCategory from './TweetCategory';
import './TweetsSection.css';

const TweetsSection = ({ tweets }) => {
    const [positiveTweets, setPositiveTweets] = useState([]);
    const [neutralTweets, setNeutralTweets] = useState([]);
    const [negativeTweets, setNegativeTweets] = useState([]);

    const classifySentiment = (text) => {
        if (text.includes('love') || text.includes('great')) {
            return 'positive';
        } else if (text.includes('hate') || text.includes('bad')) {
            return 'negative';
        }
        return 'neutral';
    };

    const classifyTweets = useCallback((tweets) => {
        const posTweets = [];
        const neutTweets = [];
        const negTweets = [];

        tweets.forEach(tweet => {
            const sentiment = classifySentiment(tweet.text);
            if (sentiment === 'positive') {
                posTweets.push(tweet);
            } else if (sentiment === 'neutral') {
                neutTweets.push(tweet);
            } else {
                negTweets.push(tweet);
            }
        });

        setPositiveTweets(posTweets);
        setNeutralTweets(neutTweets);
        setNegativeTweets(negTweets);
    }, []);

    useEffect(() => {
        if (tweets.length > 0) {
            classifyTweets(tweets);
        }
    }, [tweets, classifyTweets]);

    return (
        <div className="tweets-section">
            <TweetCategory title="Positifs" tweets={positiveTweets} />
            <TweetCategory title="Neutres" tweets={neutralTweets} />
            <TweetCategory title="Négatifs" tweets={negativeTweets} />
        </div>
    );
};

export default TweetsSection;

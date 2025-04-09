
import React, { useState, useEffect, useCallback } from 'react';
import TweetCategory from './TweetCategory';
import './TweetsSection.css';

const TweetsSection = ({ tweets, onClassified }) => {
    const [positiveTweets, setPositiveTweets] = useState([]);
    const [neutralTweets, setNeutralTweets] = useState([]);
    const [negativeTweets, setNegativeTweets] = useState([]);

    const classifySentiment = async (text) => {
        try {
            const response = await fetch('http://localhost:5001/api/sentiment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();
            return data.sentiment || 'neutral';
        } catch (error) {
            console.error('Erreur classification sentiment :', error);
            return 'neutral';
        }
    };

    const classifyTweets = useCallback(async (tweets) => {
        const posTweets = [];
        const neutTweets = [];
        const negTweets = [];

        const promises = tweets.map(async (tweet) => {
            const sentiment = await classifySentiment(tweet.text);

            if (sentiment === 'positive') {
                posTweets.push(tweet);
            } else if (sentiment === 'neutral') {
                neutTweets.push(tweet);
            } else {
                negTweets.push(tweet);
            }
        });

        await Promise.all(promises);
        setPositiveTweets(posTweets);
        setNeutralTweets(neutTweets);
        setNegativeTweets(negTweets);
    }, []);

    useEffect(() => {
        if (tweets.length > 0) {
            classifyTweets(tweets);
        }
    }, [tweets, classifyTweets]);

    useEffect(() => {
        onClassified({
            positive: positiveTweets.length,
            neutral: neutralTweets.length,
            negative: negativeTweets.length,
        });
    }, [positiveTweets, neutralTweets, negativeTweets, onClassified]);

    return (
        <div className="tweets-section">
            <TweetCategory title="Positifs" tweets={positiveTweets} total={tweets.length} />
            <TweetCategory title="Neutres" tweets={neutralTweets} total={tweets.length} />
            <TweetCategory title="Négatifs" tweets={negativeTweets} total={tweets.length} />
        </div>
    );
};

export default TweetsSection;

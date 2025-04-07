import React, { useState, useEffect, useCallback } from 'react';
import TweetCategory from './TweetCategory';
import './TweetsSection.css';

const TweetsSection = ({ tweets }) => {
    const [positiveTweets, setPositiveTweets] = useState([]);
    const [neutralTweets, setNeutralTweets] = useState([]);
    const [negativeTweets, setNegativeTweets] = useState([]);

    // 👇 Fonction asynchrone qui appelle ton backend pour analyser le sentiment
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
            return data.sentiment || 'neutral'; // fallback si pas de réponse claire
        } catch (error) {
            console.error('Erreur classification sentiment :', error);
            return 'neutral';
        }
    };

    // Fonction pour classifier les tweets en fonction de leur sentiment
    const classifyTweets = useCallback(async (tweets) => {
        const posTweets = [];
        const neutTweets = [];
        const negTweets = [];

        // Traitement de chaque tweet de manière asynchrone
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

        // Attendre que tous les tweets soient traités avant de les enregistrer dans le state
        await Promise.all(promises);

        // Mise à jour de l'état des tweets par catégorie de sentiment
        setPositiveTweets(posTweets);
        setNeutralTweets(neutTweets);
        setNegativeTweets(negTweets);
    }, []);

    useEffect(() => {
        // Classifier les tweets dès qu'ils sont disponibles
        if (tweets.length > 0) {
            classifyTweets(tweets);
        }
    }, [tweets, classifyTweets]);

    return (
        <div className="tweets-section">
            {/* Affichage des catégories de tweets : positifs, neutres et négatifs */}
            <TweetCategory title="Positifs" tweets={positiveTweets} total={tweets.length} />
            <TweetCategory title="Neutres" tweets={neutralTweets} total={tweets.length} />
            <TweetCategory title="Négatifs" tweets={negativeTweets} total={tweets.length} />
        </div>
    );
};

export default TweetsSection;

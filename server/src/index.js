const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { readOnlyClient } = require('./twitter');

// Configuration
dotenv.config({ path: './config/.env' });
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route de test
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// Route pour tester l'API Twitter
app.get('/api/tweets/:query', async (req, res) => {
    try {
        const query = req.params.query;
        const tweets = await readOnlyClient.v2.search({
            query: query,
            max_results: 5,
        });

        res.json(tweets);
    } catch (error) {
        console.error('Error fetching tweets:', error);
        res.status(500).json({ error: 'Failed to fetch tweets' });
    }
});

// Route pour obtenir les informations sur un utilisateur Twitter
app.get('/api/twitter/user/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const user = await readOnlyClient.v2.userByUsername(username);  // Rechercher un utilisateur par son handle
        res.json(user);  // Retourner les informations sur l'utilisateur
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user data' });
    }
});

// Route pour récupérer les tweets d'un utilisateur sur une période donnée
app.get('/api/twitter/users/:id/tweets', async (req, res) => {
    const userId = req.params.id;
    const { start_date, end_date } = req.query;

    try {
        // Vérification et formatage des dates en ISO 8601 (format requis par Twitter API)
        const startTime = start_date ? new Date(start_date).toISOString() : undefined;
        const endTime = end_date ? new Date(end_date).toISOString() : undefined;

        const response = await readOnlyClient.v2.userTimeline(userId, {
            max_results: 10,
            start_time: startTime,
            end_time: endTime
        });

        // Extraction des tweets utiles
        const tweets = response.data.data.map(tweet => ({
            id: tweet.id,
            text: tweet.text,
            created_at: tweet.created_at
        }));

        res.json(tweets);
    } catch (error) {
        console.error('Error fetching user tweets:', error);
        res.status(500).json({ error: 'Failed to fetch user tweets' });
    }
});

// Route pour l'analyse du sentiment d'un texte
app.post('/api/sentiment', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    try {
        const response = await fetch(
            'https://api-inference.huggingface.co/models/nlptown/bert-base-multilingual-uncased-sentiment',
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ inputs: text }),
            }
        );

        const result = await response.json();

        // Le modèle `nlptown/bert-base-multilingual-uncased-sentiment` renvoie des labels de 0 à 4
        const sentimentScore = result[0]?.[0]?.label;

        let sentiment;
        if (sentimentScore === '1 star') {
            sentiment = 'negative';
        } else if (sentimentScore === '2 stars') {
            sentiment = 'negative';
        } else if (sentimentScore === '3 stars') {
            sentiment = 'neutral';
        } else if (sentimentScore === '4 stars') {
            sentiment = 'positive';
        } else if (sentimentScore === '5 stars') {
            sentiment = 'positive';
        } else {
            sentiment = 'unknown';
        }

        res.json({ sentiment });
    } catch (error) {
        console.error('Error classifying sentiment:', error);
        res.status(500).json({ error: 'Failed to classify sentiment' });
    }
});

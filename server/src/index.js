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
            max_results: 10,
        });

        res.json(tweets);
    } catch (error) {
        console.error('Error fetching tweets:', error);
        res.status(500).json({ error: 'Failed to fetch tweets' });
    }
});
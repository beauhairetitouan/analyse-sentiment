const { TwitterApi } = require('twitter-api-v2');
const dotenv = require('dotenv');



dotenv.config({ path: './config/.env' });


// Créer un client Twitter avec les identifiants
const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_KEY_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Créer un client en lecture seule
const readOnlyClient = client.readOnly;

module.exports = { client, readOnlyClient };
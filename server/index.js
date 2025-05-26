// server/index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // allows requests from your frontend
app.use(express.json()); // lets your server read JSON bodies

// Basic route to test if server is working
app.get('/', (req, res) => {
  res.send('CookRight backend is live!');
});

// Placeholder for future endpoint
app.post('/generate-meal', (req, res) => {
  const { ingredients } = req.body;
  console.log('Ingredients received:', ingredients);
  res.json({ message: `You sent ${ingredients.length} ingredients.` });
});


// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ CookRight backend running on http://localhost:${PORT}`);
});

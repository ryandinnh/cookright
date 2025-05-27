require('dotenv').config();
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

const axios = require('axios');

app.post('/generate-meal', async (req, res) => {
  const { ingredients } = req.body;

  try {
    const ingredientQuery = ingredients.join(',+');

    // Step 1: Get top matching recipe ID
    const findResponse = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        ingredients: ingredientQuery,
        number: 1,
        apiKey: process.env.SPOONACULAR_API_KEY,
      },
    });

    if (findResponse.data.length === 0) {
      return res.json({ message: 'No recipes found for those ingredients.', recipe: null });
    }

    const recipeSummary = findResponse.data[0];
    const recipeId = recipeSummary.id;

    // Step 2: Get full recipe details
    const detailResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        includeNutrition: true,
      },
    });

    const data = detailResponse.data;

    const recipe = {
      name: data.title,
      instructions: data.instructions || 'No instructions available.',
      macros: {
        protein: data.nutrition.nutrients.find(n => n.name === 'Protein')?.amount || 0,
        carbs: data.nutrition.nutrients.find(n => n.name === 'Carbohydrates')?.amount || 0,
        fat: data.nutrition.nutrients.find(n => n.name === 'Fat')?.amount || 0,
      },
    };

    res.json({
      message: `How about: ${recipe.name}`,
      recipe,
    });
  } catch (err) {
    console.error('Spoonacular error:', err.message);
    res.status(500).json({ message: 'Failed to fetch recipe.', recipe: null });
  }
});




// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ CookRight backend running on http://localhost:${PORT}`);
});

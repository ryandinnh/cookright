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

app.post('/generate-meal', (req, res) => {
  const { ingredients } = req.body;
  console.log('Ingredients received:', ingredients);

  // Hardcoded recipe list
  const recipes = [
    {
      name: 'Garlic Chicken & Broccoli',
      ingredients: ['chicken', 'broccoli', 'garlic'],
      instructions: 'Stir fry chicken in olive oil, add minced garlic, then add steamed broccoli. Season with salt and pepper.',
      macros: {
        protein: 40,
        carbs: 10,
        fat: 12,
      },
    },
    {
      name: 'Beef Rice Bowl',
      ingredients: ['beef', 'rice', 'soy sauce'],
      instructions: 'Cook ground beef, add soy sauce and garlic, serve over steamed rice.',
      macros: {
        protein: 35,
        carbs: 45,
        fat: 15,
      },
    },
    {
      name: 'Egg Fried Rice',
      ingredients: ['rice', 'eggs', 'onion'],
      instructions: 'Scramble eggs, add rice and chopped onions, stir fry with soy sauce.',
      macros: {
        protein: 20,
        carbs: 50,
        fat: 10,
      },
    },
  ];

  // Match: recipe with at least 2 overlapping ingredients
  const matched = recipes.find(recipe => {
    const overlap = recipe.ingredients.filter(ing => ingredients.includes(ing));
    return overlap.length >= 2;
  });

  if (matched) {
    res.json({
      message: `How about: ${matched.name}`,
      recipe: matched,
    });
  } else {
    res.json({
      message: 'No good matches found. Try more basic ingredients!',
      recipe: null,
    });
  }
});



// Start the server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ CookRight backend running on http://localhost:${PORT}`);
});

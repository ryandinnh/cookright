import { useState } from 'react';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [response, setResponse] = useState('');
  const [recipe, setRecipe] = useState(null);

  const handleSubmit = async () => {
    const ingredientList = ingredients.split(',').map(item => item.trim().toLowerCase());

    const res = await fetch('http://localhost:3001/generate-meal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: ingredientList }),
    });

    const data = await res.json();
    setResponse(data.message);
    setRecipe(data.recipe);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>CookRight 🍽️</h1>
      <p>Enter ingredients separated by commas:</p>
      <input
        type="text"
        placeholder="e.g. chicken, broccoli, rice"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        style={{ width: '300px', marginRight: '10px' }}
      />
      <button onClick={handleSubmit}>Generate Meal</button>

      {response && (
        <div style={{ marginTop: '20px' }}>
          <h3>{response}</h3>
          {recipe && (
            <div>
              <p><strong>Instructions:</strong> {recipe.instructions}</p>
              <p><strong>Macros:</strong> {recipe.macros.protein}g protein, {recipe.macros.carbs}g carbs, {recipe.macros.fat}g fat</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

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
    console.log('Received from backend:', data); // 🔍 helpful debug line
    setResponse(data.message);
    setRecipe(data.recipe);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>CookRight 🍽️</h1>
      <p>Enter your ingredients (comma-separated):</p>
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
          <h3>Server Response:</h3>
          <p>{response}</p>
          <pre>{JSON.stringify(recipe, null, 2)}</pre>


          {recipe && recipe.name && (
            <div style={{ marginTop: '10px', padding: '15px', border: '1px solid #ccc', borderRadius: '10px' }}>
              <h4>{recipe.name}</h4>
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

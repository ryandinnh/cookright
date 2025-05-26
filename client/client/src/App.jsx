import { useState } from 'react';

function App() {
  const [ingredients, setIngredients] = useState('');
  const [response, setResponse] = useState('');


  const handleSubmit = async () => {
    const ingredientList = ingredients.split(',').map(item => item.trim());

    const res = await fetch('http://localhost:3001/generate-meal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: ingredientList }),
    });

    const data = await res.json();
    setResponse(data.message);
  };

  return (
    <div style={{ padding: '20px' }}>
    <h1>CookRight</h1>
    <p>Enter your ingredients (comma-separated):</p>
    <input
      type="text"
      placeholder="e.g. chicken, rice, broccoli"
      value={ingredients}
      onChange={(e) => setIngredients(e.target.value)}
      style={{ width: '300px', padding: '10px', marginBottom: '10px' }}
    />
    <button onClick={handleSubmit}>Generate Meal</button>

    {response && (
      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc' }}>
        <h3>Server Response:</h3>
        <p>{response}</p>
      </div>
    )}
    </div>
  );
}

export default App;
// This is a simple React component that allows users to input ingredients and get a response from the server.
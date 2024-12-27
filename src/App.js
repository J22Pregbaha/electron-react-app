import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App" style={{ padding: '20px' }}>
      <header className="App-header">
        <h1>Electron + React App</h1>
        <p>Count: {count}</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setCount(count + 1)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Increment
          </button>
          <button 
            onClick={() => setCount(count - 1)}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Decrement
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;


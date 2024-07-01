// src/App.js
import React, { useState } from 'react';
import ResultForm from './ResultForm';

function App() {
  const [result, setResult] = useState(null);

  const handleResultSubmit = (data) => {
    setResult(data);
  };

  return (
    <div>
      <h1>Student Result Management</h1>
      {result && (
        <div>
          <h2>Result</h2>
          <p>Percentage: {result.percentage}%</p>
          <p>Grade: {result.grade}</p>
          <p>Marks:</p>
          <ul>
            {Object.keys(result.marks).map((subject) => (
              <li key={subject}>
                {subject}: {result.marks[subject]}
              </li>
            ))}
          </ul>
        </div>
      )}
      <ResultForm onSubmit={handleResultSubmit} />
    </div>
  );
}

export default App;

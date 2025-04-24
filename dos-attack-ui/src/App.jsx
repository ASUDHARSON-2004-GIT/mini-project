import React, { useState } from 'react';
import Header from './components/Header';
import StartPage from './components/StartPage';
import Dashboard from './components/Dashboard';

function App() {
  const [started, setStarted] = useState(false);

  return (
    <div>
      <Header />
      {!started ? (
        <StartPage onStart={() => setStarted(true)} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;
import React from 'react';
import './App.css';
import ReleaseContainer from "./components/ReleaseContainer";
import ReleaseChangeContainer from "./components/ReleaseChangeContainer";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ReleaseContainer/>
        <ReleaseChangeContainer/>
      </header>
    </div>
  );
};

export default App;

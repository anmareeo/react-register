import React from 'react';
import './App.css';
import MainRouter from './components/MainRouter'

function App() {
  return (
    <div className="App">
      <MainRouter></MainRouter>
      {/* These are functions, so to give it properties they will have to be passed through the attributes of the tab*/}
    </div>
  );
}

export default App;


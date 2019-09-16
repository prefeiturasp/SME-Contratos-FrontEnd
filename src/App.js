import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import Routers from './routers';
function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
}

export default App;

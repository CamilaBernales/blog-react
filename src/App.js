import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header'
import Posts from './components/Posts'
function App() {
  return (
    <div className="App">
      <Header/>
      <Posts/>
    </div>
  );
}

export default App;
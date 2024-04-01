import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/layout/Header/Header';
import Main from './Components/layout/Main/Main';
import Footer from './Components/layout/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Main/>
      <Footer/>
    </div>
  );
}

export default App;

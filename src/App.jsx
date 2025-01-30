import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Todo from './components/Todo';
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Navbar />
      <div className='container'>
        <Todo />
      </div>
      <Footer />
    </>
  )
}

export default App

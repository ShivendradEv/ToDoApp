import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css';
import Navbar from './components/Navbar';
import Todo from './components/Todo';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import NotFound from './components/NotFound';

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Todo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App

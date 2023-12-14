// This is where our routes should go - I have deleted the boilerplate content
// import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import TestLogin from './pages/TestLoginPage';

function App() {

  return (
    <>
      <Router>
{/* Any component put here will appear globally, for example the Navbar may go here. */}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<TestLogin />} /> {/* I am a test Route for Harry to use to test the Login modal, I will be deleted */}
{/* All other Routes Go Here */}


          </Routes>
      </Router>
    </>
  );
}

export default App

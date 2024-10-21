import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './pages/SearchPage';
import OfferPage from './pages/OfferPage';
import Navbar from "./components/Navbar";
import ChatsPage from './pages/ChatsPage';

function App() {
  return (
    <Router>
        <Navbar/>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginRegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/offer" element={<OfferPage />} />
          <Route path="/chats" element={<ChatsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

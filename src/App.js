import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Convert from './Pages/Convert';
import LearnSign from './Pages/LearnSign';
import Videos from './Pages/Videos';
import Video from './Pages/Video';
import CreateVideo from './Pages/CreateVideo';
import Feedback from './Pages/Feedback';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/sign-kit/home' element={<Home />} />
        <Route path='/sign-kit/convert' element={<Convert />} />
        <Route path='/sign-kit/learn-sign' element={<LearnSign />} />
        <Route path='/sign-kit/all-videos' element={<Videos />} />
        <Route path='/sign-kit/video/:videoId' element={<Video />} />
        <Route path='/sign-kit/create-video' element={<CreateVideo />} />
        <Route path='/sign-kit/feedback' element={<Feedback />} />
        <Route path='*' element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

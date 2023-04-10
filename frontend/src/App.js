import React, { useEffect, useState } from "react";
import './App.css';
import TopBar from "./Components/TopBar"

import SettingsIcon from '@mui/icons-material/Settings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Admin from "./Pages/Admin";
import Home from "./Pages/Home";


const App= () => {

  return (
    <div className="App">
      <Router>
        <div>
          <TopBar />
        </div>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/Admin" element={<Admin />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;



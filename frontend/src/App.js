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


/*

const [charac, setCharac] = useState([]);

  const fetchData = () => {
    return fetch("https://www.breakingbadapi.com/api/characters?name=Walter+White")
          .then((response) => response.json())
          .then((data) => setCharac(data));
  }

  useEffect(() => {
    fetchData();
  },[])


  <Route exact path="/" element={<Home data={data}/>}/>
  <Route path="/Admin" element={<Admin getText={getText}/>}/>

*/
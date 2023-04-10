import React, { useState } from "react";
import { Link } from 'react-router-dom';
import elochess from '../images/Banner.png'
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import "./TopBar.css";



function TopBar() {
    const [password, setPassword] = useState("");
    
    const [showAdmin, setShowAdmin] = useState(false);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleAdminClick = () => {
        if (password === "admin1234") {
         setShowAdmin(true);
        } else {
        alert("Incorrect password!");
        }
    };

    const handleKeyDown = (event) => {
        if (event.keyCode === 13 ) {
            if (password === "admin1234") {
                setShowAdmin(true);
               } else {
               alert("Incorrect password!");
               }
        }
    };

    return (
        <div className='topBar'>

          <img className='Banner' src={elochess} alt="banner" />

          <div className='TopRight'>
            <div className='Links'>
              <div className='Home'>
                <Link to="/" className='link'>
                
                  Accueil
                </Link>
              </div>
              <div className='Settings'>
                {showAdmin ? (
                    //<HomeIcon className='icon'/>
                    //<SettingsIcon className='icon'/>
                  <Link to="/Admin" className='link'>

                    Admin Page
                  </Link>
                ) : (
                  <div>
                    <input
                      className="mdp-input"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      onKeyDown={handleKeyDown}
                      placeholder="Mot de passe admin"
                    />
                  </div>
                  //<button className="link" onClick={handleAdminClick}>Se connecter</button>
                )}
              </div>
            </div>
          </div>

        </div> 
    );
}



export default TopBar;

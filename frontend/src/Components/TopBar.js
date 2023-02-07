import React from 'react';
import Banner from '../images/Banner.jpg';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import "./TopBar.css";



function TopBar() 
{
  return (
     <div className='topBar'>
        <div className='TopRight'>
            <div className='Links'>
                <div className='Home'>
                    <Link to="/" className='link'>
                    <HomeIcon className='icon'/>
                        Home Page
                    </Link>
                </div>
                <div className='Settings'>
                    <Link to="/Admin" className='link'>
                        <SettingsIcon className='icon'/>
                        Admin Page
                    </Link>
                </div>
            </div>
        </div>
     </div> 
  );
}

export default TopBar;

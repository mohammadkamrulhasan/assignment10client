import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
       
        <div  className="header">
            <nav className="nav">
                <ul>
                    <li>
                    <h1>Hasan Super Shop</h1>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                         <Link to="/Order">Order</Link>
                   </li>
                    <li>
                         <Link to="/Admin">Admin</Link>
                   </li>
                   <li>
                       <Link to="/Deal">Deal</Link>
                   </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
            <div className="title-container">
                
            </div>
        </div>
    );
};

export default Header;
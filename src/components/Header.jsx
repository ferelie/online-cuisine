import React from "react";
import logoImg from "../assets/logo.jpg";
import '../index.css';
const Header = () => {
    return <header id="main-header">
        <div id="title">
            <img src="logo.jpg" alt="restaurant logo" />
            <h1>Online cuisine</h1>
        </div>
    </header>;
};

export default Header;

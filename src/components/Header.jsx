import React, { useContext } from "react";
import Button from "./UI/Button";
import logoImg from "../assets/logo.jpg";
import CartContext from "../context/CartContext";
import "../index.css";
const Header = () => {
    const cartCtx = useContext(CartContext);

    const totalCartItems = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + item.quantity;
    }, 0);
    return (
        <header id="main-header">
            <div id="title">
                <img src="logo.jpg" alt="restaurant logo" />
                <h1>Online cuisine</h1>
            </div>
            <nav>
                <Button textOnly>Cart({totalCartItems})</Button>
            </nav>
        </header>
    );
};

export default Header;

import React, { useContext } from "react";
import Button from "./UI/Button";
import logoImg from "../assets/logo.jpg";
import CartContext from "../context/CartContext";
import UserProgressContext from "../context/UserProgressContext";
import "../index.css";
const Header = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + item.quantity;
    }, 0);

const handleShowCart = () => {
    userProgressCtx.showCart();
}

    return (
        <header id="main-header">
            <div id="title">
                <img src="logo.jpg" alt="restaurant logo" />
                <h1>Online cuisine</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart({totalCartItems})</Button>
            </nav>
        </header>
    );
};

export default Header;

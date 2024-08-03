import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../context/CartContext";
import UserProgressContext from "../context/UserProgressContext";
import {currencyFormatter} from "../utils/currencyFormatter";
import Button from "./UI/Button";

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + item.price * 20 * item.quantity;
    },0);


    return (
        <Modal className="cart" isOpen={userProgressCtx.progress === "cart"}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.price*20}
                    </li>
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly>Close</Button>
                <Button>Go to Checkout</Button>
            </p>
        </Modal>
    );
};

export default Cart;

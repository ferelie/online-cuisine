import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../context/CartContext";
import UserProgressContext from "../context/UserProgressContext";
import { currencyFormatter } from "../utils/currencyFormatter";
import Button from "./UI/Button";

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + item.price * 20 * item.quantity;
    }, 0);

    return (
        <Modal className="cart" isOpen={userProgressCtx.progress === "cart"} onClose={() => userProgressCtx.progress === "cart" && userProgressCtx.hideCart()}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => (
                    <li key={item.id} className="cart-item">
                        <p>
                            {item.name} - {item.quantity} x{" "}
                            {currencyFormatter.format(item.price * 20)}
                        </p>
                        <p className="cart-item-actions">
                            <button onClick={() => cartCtx.removeItem(item.id)}>
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => cartCtx.addItem(item)}>
                                +
                            </button>
                        </p>
                    </li>
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={() => userProgressCtx.hideCart()}>
                    Close
                </Button>

                {cartCtx.items.length > 0 && (
                    <Button onClick={() => userProgressCtx.showCheckout()}>
                        Go to Checkout
                    </Button>
                )}
            </p>
        </Modal>
    );
};

export default Cart;

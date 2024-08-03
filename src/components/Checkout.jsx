import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../context/CartContext";
import UserProgressContext from "../context/UserProgressContext";
import { currencyFormatter } from "../utils/currencyFormatter";
import Input from "./UI/Input";
import Button from "./UI/Button";
const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + item.price * 20 * item.quantity;
    }, 0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const userData = Object.fromEntries(fd.entries());

        fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: userData,
                },
            }),
        });
    };

    return (
        <Modal
            className="checkout"
            isOpen={userProgressCtx.progress === "checkout"}
            onClose={() => userProgressCtx.hideCheckout()}
        >
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input label="Name" id="name" type="text" />
                <Input label="E-mail" id="email" type="email" />
                <Input label="Address" id="street" type="text" />
                <div className="control-row">
                    <Input label="Postal Code" id="postal-code" type="text" />
                    <Input label="City" id="city" type="text" />
                </div>
                <p className="modal-actions">
                    <Button
                        type="button"
                        textOnly
                        onClick={() => userProgressCtx.hideCheckout}
                    >
                        Close
                    </Button>
                    <Button>Checkout</Button>
                </p>
            </form>
        </Modal>
    );
};

export default Checkout;

import React, { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../context/CartContext";
import UserProgressContext from "../context/UserProgressContext";
import { currencyFormatter } from "../utils/currencyFormatter";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
};
const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData,
    } = useHttp("http://localhost:3000/orders", requestConfig, []);

    const cartTotal = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + item.price * 20 * item.quantity;
    }, 0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        const userData = Object.fromEntries(fd.entries());

        sendRequest(
            JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: userData,
                },
            })
        );
    };


    let actions = (
        <>
            <Button
                type="button"
                textOnly
                onClick={() => userProgressCtx.hideCheckout()}
            >
                Close
            </Button>
            <Button
                type="submit"
                onClick={() => userProgressCtx.hideCheckout()}
            >
                Checkout
            </Button>
        </>
    );

    if (isSending) {
        actions = <p>Sending order data...</p>;
    }

    // if (data && !error) {
    //     return (
    //         <Modal
    //             isOpen={userProgressCtx.progress === "checkout"}
    //             onClose={handleFinish}
    //         >
    //             <h2>Thank you for your order!</h2>
    //             <p className="modal-actions">
    //                 <Button onClick={() => userProgressCtx.hideCheckout()}>
    //                     Close
    //                 </Button>
    //             </p>
    //         </Modal>
    //     );
    // }

    return (
        <Modal
            className="checkout"
            isOpen={userProgressCtx.progress === "checkout"}
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

                {error && <Error title="Error!" message={error} />}

                <p className="modal-actions">{actions}</p>
            </form>
        </Modal>
    );
};

export default Checkout;

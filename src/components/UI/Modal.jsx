import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, isOpen, className = "", onClose }) => {

    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;
        if (isOpen) {
            modal.showModal();
        }
        return () => modal.close();
    }, [isOpen]);

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose} >
            {" "}
            {children}
        </dialog>,
        document.getElementById("modal")
    );
};

export default Modal;

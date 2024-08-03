import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, isOpen, className=""}) => {
    const dialog = useRef()
    useEffect(() => {
      if (isOpen) {
        dialog.current.showModal();
      }
    ;
    }, [isOpen])
    

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`}> {children}</dialog>,
        document.getElementById("modal")
    );
};

export default Modal;

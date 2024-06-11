import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, className = "", onClose }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const modal = dialogRef.current;
        if (open) {
            modal.showModal();
        }


        return () => {
            modal.close();
        }

    }, [open]);


    return createPortal(
        <dialog className={`modal ${className}`} ref={dialogRef} onClose={onClose}>
            {children}
        </dialog>,
        document.getElementById("modal")
    )
}

export default Modal;

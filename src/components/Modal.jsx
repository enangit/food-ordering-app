import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, className = "" }) {
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
        <dialog className={`modal ${className}`} ref={dialogRef}>
            {children}
        </dialog>,
        document.getElementById("modal")
    )
}

export default Modal;

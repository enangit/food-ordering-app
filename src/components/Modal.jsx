import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

function Modal({ children, open, className = "" }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        const modal = dialogRef.current;
        if (open) {
            modal.showModal();
        }

        const handleEsc = (event) => {
            if (event.key === 'Escape') {
                console.log('Close')
            }
        };

        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
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

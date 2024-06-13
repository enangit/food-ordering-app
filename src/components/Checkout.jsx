import { useContext  } from "react";

import Modal from "./Modal";
import UserProgressContext from "../context/UserProgressContext";
import CartContext from "../context/CartContext";
import currencyFormatter from "../utils/formatPrice";
import useHttp from "../hooks/useHttp";

const config = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
}

function Checkout() {
    const userProgressContext = useContext(UserProgressContext);

    const { items, clearItems } = useContext(CartContext);

    const { data, isLoading, error, sendRequest } = useHttp("http://localhost:3000/orders", config);

    const totalPriceAmount = items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity * currentItem.price
    }, 0)

    function handleClose() {
        userProgressContext.hideCheckout();
    }

    function handleFinished() {
        userProgressContext.hideCheckout();
        clearItems();

    }

    async function handleFormSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(
            JSON.stringify({
                order: {
                    items,
                    customer: customerData
                }
            })
        );
    }

    let actions = (
        <>
            <button onClick={handleClose}>Close</button>
            {
                items.length > 0 &&
                <button className="button" type="submit">Checkout</button>
            }
        </>
    );

    if (isLoading) {
        actions = <p>Sending order now...</p>
    }

    let errorDiv = (
        <>
            <p>There's an error. Please try again!</p>
        </>
    )

    if (data && !error) {

        return (
            <Modal open={userProgressContext.progress === "checkout"} className="checkout">
                <h2>Order Submitted</h2>
                <p>We will process your order now. An email will be sent to you. Thank you!</p>
                <span className="modal-actions">
                    <button onClick={handleFinished}>Okay</button>
                </span>
            </Modal>
        );
    }

    return (

        <Modal open={userProgressContext.progress === "checkout"} className="checkout">
            <h2>Checkout</h2>
            <span className="total">
                Your total: {currencyFormatter.format(totalPriceAmount)}
            </span>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="name"> Full Name</label>
                    <input type="text" id="name" className="name" name="name" />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="text" id="email" className="email" name="email" />
                </div>

                <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <input type="text" id="street" className="street" name="street" />
                </div>

                <div className="control-row">
                    <div className="form-group">
                        <label htmlFor="postal-code">Postal Code</label>
                        <input type="text" id="postal-code" className="postal-code" name="postal_code" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" className="city" name="city" />
                    </div>
                </div>
                {error && errorDiv}
                <span className="modal-actions">
                    {actions}
                </span>
            </form>
        </Modal>
    )
}

export default Checkout;

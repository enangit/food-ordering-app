import { useContext } from "react";
import Modal from "./Modal";
import UserProgressContext from "../context/UserProgressContext";
import CartContext from "../context/CartContext";
import currencyFormatter from "../utils/formatPrice";

function Checkout() {
    const userProgressContext = useContext(UserProgressContext);

    const { items } = useContext(CartContext);


    const totalPriceAmount = items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity * currentItem.price
    }, 0)

    function handleClose() {
        userProgressContext.hideCheckout();
    }

    return (
        <Modal open={userProgressContext.progress === "checkout"} className="checkout">
            <h2>Checkout</h2>
            <span className="total">
                Your total: {currencyFormatter.format(totalPriceAmount)}
            </span>
            <form action="#">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" className="name" />
                </div>

                <div className="form-group">
                    <label htmlFor="contact">Contact</label>
                    <input type="text" id="contact" className="contact" />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Addresss</label>
                    <input type="text" id="address" className="address" />
                </div>

                <span className="modal-actions">
                    <button onClick={handleClose}>Close</button>
                    {items.length > 0 &&
                        <button className="button" type="submit">Checkout</button>
                    }
                </span>
            </form>
        </Modal>
    )
}

export default Checkout;

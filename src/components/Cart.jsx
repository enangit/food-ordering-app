import { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../context/CartContext";
import currencyFormatter from "../utils/formatPrice";
import UserProgressContext from "../context/UserProgressContext";
import CartItem from "./CartItem";

function Cart() {
    const { items, addItem, removeItem } = useContext(CartContext);
    const totalPriceAmount = items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity * currentItem.price
    }, 0)

    const userProgressContext = useContext(UserProgressContext);

    function handleCloseCart() {
        userProgressContext.hideCart();
    }

    function handleShowCheckout() {
        userProgressContext.showCheckout();
    }

    return (
        <Modal className="cart" open={userProgressContext.progress === "cart"}>
            <h2>Your Cart</h2>
            <ul>
                {items.length === 0 && <p> You have no item yet!</p>}
                {
                    items &&
                    items.map(item => {
                        return (
                            <CartItem
                                key={item.id}
                                id={item.id}
                                itemName={item.name}
                                quantity={item.quantity}
                                price={item.price}
                                handleIncrease={() => { addItem(item) }}
                                handleDecrease={() => { removeItem(item.id) }}
                            />
                        )
                    })
                }
                <>
                    {items.length > 0 &&
                        <span className="cart-total">Your total: ${currencyFormatter.format(totalPriceAmount)}</span>
                    }
                    <span className="modal-actions">
                        <button onClick={handleCloseCart}>Close</button>
                        {items.length > 0 &&
                            <button className="button" onClick={handleShowCheckout}>Proceed To Checkout</button>
                        }
                    </span>
                </>
            </ul>
        </Modal>
    )
}

export default Cart;

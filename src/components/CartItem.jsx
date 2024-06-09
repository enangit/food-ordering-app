function CartItem({ id, itemName, quantity, price, handleIncrease, handleDecrease }) {
    return (
        <li className="cart-item">
            <p>{itemName} - {quantity} x {price}</p>
            <p className="cart-item-actions">
                <button onClick={handleDecrease}> - </button>
                <span>{quantity}</span>
                <button onClick={handleIncrease}> + </button>
            </p>
        </li>
    )
}

export default CartItem;

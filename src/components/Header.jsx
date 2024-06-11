import { useContext } from "react";
import logoUrl from "../assets/logo.jpg";
import CartContext from "../context/CartContext";
import UserProgressContext from "../context/UserProgressContext";

function Header() {

    const { items } = useContext(CartContext);

    const userProgressContext = useContext(UserProgressContext);

    const totalNumber = items.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity;
    }, 0);

    function handleShowCart() {
        userProgressContext.showCart();
    }


    return (
        <>
            <header
                className=""
                id="main-header"
            >
                <a
                    href="/"
                    id="title"
                >
                    <img
                        src={logoUrl}
                        alt="Logo photo."
                        style={{ maxWidth: "60px" }}
                    />

                    <h1>Foodie</h1>
                </a>

                <button
                    className="cart-button"
                    data-item-quantity={totalNumber}
                    onClick={handleShowCart}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        className="feather feather-shopping-cart">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                </button>
            </header>
        </>
    )
}

export default Header;

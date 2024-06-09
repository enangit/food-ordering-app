import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./context/CartContext";
import { UserProgressContextProvider } from "./context/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
    const [meals, setMeals] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {

        async function getMeals() {
            const response = await fetch("http://localhost:3000/meals");
            if (!response.ok) {
                setError("Error occured!");
            }

            const data = await response.json();
            setMeals(data);
        }

        getMeals();
    }, []);

    return (
        <UserProgressContextProvider>
            <CartContextProvider>
                <Header />
                <main>
                    <div className="heading">
                        <h1>Food Ordering App</h1>
                        <p>Order food that you like!</p>
                    </div>
                    {
                        error &&
                        <p>{error}</p>
                    }
                    {
                        meals &&
                        <Meals
                            meals={meals}
                        />}
                </main >
                <Cart />
                <Checkout />
            </CartContextProvider>
        </UserProgressContextProvider>
    );
}

export default App;

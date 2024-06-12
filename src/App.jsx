import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./context/CartContext";
import { UserProgressContextProvider } from "./context/UserProgressContext";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {


    // useEffect(() => {
    //     setIsLoading(true)
    //     async function getMeals() {
    //         const response = await fetch("http://localhost:3000/meals");
    //         if (!response.ok) {
    //             setError("Error occured!");
    //             setIsLoading(false)
    //         }
    //
    //         const data = await response.json();
    //         setMeals(data);
    //     }
    //
    //     getMeals();
    //     setIsLoading(false)
    // }, []);

    return (
        <UserProgressContextProvider>
            <CartContextProvider>
                <Header />
                <main>
                    <div className="heading">
                        <h1>Food Ordering App</h1>
                        <p>Order food that you like!</p>
                    </div>
                    <Meals />
                </main >
                <Cart />
                <Checkout />
            </CartContextProvider>
        </UserProgressContextProvider>
    );
}

export default App;

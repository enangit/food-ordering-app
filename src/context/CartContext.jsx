import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },

});

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM": {
            console.log("adding", action.payload)
            const updatedItems = [...state.items];
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex > -1) {
                const updatedItem = {
                    ...state.items[existingItemIndex],
                    quantity: state.items[existingItemIndex].quantity + 1
                }

                updatedItems[existingItemIndex] = updatedItem;
            } else {
                updatedItems.push({ ...action.payload, quantity: 1 });
            }

            return { ...state, items: updatedItems }
        }
        case "REMOVE_ITEM": {
            console.log("removing", action.payload);
            const updatedItems = [...state.items];
            console.log("state items: ", state.items)
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload);
            console.log(existingItemIndex);
            const existingItem = state.items[existingItemIndex];
            console.log("existingItem: ", existingItem);
            if (existingItem.quantity === 1) {
                updatedItems.splice(existingItemIndex, 1);
            } else {
                const updatedItem = { ...existingItem, quantity: existingItem.quantity - 1 }
                updatedItems[existingItemIndex] = updatedItem
            }

            return { ...state, items: updatedItems }
        }
        default:
            return state;
    }
}

export const CartContextProvider = ({ children }) => {
    const [cartState, cartDispatcherAction] = useReducer(cartReducer, { items: [] });


    function addItem(item) {
        cartDispatcherAction({
            type: "ADD_ITEM",
            payload: item
        });
    }

    function removeItem(id) {
        cartDispatcherAction({
            type: "REMOVE_ITEM",
            payload: id
        });
    }

    const cartContext = {
        items: cartState.items,
        addItem: addItem,
        removeItem: removeItem,
    }
    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
}

export default CartContext;

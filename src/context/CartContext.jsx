import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
});

const cartReducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const updatedItems = [...state.items];
        if (existingCartItemIndex > -1) {
            const existingItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        return {
            ...state,
            items: updatedItems,
        };
    }

    if (action.type === "REMOVE_ITEM") {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const existingItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
        if (existingItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity - 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            ...state,
            items: updatedItems,
        };
    }

    return state;
};
export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    const addItem = (item) => {
        dispatch({ type: "ADD_ITEM", item });
    };

    const removeItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", id });
    };

    const CartContextValue = {
        items: state.items,
        addItem,
        removeItem,
    };

    console.log(CartContext);
    return (
        <CartContext.Provider value={CartContextValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;

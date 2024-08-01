import React from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./context/CartContext";
import "./index.css";
function App() {
    return (
        <CartContextProvider>
            <Header />
            <Meals />
        </CartContextProvider>
    );
}

export default App;

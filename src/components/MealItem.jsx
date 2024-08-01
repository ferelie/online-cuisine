import { useContext } from "react";
import "../index.css";
import Button from "./UI/Button";
import { currencyFormatter } from "../utils/currencyFormatter";
import CartContext from "../context/CartContext";

const MealItem = ({ meal }) => {
    const cartCtx = useContext(CartContext);
    const handleAddItem = () => {
        cartCtx.addItem({ ...meal, quantity: 1 });
    };

    return (
        <li className="meal-item">
            <article>
                <img
                    src={`http://localhost:3000/${meal.image}`}
                    alt={meal.name}
                />
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">
                        {" "}
                        {currencyFormatter.format(meal.price * 20)}
                    </p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddItem}>Add to cart</Button>
                </p>
            </article>
        </li>
    );
};

export default MealItem;

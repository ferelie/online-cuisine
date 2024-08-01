import React from "react";
import { useState, useEffect } from "react";
import MealItem from "./MealItem";

import "../index.css";

const Meals = () => {
    const [loadedmeals, setLoadedmeals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/meals")
            .then((response) => response.json())
            .then((data) => {
                setLoadedmeals(data);
            });
    }, []);

    return (
        <ul id="meals">
            {loadedmeals.map((meal) => (
                <MealItem key={meal.id} meal={meal} />
            ))}
        </ul>
    );
};

export default Meals;

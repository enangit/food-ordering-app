import { useContext } from "react";
import currencyFormatter from "../utils/formatPrice";
import CartContext from "../context/CartContext";
import { BASE_URL } from "../utils/config";

function MealItem({ meal  }) {
    const {addItem} = useContext(CartContext);

    function addToCart() {
        addItem(meal);
    }

    return (
        <li key={meal.id} className="meal-item">
            <article>
                <img src={`${BASE_URL}/${meal.image}`} alt={`${meal.name} meal image`} />

                <h3>{meal.name}</h3>
                <div>

                    <span className="meal-item-price">
                        {currencyFormatter.format(meal.price)}
                    </span>

                    <p className="meal-item-description">
                        {meal.description}
                    </p>

                    <div className="meal-item-actions">
                        <button className="button" onClick={() => { addToCart(meal.name, meal.id) }}>
                            ADD TO CART
                        </button>
                    </div>
                </div>
            </article>
        </li>
    );
}

export default MealItem;

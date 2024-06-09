import MealItem from "./MealItem";

function Meals({ meals }) {
    return (
        <ul id="meals">
            {
                meals && meals.map((meal, idx) => {
                    return (
                        <MealItem
                            key={meal.id}
                            meal={meal}
                        />
                    )
                })
            }
        </ul >
    );
}
export default Meals;

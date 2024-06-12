import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";
import { BASE_URL } from "../utils/config";

const config = {};

function Meals() {

    const { data: meals, error, isLoading } = useHttp(`${BASE_URL}/meals`, config, []);
    console.log(error)
    return (
        <>
            <ul id="meals">
                {isLoading && <p> Loading available meals... </p>}
                {error && <p> Failed to fetch, error occured! </p>}
                {meals &&
                    meals.map((meal, idx) => {
                        return <MealItem key={meal.id} meal={meal} />;
                    })}
            </ul>
        </>
    );
}
export default Meals;

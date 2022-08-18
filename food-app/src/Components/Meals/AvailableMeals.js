import { useEffect, useState } from "react";
import { getDatabase, ref, child, onValue } from "firebase/database";

import Card from "../UI/Card";
import styles from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "meals");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(db.app);
      setMeals(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p>loading...</p>
      </section>
    );
  }
  const mealsList = meals?.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <ul>
        <Card>{mealsList}</Card>
      </ul>
    </section>
  );
};

export default AvailableMeals;

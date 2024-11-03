/*
 * Parent component of DailyMealsView and SingleMealCard.
 * MealsDayPopup component displays a popup with a list of meals for a specific day.
 * It fetches meal details based on the user ID and date, and provides actions for deleting meals.
 */

import { useState, useEffect } from "react";
import PlannerService from "@/services/PlannerService";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import DailyMealsView from "./DailyMealsView";
import SingleMealView from "./SingleMealCard";
import { Recipe } from "@/types/recipes";

type Props = {
  userId: number;
  date: Date;
  onClose: () => void;
};

const categoryOrder: string[] = [
  "breakfast",
  "lunch",
  "dinner",
  "snack",
  "other",
]; // temporary categories (the user will be able to make their own custom categories)

const DailyMealsPopup: React.FC<Props> = ({ userId, date, onClose }) => {
  const [meals, setMeals] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await PlannerService.fetchMealDetails(
          userId,
          date.toISOString().split("T")[0]
        );
        const meals = await response.json();
        setMeals(meals);
      } catch (error) {
        setError("Error fetching meals");
      }
    };

    fetchMeals();
  }, [userId, date]);

  const handleDelete = async (mealId: number) => {
    try {
      await PlannerService.deleteMeal(
        userId,
        mealId,
        date.toISOString().split("T")[0] // to check if this is the best way
      );
      setMeals(meals.filter((meal) => meal.id !== mealId));
    } catch (error) {
      setError("Error deleting meal");
    }
  };

  const handleToggleFavorite = async (mealId: number, isFavorite: boolean) => {
    try {
      await PlannerService.updateMeal(
        userId,
        mealId,
        date.toISOString().split("T")[0],
        { isFavorite: !isFavorite }
      );
      setMeals(
        meals.map((meal) =>
          meal.id === mealId ? { ...meal, isFavorite: !isFavorite } : meal
        )
      );
    } catch (error) {
      setError("Error updating meal");
    }
  };

  const formatDate = (date: Date) => {
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${weekday}, ${day}/${month}/${year}`;
  };

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  // create new array ordered by categories
  const allMeals = categoryOrder
    .flatMap((category) => meals.filter((meal) => meal.category === category))
    .filter(Boolean); // filters out falsy values (null, undefined, false, 0, "")

  return (
    <section className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <section className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <article className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-semibold">
            Meals for {formatDate(date)}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </article>

        <section className="p-6">
          {allMeals.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No meals planned for this day :(
            </p>
          ) : allMeals.length === 1 ? (
            <SingleMealView
              meal={allMeals[0]}
              onToggleFavorite={handleToggleFavorite}
              onDelete={handleDelete}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allMeals.map((meal) => (
                <div key={meal.id} className="space-y-2">
                  <h3 className="text-lg font-semibold capitalize">
                    {meal.category}
                  </h3>
                  <DailyMealsView
                    recipe={meal}
                    onToggleFavorite={handleToggleFavorite}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </section>
    </section>
  );
};

export default DailyMealsPopup;

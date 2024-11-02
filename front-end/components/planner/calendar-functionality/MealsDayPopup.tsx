import React, { useState, useEffect } from "react";
import PlannerService from "@/services/PlannerService";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import MealCard from "./MealCard";
import SingleMealView from "./SingleMealCard";
import { MealDay } from "@/types/meal-planner";

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
];

const MealDayPopup: React.FC<Props> = ({ userId, date, onClose }) => {
  const [meals, setMeals] = useState<MealDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        const response = await PlannerService.fetchMealDetails(
          userId,
          date.toISOString().split("T")[0]
        );
        const meals = await response.json();
        setMeals(meals);
      } catch (err) {
        setError("Error fetching meals");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [userId, date]);

  const handleDelete = async (mealId: number) => {
    try {
      await PlannerService.deleteMeal(
        userId,
        mealId,
        date.toISOString().split("T")[0]
      );
      setMeals(meals.filter((meal) => meal.id !== mealId.toString()));
    } catch (err) {
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
          meal.id === mealId.toString()
            ? { ...meal, isFavorite: !isFavorite }
            : meal
        )
      );
    } catch (err) {
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

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  const allMeals = categoryOrder
    .flatMap((category) => meals.filter((meal) => meal.category === category))
    .filter(Boolean);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-semibold">
            Meals for {formatDate(date)}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Button>
        </div>

        <div className="p-6">
          {allMeals.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No meals planned for this day
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
                  <MealCard
                    meal={meal}
                    onToggleFavorite={handleToggleFavorite}
                    onDelete={handleDelete}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealDayPopup;

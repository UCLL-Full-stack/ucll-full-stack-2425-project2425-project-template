import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import PlannerService from "@/services/PlannerService";
import { Recipe } from "@/types/recipes";
import { formatDateUTC, isPastDate, isToday } from "@/util/dateUtils";
import RightClickMenu from "../calendar-functionality/RightClickMenu";
import AddExistingMealPopup from "../calendar-functionality/AddExistingMealPopup";
import AddNewMealPopup from "../calendar-functionality/AddNewMealPopup";

type Props = {
  date: Date;
  currentMonth: number;
  isSelected: boolean;
  isHovered: boolean;
  selectionModeActive: boolean;
  recipes: Recipe[];
  onDateClick: (date: Date) => void;
  onCheckboxChange: (checked: boolean, date: Date) => void;
  onMouseEnter: (date: Date) => void;
  onMouseLeave: () => void;
  recipesByDate: Record<string, Recipe[]>;
  fetchMonthRecipes: () => Promise<void>;
};

const CalendarDay: React.FC<Props> = ({
  date,
  currentMonth,
  isSelected,
  isHovered,
  selectionModeActive,
  recipes,
  onDateClick,
  onCheckboxChange,
  onMouseEnter,
  onMouseLeave,
  recipesByDate,
  fetchMonthRecipes,
}) => {
  const [isAddMealOpen, setIsAddMealOpen] = useState(false);
  const [copiedMeals, setCopiedMeals] = useState<Recipe[] | null>(null);
  const [existingMeals, setExistingMeals] = useState<Recipe[]>([]);
  const [isAddNewMealOpen, setIsAddNewMealOpen] = useState(false);

  useEffect(() => {
    const fetchExistingMeals = async () => {
      const userToken = localStorage.getItem("token");
      if (userToken) {
        try {
          const meals = await PlannerService.getExistingMeals(userToken);
          setExistingMeals(meals);
        } catch (error) {
          console.error("Error fetching existing meals:", error);
        }
      } else {
        console.error("No token found in local storage");
      }
    };

    fetchExistingMeals();
  }, []);

  const isOtherMonth: boolean = date.getMonth() !== currentMonth;

  const handleAddExistingMeal = () => {
    setIsAddMealOpen(true);
  };

  const handleAddNewMeal = () => {
    setIsAddNewMealOpen(true);
  };

  const handleDeleteMeals = async () => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      try {
        const dateString = formatDateUTC(date);
        const recipes = recipesByDate[dateString] || [];
        for (const recipe of recipes) {
          if (recipe.id !== undefined) {
            await PlannerService.deleteMeal(recipe.id, dateString, userToken);
          } else {
            console.error("Recipe ID is undefined");
          }
        }
        await fetchMonthRecipes();
      } catch (error) {
        console.error("Error deleting meals:", error);
      }
    } else {
      console.error("No token found in local storage");
    }
  };

  const handleSelectMeal = async (recipe: Recipe) => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      try {
        const dateString = formatDateUTC(date);
        if (recipe.id !== undefined) {
          await PlannerService.scheduleExistingMeal(
            recipe.id,
            dateString,
            userToken
          );
        } else {
          console.error("Recipe ID is undefined");
        }
        fetchMonthRecipes();
        setIsAddMealOpen(false);
      } catch (error) {
        console.error("Error scheduling meal:", error);
      }
    } else {
      console.error("No token found in local storage");
    }
  };

  const handleSaveNewMeal = async (recipe: Omit<Recipe, "id">) => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      try {
        const dateString = formatDateUTC(date);
        await PlannerService.saveNewMeal(recipe, dateString, userToken);
        await fetchMonthRecipes();
        setIsAddNewMealOpen(false);
      } catch (error) {
        console.error("Error saving new meal:", error);
      }
    } else {
      console.error("No token found in local storage");
    }
  };

  return (
    <>
      <RightClickMenu
        onAddNewMeal={handleAddNewMeal}
        onAddExistingMeal={handleAddExistingMeal}
        onDeleteMeals={handleDeleteMeals}
        date={date}
      >
        <section
          className={`border rounded-lg p-2 min-h-[8rem] relative cursor-pointer transition-colors duration-200 flex flex-col ${
            isOtherMonth
              ? isPastDate(date)
                ? "bg-gray-100 text-gray-300"
                : "bg-gray-100 text-gray-500"
              : isPastDate(date)
              ? "bg-white text-gray-400"
              : "bg-white"
          } ${
            isSelected ? "bg-blue-200 ring-1 ring-blue-300" : ""
          } hover:bg-blue-50`}
          onClick={() => onDateClick(date)}
          onMouseEnter={() => onMouseEnter(date)}
          onMouseLeave={onMouseLeave}
        >
          <section className="flex justify-between items-start mb-2">
            <span
              className={`text-sm font-medium ${
                isToday(date)
                  ? "bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center"
                  : ""
              }`}
            >
              {date.getDate()}
            </span>
          </section>

          {(selectionModeActive || isHovered || isSelected) && (
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onCheckboxChange(!!checked, date)}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-1.5 right-2"
            />
          )}

          {recipes.length > 0 && (
            <section className="flex-1 overflow-y-auto">
              <article className="space-y-1">
                {recipes.slice(0, 2).map((recipe, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className={`block w-full justify-start truncate text-xs ${
                      isOtherMonth || isPastDate(date)
                        ? "bg-gray-50 border-gray-100 text-gray-400"
                        : "bg-blue-50 border-blue-100 text-blue-700"
                    }`}
                  >
                    {recipe.title}
                  </Badge>
                ))}
                {recipes.length > 2 && (
                  <Badge
                    variant="outline"
                    className={`block w-full justify-start text-xs ${
                      isOtherMonth || isPastDate(date)
                        ? "bg-gray-50 border-gray-100 text-gray-400"
                        : "bg-blue-50 border-blue-100 text-blue-700"
                    }`}
                  >
                    +{recipes.length - 2} more
                  </Badge>
                )}
              </article>
            </section>
          )}
        </section>
      </RightClickMenu>
      <AddExistingMealPopup
        isOpen={isAddMealOpen}
        onClose={() => setIsAddMealOpen(false)}
        onSelect={handleSelectMeal}
        date={date}
        existingMeals={existingMeals}
      />
      <AddNewMealPopup
        isOpen={isAddNewMealOpen}
        onClose={() => setIsAddNewMealOpen(false)}
        onSave={handleSaveNewMeal}
        date={date}
      />
    </>
  );
};

export default CalendarDay;

/*
 - CalendarDay component represents a single day in a calendar view.
 - It displays the date, handles selection and hover states, and shows a limited number of recipes (max 2 per day).
 - It also calls the right-click menu for additional actions.
 */

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import RightClickMenu from "../calendar-functionality/RightClickMenu";
import { Recipe } from "@/types/recipes";

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
}) => {
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString(); // to only compare year, month and day, and ignore the time parts (hours, minutes,...)
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date < today; // compares dates after setting both times to midnight
  };

  const isOtherMonth: Boolean = date.getMonth() !== currentMonth;

  return (
    // Right click menu --> Still to implement as a separate component
    <RightClickMenu
      onAddNewMeal={() => console.log("Add New Meal", date)}
      onAddExistingMeal={() => console.log("Add Existing Meal", date)}
      onAddFavoriteMeal={() => console.log("Add Favorite Meal", date)}
      onDeleteMeal={() => console.log("Delete Meal", date)}
      onCopyMeal={() => console.log("Copy Meal", date)}
      onPasteMeal={() => console.log("Paste Meal", date)}
    >
      <section
        className={`border rounded-lg p-2 h-24 relative cursor-pointer transition-colors duration-200 ${
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
        onMouseLeave={() => onMouseLeave()}
      >
        <section className="absolute top-1.5 left-2">
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
            onCheckedChange={(checked) => onCheckboxChange(!!checked, date)} // !! ensures "checked" is a boolean
            onClick={(e) => e.stopPropagation()}
            className="absolute top-1.5 right-2"
          />
        )}

        {recipes.length > 0 && (
          <section className="absolute top-8 left-0 right-0 px-2">
            <article className="space-y-1">
              {/* show a max of 2 recipe per day in calendar :) */}
              {recipes.slice(0, 2).map((recipe, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className={`w-full justify-start truncate text-xs ${
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
                  className={`w-full justify-start text-xs ${
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
  );
};

export default CalendarDay;

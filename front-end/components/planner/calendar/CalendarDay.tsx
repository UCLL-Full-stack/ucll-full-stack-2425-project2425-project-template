import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MealDay } from "@/types/meal-planner";
import RightClickMenu from "../calendar-functionality/RightClickMenu";

type Props = {
  date: Date;
  currentMonth: number;
  isSelected: boolean;
  isHovered: boolean;
  selectionModeActive: boolean;
  meals: MealDay[];
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
  meals,
  onDateClick,
  onCheckboxChange,
  onMouseEnter,
  onMouseLeave,
}) => {
  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isOtherMonth = date.getMonth() !== currentMonth;

  return (
    <RightClickMenu
      onAddNewMeal={() => console.log("Add New Meal", date)}
      onAddExistingMeal={() => console.log("Add Existing Meal", date)}
      onAddFavoriteMeal={() => console.log("Add Favorite Meal", date)}
      onDeleteMeal={() => console.log("Delete Meal", date)}
      onCopyMeal={() => console.log("Copy Meal", date)}
      onPasteMeal={() => console.log("Paste Meal", date)}
    >
      <div
        className={`border rounded-lg p-2 h-24 relative cursor-pointer transition-colors duration-200 ${
          isOtherMonth
            ? isPastDate(date)
              ? "bg-gray-100 text-gray-300"
              : "bg-gray-100 text-gray-500"
            : isPastDate(date)
            ? "bg-white text-gray-400"
            : "bg-white"
        } ${
          isSelected ? "bg-blue-50 ring-1 ring-blue-200" : ""
        } hover:bg-blue-50`}
        onClick={() => onDateClick(date)}
        onMouseEnter={() => onMouseEnter(date)}
        onMouseLeave={onMouseLeave}
      >
        <div className="absolute top-1.5 left-2">
          <span
            className={`text-sm font-medium ${
              isToday(date)
                ? "bg-gray-800 text-white w-6 h-6 rounded-full flex items-center justify-center"
                : ""
            }`}
          >
            {date.getDate()}
          </span>
        </div>

        {(selectionModeActive || isHovered || isSelected) && (
          <Checkbox
            checked={isSelected}
            onCheckedChange={(checked) => onCheckboxChange(!!checked, date)}
            onClick={(e) => e.stopPropagation()}
            className="absolute top-1.5 right-2"
          />
        )}

        {meals.length > 0 && (
          <div className="absolute top-8 left-0 right-0 px-2">
            <div className="space-y-1">
              {meals.slice(0, 2).map((meal, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className={`w-full justify-start truncate text-xs ${
                    isOtherMonth || isPastDate(date)
                      ? "bg-gray-50 border-gray-100 text-gray-400"
                      : "bg-blue-50 border-blue-100 text-blue-700"
                  }`}
                >
                  {meal.title}
                </Badge>
              ))}
              {meals.length > 2 && (
                <Badge
                  variant="outline"
                  className={`w-full justify-start text-xs ${
                    isOtherMonth || isPastDate(date)
                      ? "bg-gray-50 border-gray-100 text-gray-400"
                      : "bg-blue-50 border-blue-100 text-blue-700"
                  }`}
                >
                  +{meals.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>
    </RightClickMenu>
  );
};

export default CalendarDay;

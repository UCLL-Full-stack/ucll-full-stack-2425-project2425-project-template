/* CalendarHeader component with controls for navigating and interacting with the calendar.
It includes buttons for changing the month, toggling select, and adding items to the shopping list. */

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  currentDate: Date;
  viewMode: "Month" | "Week"; // not implemented yet
  selectionModeActive: boolean;
  selectedDatesCount: number;
  onChangeMonth: (value: number) => void;
  onToggleSelectionMode: () => void;
  onChangeViewMode: (mode: "Month" | "Week") => void; // not implemented yet
  onDeleteMeals: () => void;
  onAddToShoppingList: () => void;
};

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]; // make type?

const CalendarHeader: React.FC<Props> = ({
  currentDate,
  viewMode,
  selectionModeActive,
  selectedDatesCount,
  onChangeMonth,
  onToggleSelectionMode,
  onChangeViewMode,
  onDeleteMeals,
  onAddToShoppingList,
}) => {
  return (
    <section className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => onChangeMonth(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <p className="m-0 text-lg font-semibold">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </p>
        <Button variant="outline" size="icon" onClick={() => onChangeMonth(1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={selectionModeActive ? "default" : "outline"}
          onClick={onToggleSelectionMode}
        >
          {selectionModeActive ? "Cancel Selection" : "Select"}
        </Button>
        <Button
          variant="outline"
          disabled={selectedDatesCount === 0}
          onClick={onDeleteMeals}
        >
          Delete Meals
        </Button>
        <Button
          variant="outline"
          disabled={selectedDatesCount === 0}
          onClick={onAddToShoppingList}
        >
          <ShoppingCart className="h-4 w-4 mr-1" />
          Add to Shopping List
        </Button>
        <Select
          onValueChange={(value) => onChangeViewMode(value as "Month" | "Week")}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder={viewMode} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Month">Month</SelectItem>
            <SelectItem value="Week">Week</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default CalendarHeader;

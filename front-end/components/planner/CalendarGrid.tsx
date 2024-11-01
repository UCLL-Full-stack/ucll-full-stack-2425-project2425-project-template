import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import RightClickMenu from "./RightClickMenu";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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
];

const CalendarGrid = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"Month" | "Week">("Month");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]); // array to be able to select multiple days
  const [selectionModeActive, setSelectionModeActive] = useState(false); // to handle the Select btn
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null); // to track which day the user is hovering over

  // calculate days that should be displayed in the calendar for 1 full grid
  const getDaysInGrid = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInGrid = [];

    const daysToAddAtStart = (firstDay.getDay() + 6) % 7; // shifts Monday to 0 and Sunday to 6 first
    const daysToAddAtEnd = (7 - lastDay.getDay()) % 7; // days to complete the week

    // add days from previous month
    for (let i = daysToAddAtStart; i > 0; i--) {
      const day = new Date(year, month, 1 - i);
      daysInGrid.push(day);
    }

    // add days from current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const day = new Date(year, month, i);
      daysInGrid.push(day);
    }

    // add days from next month
    for (let i = 1; i <= daysToAddAtEnd; i++) {
      const day = new Date(year, month + 1, i);
      daysInGrid.push(day);
    }

    // console.log(daysInGrid.map((day) => day.getDate()));
    return daysInGrid;
  };

  const changeMonth = (value: number) => {
    const newDate = new Date(currentDate); // cloned to avoid modifying the state directly
    newDate.setMonth(newDate.getMonth() + value);
    setCurrentDate(newDate);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isOtherMonth = (date: Date) => {
    return date.getMonth() !== currentDate.getMonth();
  };

  const handleDateClick = (newDate: Date) => {
    if (selectionModeActive) {
      setSelectedDates((prevDates) => {
        const isSelected: Boolean = prevDates.some(
          (d) => d.getTime() === newDate.getTime()
        ); // check if date already selected

        if (isSelected) {
          return prevDates.filter((d) => d.getTime() !== newDate.getTime()); // removes newDate from the selected dates
        } else {
          return [...prevDates, newDate]; // otherwise add newDate to the array of selected dates
        }
      });
    } else {
      // open day view - to implement
      console.log("Date clicked:", newDate);
    }
  };

  const toggleSelectionMode = () => {
    setSelectionModeActive((prevMode) => !prevMode);
    if (selectionModeActive) {
      setSelectedDates([]); // clear selections when exiting selection mode
    }
  };

  // to implement shopping list logic
  const handleAddToShoppingList = () => {
    if (selectedDates.length === 0) {
      return;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <section className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => changeMonth(-1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <p className="m-0 text-lg font-semibold">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </p>
            <Button
              variant="outline"
              size="icon"
              onClick={() => changeMonth(1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={selectionModeActive ? "default" : "outline"}
              onClick={toggleSelectionMode}
            >
              {selectionModeActive ? "Cancel Selection" : "Select"}
            </Button>
            <Button variant="outline" disabled={selectedDates.length === 0}>
              Delete Meals
            </Button>
            <Button variant="outline" disabled={selectedDates.length === 0}>
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Shopping List
            </Button>
            <Select
              onValueChange={(value) => setViewMode(value as "Month" | "Week")}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder={viewMode} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        <section className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center font-semibold p-2">
              {day}
            </div>
          ))}

          {getDaysInGrid(currentDate).map((date, index) => (
            <RightClickMenu
              key={index}
              onAddNewMeal={() => console.log("Add New Meal", date)}
              onAddExistingMeal={() => console.log("Add Existing Meal", date)}
              onAddFavoriteMeal={() => console.log("Add Favorite Meal", date)}
              onDeleteMeal={() => console.log("Delete Meal", date)}
              onCopyMeal={() => console.log("Copy Meal", date)}
              onPasteMeal={() => console.log("Paste Meal", date)}
            >
              <div
                key={index}
                className={`border p-2 h-24 relative cursor-pointer transition-colors duration-200 ${
                  isOtherMonth(date)
                    ? isPastDate(date)
                      ? "bg-gray-100 text-gray-300"
                      : "bg-gray-100 text-gray-500"
                    : isPastDate(date)
                    ? "bg-white text-gray-400"
                    : "bg-white"
                } ${
                  selectedDates.some((d) => d.getTime() === date.getTime())
                    ? "bg-blue-200 ring-1 ring-blue-400"
                    : ""
                } hover:bg-blue-100`}
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => setHoveredDate(date)}
                onMouseLeave={() => setHoveredDate(null)}
              >
                <span
                  className={`text-sm ${
                    isToday(date)
                      ? "rounded-full bg-gray-800 text-white w-6 h-6 absolute flex items-center justify-center"
                      : ""
                  }`}
                >
                  {date.getDate()}
                </span>
                {(selectionModeActive ||
                  hoveredDate?.getTime() === date.getTime() ||
                  selectedDates.some(
                    (d) => d.getTime() === date.getTime()
                  )) && (
                  <Checkbox
                    checked={selectedDates.some(
                      (d) => d.getTime() === date.getTime()
                    )}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedDates((prev) => [...prev, date]);
                      } else {
                        setSelectedDates((prev) =>
                          prev.filter((d) => d.getTime() !== date.getTime())
                        );
                      }
                    }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2"
                  />
                )}
              </div>
            </RightClickMenu>
          ))}
        </section>
      </CardContent>
    </Card>
  );
};

export default CalendarGrid;

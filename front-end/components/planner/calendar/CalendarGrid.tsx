import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import PlannerService from "@/services/PlannerService";
import { MealDay } from "@/types/meal-planner";
import CalendarHeader from "./CalendarHeader";
import CalendarDay from "./CalendarDay";
import MealDayPopup from "../calendar-functionality/MealsDayPopup";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CalendarGrid: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"Month" | "Week">("Month");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectionModeActive, setSelectionModeActive] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [showMealPopup, setShowMealPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [mealsByDate, setMealsByDate] = useState<Record<string, MealDay[]>>({});

  useEffect(() => {
    const fetchMealsForMonth = async () => {
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateString = d.toISOString().split("T")[0];
        try {
          const response = await PlannerService.fetchMealDetails(1, dateString); // Assuming userId is 1
          if (response.ok) {
            const meals = await response.json();
            if (meals.length > 0) {
              setMealsByDate((prev) => ({ ...prev, [dateString]: meals }));
            }
          }
        } catch (error) {
          console.error("Error fetching meals for", dateString, error);
        }
      }
    };

    fetchMealsForMonth();
  }, [currentDate]);

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
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + value);
    setCurrentDate(newDate);
  };

  const handleDateClick = (newDate: Date) => {
    if (selectionModeActive) {
      setSelectedDates((prevDates) => {
        const isSelected = prevDates.some(
          (d) => d.getTime() === newDate.getTime()
        );
        if (isSelected) {
          return prevDates.filter((d) => d.getTime() !== newDate.getTime());
        } else {
          return [...prevDates, newDate];
        }
      });
    } else {
      setSelectedDate(newDate);
      setShowMealPopup(true);
    }
  };

  const toggleSelectionMode = () => {
    setSelectionModeActive((prevMode) => !prevMode);
    if (selectionModeActive) {
      setSelectedDates([]);
    }
  };

  const handleAddToShoppingList = () => {
    if (selectedDates.length === 0) {
      return;
    }
    // Implement shopping list logic here
  };

  const handleDeleteMeals = () => {
    // Implement delete meals logic here
  };

  return (
    <Card>
      <CardContent className="p-6">
        <CalendarHeader
          currentDate={currentDate}
          viewMode={viewMode}
          selectionModeActive={selectionModeActive}
          selectedDatesCount={selectedDates.length}
          onChangeMonth={changeMonth}
          onToggleSelectionMode={toggleSelectionMode}
          onChangeViewMode={setViewMode}
          onDeleteMeals={handleDeleteMeals}
          onAddToShoppingList={handleAddToShoppingList}
        />

        <section className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center font-semibold p-2">
              {day}
            </div>
          ))}

          {getDaysInGrid(currentDate).map((date, index) => (
            <CalendarDay
              key={index}
              date={date}
              currentMonth={currentDate.getMonth()}
              isSelected={selectedDates.some(
                (d) => d.getTime() === date.getTime()
              )}
              isHovered={hoveredDate?.getTime() === date.getTime()}
              selectionModeActive={selectionModeActive}
              meals={mealsByDate[date.toISOString().split("T")[0]] || []}
              onDateClick={handleDateClick}
              onCheckboxChange={(checked, date) => {
                if (checked) {
                  setSelectedDates((prev) => [...prev, date]);
                } else {
                  setSelectedDates((prev) =>
                    prev.filter((d) => d.getTime() !== date.getTime())
                  );
                }
              }}
              onMouseEnter={setHoveredDate}
              onMouseLeave={() => setHoveredDate(null)}
            />
          ))}
        </section>
      </CardContent>
      {showMealPopup && selectedDate && (
        <MealDayPopup
          userId={1}
          date={selectedDate}
          onClose={() => setShowMealPopup(false)}
        />
      )}
    </Card>
  );
};

export default CalendarGrid;

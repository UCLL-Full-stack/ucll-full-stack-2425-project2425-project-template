import CalendarGrid from "@/components/planner/CalendarGrid";
import Greeting from "@/components/planner/Greeting";
import ShoppingList from "@/components/planner/ShoppingListSidebar";

const MealPlanner: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <Greeting />
          <h1 className="text-2xl font-bold mb-3">Meal Planner</h1>
          <CalendarGrid />
        </main>
      </div>

      {/* Shopping List Sidebar */}
      <div className="w-80 flex-shrink-0">
        <ShoppingList />
      </div>
    </div>
  );
};

export default MealPlanner;

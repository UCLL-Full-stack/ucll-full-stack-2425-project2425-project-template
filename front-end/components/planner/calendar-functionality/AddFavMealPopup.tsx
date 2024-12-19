import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Recipe } from "@/types/recipes";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (recipe: Recipe) => void;
  favoriteMeals: Recipe[];
};

const AddFavoriteMealPopup: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelect,
  favoriteMeals,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Favorite Meal</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {favoriteMeals.map((meal) => (
            <div
              key={meal.id}
              className="p-4 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => onSelect(meal)}
            >
              <h3 className="font-bold">{meal.title}</h3>
              <p>{meal.category}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFavoriteMealPopup;

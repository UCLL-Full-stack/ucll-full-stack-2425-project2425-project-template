import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MealDay } from "@/types/meal-planner";

interface RecipeEditDialogProps {
  recipe: MealDay;
  onSave: (editedRecipe: MealDay) => void;
}

export function RecipeEditDialog({ recipe, onSave }: RecipeEditDialogProps) {
  const [editedRecipe, setEditedRecipe] = useState(recipe);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    onSave(editedRecipe);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Recipe</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={editedRecipe.title}
              onChange={(e) =>
                setEditedRecipe({ ...editedRecipe, title: e.target.value })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cookingTime" className="text-right">
              Cooking Time (min)
            </Label>
            <Input
              id="cookingTime"
              type="number"
              value={editedRecipe.cookingTime}
              onChange={(e) =>
                setEditedRecipe({
                  ...editedRecipe,
                  cookingTime: parseInt(e.target.value),
                })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="instructions" className="text-right">
              Instructions
            </Label>
            <Textarea
              id="instructions"
              value={editedRecipe.instructions}
              onChange={(e) =>
                setEditedRecipe({
                  ...editedRecipe,
                  instructions: e.target.value,
                })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <Button onClick={handleSave}>Save changes</Button>
      </DialogContent>
    </Dialog>
  );
}

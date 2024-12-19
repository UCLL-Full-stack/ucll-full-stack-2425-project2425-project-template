/*
 * STILL TO IMPLEMENT FUNCTIONALITIES, but the right clicks work.
 * RightClickMenu component is a context menu
 */

import { Plus, Trash2, Copy, ClipboardPaste, Heart } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

type Props = {
  children: React.ReactNode;
  onAddNewMeal: () => void;
  onAddExistingMeal: () => void;
  onAddFavoriteMeal: () => void;
  onDeleteMeals: () => void;
  onCopyMeals: () => void;
  onPasteMeals: () => void;
  date: Date;
};

const RightClickMenu: React.FC<Props> = ({
  children,
  onAddNewMeal,
  onAddExistingMeal,
  onAddFavoriteMeal,
  onDeleteMeals,
  onCopyMeals,
  onPasteMeals,
  date,
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={onAddNewMeal}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Meal
        </ContextMenuItem>
        <ContextMenuItem onClick={onAddExistingMeal}>
          <Plus className="mr-2 h-4 w-4" />
          Add Existing Meal
        </ContextMenuItem>
        <ContextMenuItem onClick={onAddFavoriteMeal}>
          <Heart className="mr-2 h-4 w-4" />
          Add Favorite Meal
        </ContextMenuItem>
        <ContextMenuItem onClick={onDeleteMeals}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Meals
        </ContextMenuItem>
        <ContextMenuItem onClick={onCopyMeals}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Meals
        </ContextMenuItem>
        <ContextMenuItem onClick={onPasteMeals}>
          <ClipboardPaste className="mr-2 h-4 w-4" />
          Paste Meals
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default RightClickMenu;

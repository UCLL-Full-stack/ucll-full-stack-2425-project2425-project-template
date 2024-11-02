import { Plus, Trash, Copy, ClipboardPaste, Heart } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface RightClickMenuProps {
  children: React.ReactNode;
  onAddNewMeal?: () => void;
  onAddExistingMeal?: () => void;
  onAddFavoriteMeal?: () => void;
  onDeleteMeal?: () => void;
  onCopyMeal?: () => void;
  onPasteMeal?: () => void;
}

export default function RightClickMenu({
  children,
  onAddNewMeal,
  onAddExistingMeal,
  onAddFavoriteMeal,
  onDeleteMeal,
  onCopyMeal,
  onPasteMeal,
}: RightClickMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={onAddNewMeal}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Meal
        </ContextMenuItem>
        <ContextMenuItem onClick={onAddExistingMeal}>
          Add Existing Meal
        </ContextMenuItem>
        <ContextMenuItem onClick={onAddFavoriteMeal}>
          <Heart className="mr-2 h-4 w-4" />
          Add Favorite Meal
        </ContextMenuItem>
        <ContextMenuItem onClick={onDeleteMeal}>
          <Trash className="mr-2 h-4 w-4" />
          Delete Meal
        </ContextMenuItem>
        <ContextMenuItem onClick={onCopyMeal}>
          <Copy className="mr-2 h-4 w-4" />
          Copy Meal
        </ContextMenuItem>
        <ContextMenuItem onClick={onPasteMeal}>
          <ClipboardPaste className="mr-2 h-4 w-4" />
          Paste Meal
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

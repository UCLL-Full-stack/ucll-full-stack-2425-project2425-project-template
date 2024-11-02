import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Edit2, Trash2 } from "lucide-react";

interface RecipeHeaderProps {
  isFavorite: boolean;
  onBack: () => void;
  onToggleFavorite: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function RecipeHeader({
  isFavorite,
  onBack,
  onToggleFavorite,
  onEdit,
  onDelete,
}: RecipeHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFavorite}
              className={isFavorite ? "text-red-500" : "text-gray-500"}
            >
              <Heart
                className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
              />
              <span className="sr-only">
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
              </span>
            </Button>
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit2 className="h-5 w-5" />
              <span className="sr-only">Edit recipe</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="text-red-500"
            >
              <Trash2 className="h-5 w-5" />
              <span className="sr-only">Delete recipe</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

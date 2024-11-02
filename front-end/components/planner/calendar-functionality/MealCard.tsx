import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Heart, Trash2 } from "lucide-react";
import { MealDay } from "@/types/meal-planner";

interface MealCardProps {
  meal: MealDay;
  onToggleFavorite: (mealId: number, isFavorite: boolean) => void;
  onDelete: (mealId: number) => void;
}

const MealCard: React.FC<MealCardProps> = ({
  meal,
  onToggleFavorite,
  onDelete,
}) => {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-6 space-y-4">
        <Link href={`/recipes/${meal.id}`} className="block">
          <h4 className="text-xl font-medium hover:underline">{meal.title}</h4>

          {meal.imageUrl ? (
            <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100 mt-2">
              <Image
                src={meal.imageUrl}
                alt={meal.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-48 rounded-lg bg-gray-100 flex items-center justify-center mt-2">
              <div className="text-gray-400">No image available</div>
            </div>
          )}
        </Link>

        {meal.description && (
          <p className="text-gray-600 text-sm leading-relaxed">
            {meal.description}
          </p>
        )}

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{meal.cookingTime} minutes</span>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => onToggleFavorite(Number(meal.id), meal.isFavorite)}
            className="flex-1 hover:bg-gray-100"
          >
            <span className="flex items-center justify-center gap-2">
              <Heart
                className={`h-5 w-5 ${
                  meal.isFavorite
                    ? "text-red-500 fill-red-500"
                    : "text-gray-500"
                }`}
              />
              <span className="text-gray-700">
                {meal.isFavorite ? "Favorited" : "Favorite"}
              </span>
            </span>
          </Button>

          <Button
            variant="destructive"
            onClick={() => onDelete(Number(meal.id))}
            className="flex-1"
          >
            <span className="flex items-center justify-center gap-2">
              <Trash2 className="h-5 w-5" />
              Delete
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;

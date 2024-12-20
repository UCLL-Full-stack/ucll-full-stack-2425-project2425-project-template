/*
 * We decided to have 2 separate components for when there are more than one meal per day vs when there's only one meal.
 * DailyMealsView component displays a list of meals for a single day.
 * It includes meal details such as title, image, and actions for toggling favorite status and deleting the meal.
 */

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Heart, Trash2 } from "lucide-react";
import { Recipe } from "@/types/recipes";

type Props = {
  recipe: Recipe;
  onToggleFavorite: (mealId: number, isFavorite: boolean) => void;
  onDelete: (mealId: number) => void;
};

const DailyMealsView: React.FC<Props> = ({
  recipe,
  onToggleFavorite,
  onDelete,
}) => {
  return (
    <section className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <article className="p-6 space-y-4">
        <Link href={`/recipes/${recipe.id}`} className="block">
          <h4 className="text-xl font-medium hover:underline">
            {recipe.title}
          </h4>

          {recipe.imageUrl && (
            <article className="relative h-48 rounded-lg overflow-hidden bg-gray-100 mt-2">
              <Image
                src={recipe.imageUrl}
                alt={recipe.title}
                fill
                className="object-cover"
              />
            </article>
          )}
        </Link>

        <article className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>{recipe.cookingTime} minutes</span>
        </article>

        <article className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() =>
              onToggleFavorite(Number(recipe.id), recipe.isFavorite ?? false)
            }
            className="flex-1 hover:bg-gray-100"
          >
            <span className="flex items-center justify-center gap-2">
              <Heart
                className={`h-5 w-5 ${
                  recipe.isFavorite
                    ? "text-red-500 fill-red-500"
                    : "text-gray-500"
                }`}
              />
              <span className="text-gray-700">
                {recipe.isFavorite ? "Favorited" : "Favorite"}
              </span>
            </span>
          </Button>

          <Button
            variant="destructive"
            onClick={() => onDelete(Number(recipe.id))}
            className="flex-1"
          >
            <span className="flex items-center justify-center gap-2">
              <Trash2 className="h-5 w-5" />
              Delete
            </span>
          </Button>
        </article>
      </article>
    </section>
  );
};

export default DailyMealsView;

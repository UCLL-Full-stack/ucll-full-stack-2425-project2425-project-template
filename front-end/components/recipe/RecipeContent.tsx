import Image from "next/image";
import { Clock, ArrowUpRight } from "lucide-react";
import { Recipe } from "@/types/recipes";
import { Card } from "@/components/ui/card";

interface RecipeContentProps {
  recipe: Recipe;
}

export default function RecipeContent({ recipe }: RecipeContentProps) {
  return (
    <article className="max-w-3xl mx-auto">
      {/* Recipe Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
        <div className="flex items-center justify-center gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>{recipe.cookingTime} minutes</span>
          </div>
          <div className="capitalize">{recipe.category}</div>
        </div>
      </header>

      {/* Recipe Image */}
      {recipe.imageUrl && (
        <div className="mb-12">
          <div className="aspect-[16/9] relative rounded-xl overflow-hidden">
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Recipe Details */}
      <div className="space-y-10">
        {/* Ingredients & Instructions Container */}
        <Card className="p-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Ingredients */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-primary">
                Ingredients
              </h2>
              {recipe.ingredients && recipe.ingredients.length > 0 ? (
                <ul className="space-y-3">
                  {recipe.ingredients.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                      <div>
                        <span className="font-medium">
                          {item.quantity} {item.unit}
                        </span>{" "}
                        {item.ingredient.name}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No ingredients listed</p>
              )}
            </section>

            {/* Instructions */}
            <section>
              <h2 className="text-2xl font-semibold mb-6 text-primary">
                Instructions
              </h2>
              {recipe.instructions ? (
                <ol className="space-y-3">
                  {recipe.instructions.split(", ").map((instruction, index) => (
                    <li key={index} className="flex gap-2 items-start">
                      <span className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed pt-0.5">
                        {instruction}
                      </p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-500">No instructions available</p>
              )}
            </section>
          </div>
        </Card>

        {/* Notes */}
        {recipe.notes && (
          <Card className="p-8 bg-primary/5">
            <h2 className="text-2xl font-semibold mb-4 text-primary">Notes</h2>
            <p className="text-gray-700 leading-relaxed">{recipe.notes}</p>
          </Card>
        )}

        {/* Source Link */}
        {recipe.source && (
          <div className="flex justify-end">
            <a
              href={recipe.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 inline-flex items-center gap-2 font-medium transition-colors"
            >
              View Original Recipe
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </div>
    </article>
  );
}

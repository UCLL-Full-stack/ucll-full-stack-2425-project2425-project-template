import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import RecipeService from "@/services/RecipeService";
import { Recipe } from "@/types/recipes";
import RecipeHeader from "@/components/recipe/RecipeHeader";
import RecipeContent from "@/components/recipe/RecipeContent";
import { Button } from "@/components/ui/button";

export default function RecipePage() {
  const router = useRouter();
  const { id } = router.query;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id && !Array.isArray(id)) {
        const recipeId = parseInt(id, 10);
        if (isNaN(recipeId)) {
          setError("Invalid recipe ID");
          return;
        }
        try {
          const data = await RecipeService.fetchRecipeById(recipeId);
          setRecipe(data);
        } catch (error) {
          console.error("Error in fetchRecipe:", error);
          setError(
            `Failed to load recipe details: ${
              error instanceof Error ? error.message : String(error)
            }`
          );
        }
      }
    };

    if (router.isReady) {
      fetchRecipe();
    }
  }, [id, router.isReady]);

  const handleBack = () => {
    router.back();
  };

  // TO IMPLEMENT
  const handleToggleFavorite = () => {
    console.log("Toggle favorite");
  };

  // TO IMPLEMENT
  const handleEdit = () => {
    console.log("Edit recipe");
  };

  // TO IMPLEMENT
  const handleDelete = () => {
    console.log("Delete recipe");
  };

  if (error)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={handleBack}>Back</Button>
      </div>
    );
  if (!recipe)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="mb-4">Recipe not found</p>
        <Button onClick={handleBack}>Back</Button>
      </div>
    );

  return (
    <section className="min-h-screen bg-gray-50">
      <RecipeHeader
        isFavorite={recipe.isFavorite}
        onBack={handleBack}
        onToggleFavorite={handleToggleFavorite}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <main className="container mx-auto px-4 py-8">
        <RecipeContent recipe={recipe} />
      </main>
    </section>
  );
}

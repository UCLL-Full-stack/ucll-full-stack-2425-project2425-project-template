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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id && !Array.isArray(id)) {
        const recipeId = parseInt(id, 10);
        if (isNaN(recipeId)) {
          setError("Invalid recipe ID");
          setLoading(false);
          return;
        }
        try {
          const data = await RecipeService.fetchRecipeById(recipeId);
          setRecipe(data);
        } catch (err) {
          console.error("Error in fetchRecipe:", err);
          setError(
            `Failed to load recipe details: ${
              err instanceof Error ? err.message : String(err)
            }`
          );
        } finally {
          setLoading(false);
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

  const handleToggleFavorite = () => {
    // Implement toggle favorite logic here
    console.log("Toggle favorite");
  };

  const handleEdit = () => {
    // Implement edit logic here
    console.log("Edit recipe");
  };

  const handleDelete = () => {
    // Implement delete logic here
    console.log("Delete recipe");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
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
    <div className="min-h-screen bg-gray-50">
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
    </div>
  );
}

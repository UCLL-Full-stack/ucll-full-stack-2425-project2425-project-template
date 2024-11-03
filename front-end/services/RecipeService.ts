const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const fetchRecipeById = async (recipeId: number) => {
  try {
    const response = await fetch(`${apiUrl}/recipes/${recipeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
};

const RecipeService = { fetchRecipeById };

export default RecipeService;

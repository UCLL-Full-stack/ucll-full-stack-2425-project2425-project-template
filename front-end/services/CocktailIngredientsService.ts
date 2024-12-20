const apiUrl = process.env.NEXT_PUBLIC_API_URL;


    async function getIngredientsByCocktailId(cocktailId: number) {
        try {
            const loggedInUser = localStorage.getItem("loggedInUser");
            const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

            const response = await fetch(`${apiUrl}/cocktailIngredients/${cocktailId}/ingredients`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("No ingredients found for this cocktail");
                }
                throw new Error("An error occurred while fetching the ingredients");
            }

            const ingredients = await response.json();
            return ingredients;
        } catch (error) {
            console.error("Error fetching ingredients:", error);
            throw error;
        }
    }



export const CocktailIngredientService = {getIngredientsByCocktailId, };

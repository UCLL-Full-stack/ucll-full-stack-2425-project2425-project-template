const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function getAllCocktails() {
  try {
    const response = await fetch(`${apiUrl}/cocktails`);
    if (!response.ok) {
      throw new Error(`Error fetching cocktails: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cocktails:", error);
    throw error;
  }
}

async function getCocktailById(cocktailId: number) {
  try {
    const response = await fetch(`${apiUrl}/cocktails/${cocktailId}`);
    if (!response.ok) {
      throw new Error(`Error fetching cocktail with ID ${cocktailId}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cocktail:", error);
    throw error;
  }
}

export const CocktailService = {
  getAllCocktails,getCocktailById
};

export default CocktailService;

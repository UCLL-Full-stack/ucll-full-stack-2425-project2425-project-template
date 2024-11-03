const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function getAllIngredients() {
  try {
    const response = await fetch(`${apiUrl}/ingredients`);
    if (!response.ok) {
      throw new Error(`Error fetching ingredients: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw error;
  }
}

async function getIngredientById(id: number) {
    try {
       const response = await fetch(`http://localhost:3000/ingredient/${id}`);
       if (!response.ok) {
          throw new Error(`Error fetching ingredient with ID ${id}: ${response.statusText}`);
       }
       return await response.json();
    } catch (error) {
       console.error("Error fetching ingredient:", error);
    }
 }

export const IngredientService = {
  getAllIngredients,
  getIngredientById,
};

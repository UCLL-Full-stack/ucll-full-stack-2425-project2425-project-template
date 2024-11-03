const getAllIngredients = () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/ingredients", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const IngredientService = {
  getAllIngredients,
};

export default IngredientService;

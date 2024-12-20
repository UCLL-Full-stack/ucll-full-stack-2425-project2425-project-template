const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// async function getAllCocktails() {
//   try {
//     const response = await fetch(`${apiUrl}/cocktails`);
//     if (!response.ok) {
//       throw new Error(`Error fetching cocktails: ${response.statusText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching cocktails:", error);
//     throw error;
//   }
// }

// async function getCocktailById(cocktailId: number) {
//   try {
//     const response = await fetch(`${apiUrl}/cocktails/${cocktailId}`);
//     if (!response.ok) {
//       throw new Error(`Error fetching cocktail with ID ${cocktailId}: ${response.statusText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching cocktail:", error);
//     throw error;
//   }
// }

// async function addCocktail(cocktailData: {
//   name: string;
//   description: string;
//   strongness: number;
//   image: string;
// }) {
//   try {
//     const response = await fetch(`${apiUrl}/cocktails`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(cocktailData),
//     });

//     if (!response.ok) {
//       throw new Error(`Error adding cocktail: ${response.statusText}`);
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error adding cocktail:", error);
//     throw error;
//   }
// }

const getAllCocktails = () => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

  if (!token) {
    throw new Error("User is not logged in");
  }

  return fetch(process.env.NEXT_PUBLIC_API_URL + "/cocktails", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
};

const getCocktailById = (cocktailId: number) => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

  if (!token) {
    throw new Error("User is not logged in");
  }

  return fetch(process.env.NEXT_PUBLIC_API_URL + `/cocktails/${cocktailId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
};

const addCocktail = ({ name, description, strongness, image }: { name: string; description: string; strongness: number; image: string }) => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

  if (!token) {
    throw new Error("User is not logged in");
  }

  return fetch(process.env.NEXT_PUBLIC_API_URL + "/cocktails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, description, strongness, image })
  });
};

const updateCocktail = ({ cocktailId, name, description, strongness, image }: { cocktailId: string; name: string; description: string; strongness: number; image: string }) => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

  if (!token) {
    throw new Error("User is not logged in");
  }

  return fetch(process.env.NEXT_PUBLIC_API_URL + `/cocktails/${cocktailId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, description, strongness, image })
  });
};

const getAllFavoriteCocktails = () => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

  if (!token) {
    throw new Error("User is not logged in");
  }

  return fetch(process.env.NEXT_PUBLIC_API_URL + "/favorites", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
};

const deleteCocktail = (cocktailId: string) => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

  if (!token) {
    throw new Error("User is not logged in");
  }

  return fetch(process.env.NEXT_PUBLIC_API_URL + `/cocktails/${cocktailId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
};

const favoriteCocktail = (cocktailId: string) => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

  if (!token) {
    throw new Error("User is not logged in");
  }

  return fetch(`${apiUrl}/favorites/${cocktailId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
};

const unfavoriteCocktail = (cocktailId: string) => {
  const loggedInUser = sessionStorage.getItem("loggedInUser");
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

  if (!token) {
    throw new Error("User is not logged in");
  }

  return fetch(`${apiUrl}/favorites/${cocktailId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
};



export const CocktailService = {
  getAllCocktails,getCocktailById, addCocktail, deleteCocktail, updateCocktail, getAllFavoriteCocktails, favoriteCocktail, unfavoriteCocktail,
};

export default CocktailService;

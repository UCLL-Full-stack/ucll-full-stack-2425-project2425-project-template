const getAllCategories = async () => {
  const result = await fetch(process.env.NEXT_PUBLIC_API_URL + "/categories", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!result.ok) {
    throw new Error("Failed to fetch categories.");
  }
  return result.json();
};
export default { getAllCategories };

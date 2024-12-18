const getLeiding = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leiding`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch leiding");
  }
  return response.json();
};

export default { getLeiding };

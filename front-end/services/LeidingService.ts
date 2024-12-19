const getLeiding = async () => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}").token;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leiding`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Cache-Control": "no-cache",
      "Pragma": "no-cache",
      "Expires": "0"
    },
  });
  if (!response.ok) {
    throw new Error("Failed to get leiding.");
  }
  console.log("gelukt")
  return response.json();
};

export default { getLeiding };
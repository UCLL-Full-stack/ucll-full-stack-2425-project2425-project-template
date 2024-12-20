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
  return response.json();
};

const deleteLeiding = async (leidingId: number) => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}").token;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leiding/${leidingId}`, {
      method: "DELETE",
      headers: {
          "Authorization": `Bearer ${token}`
      }
  });
  if (!response.ok) {
      throw new Error("Leiding verwijderen mislukt.");
  }
};

const updateLeiding = async (id: number, naam: string, voornaam: string, telefoon: string, email: string) => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}").token;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leiding`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
          naam,
          voornaam,
          telefoon,
          email
      }),
  });
  if (!response.ok) {
      throw new Error("Leiding bewerken mislukt.");
  }
  return response.json();
};

const LeidingService = {
  getLeiding,
  deleteLeiding,
  updateLeiding,
};

export default LeidingService;
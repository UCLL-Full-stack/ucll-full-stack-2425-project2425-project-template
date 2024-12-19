const getAllActiviteiten = async () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/groep`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getActiviteitenByGroupName = async (groepNaam: string) => {
  return fetch(
    process.env.NEXT_PUBLIC_API_URL + `/groep/${groepNaam}/activiteiten`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const addActiviteit = async ( groepNaam: string, name: string, description: string, beginDate: Date, endDate: Date) => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}").token;
  const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/activiteit/${groepNaam}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        naam: name,
        beschrijving: description,
        begindatum: beginDate,
        einddatum: endDate,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Activiteit toevoegen mislukt.");
  }
  return response.json();
};

const updateActiviteit = async (groepNaam: string, id: number, name: string, description: string, beginDate: Date, endDate: Date) => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}").token;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activiteit/${groepNaam}`, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
          id,
          naam: name,
          beschrijving: description,
          begindatum: beginDate,
          einddatum: endDate,
      }),
  });
  if (!response.ok) {
      throw new Error("Activiteit bewerken mislukt.");
  }
  return response.json();
};

const deleteActiviteit = async (groepNaam: string, activiteitId: number) => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser") || "{}").token;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/activiteit/${groepNaam}/${activiteitId}`, {
      method: "DELETE",
      headers: {
          "Authorization": `Bearer ${token}`
      }
  });
  if (!response.ok) {
      throw new Error("Activiteit verwijderen mislukt.");
  }
};

const ActiviteitenService = {
  getAllActiviteiten,
  getActiviteitenByGroupName,
  addActiviteit,
  updateActiviteit,
  deleteActiviteit,
};

export default ActiviteitenService;

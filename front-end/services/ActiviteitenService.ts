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
  const token = JSON.parse(sessionStorage.getItem("loggedIn") || "{}").token;
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
    console.log(groepNaam);
    console.log(name);
    console.log(description);
    console.log(beginDate);
    console.log(endDate);
    console.log("response" + response);
    //throw new Error("Activiteit toevoegen mislukt.");
  }
  console.log(response.status, response.body)
  return response.json();
};

const ActiviteitenService = {
  getAllActiviteiten,
  getActiviteitenByGroupName,
  addActiviteit,
};

export default ActiviteitenService;

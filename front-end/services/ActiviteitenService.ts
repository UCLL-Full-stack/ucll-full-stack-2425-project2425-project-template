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

const addActiviteit = async (
  name: string,
  description: string,
  beginDate: Date,
  endDate: Date
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/activiteiten`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        beginDate,
        endDate,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Activiteit toevoegen mislukt.");
  }
  return response.json();
};

const ActiviteitenService = {
  getAllActiviteiten,
  getActiviteitenByGroupName,
  addActiviteit,
};

export default ActiviteitenService;

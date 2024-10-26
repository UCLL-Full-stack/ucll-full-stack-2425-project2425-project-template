const getAllEvents = async () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/events", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

export default { getAllEvents };

const getAllNieuwsberichten = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/nieuwsberichten`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
}

export default getAllNieuwsberichten;

const getAllCarParts = async () => {
    const token = JSON.parse(
      localStorage.getItem("loggedInUser") as string,
    )?.token;
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/carPart", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
  };
  const carPartService = {
    getAllCarParts,
  };
  export default carPartService;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getCrashById = async (id: number) => {
    return fetch(`${apiUrl}/crashes/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const crashService = {
    getCrashById
  };
  
  export default crashService;
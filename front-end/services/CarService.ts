const getAllCars = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + '/cars', 
      {
        method: "GET",
         headers: {
          'Content-Type': 'application/json'
        }
      });
  };
  const carService = {
    getAllCars,
  }
  export default carService;
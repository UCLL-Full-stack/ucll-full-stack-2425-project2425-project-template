import { Car } from "@/types";

const getAllCars = async () => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/cars", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getCarById = async (id: string) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/cars/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addCar = async (carData: Car) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });
  const newCar = await response.json();
  return newCar;
};

const deleteCar = async (carId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cars/${carId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

const carService = {
  getAllCars,
  getCarById,
  addCar,
  deleteCar,
};
export default carService;

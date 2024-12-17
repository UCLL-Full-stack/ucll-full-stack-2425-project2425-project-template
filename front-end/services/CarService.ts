import { Car } from "@/types";

const getAllCars = async () => {
  const token = JSON.parse(
    localStorage.getItem("loggedInUser") as string,
  )?.token;
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/cars", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
};

const getCarById = async (id: string) => {
  const token = JSON.parse(
    localStorage.getItem("loggedInUser") as string,
  )?.token;
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/cars/" + id, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
};

const addCar = async (carData: Car) => {
  const token = JSON.parse(
    localStorage.getItem("loggedInUser") as string,
  )?.token;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cars`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });
  const newCar = await response.json();
  return newCar;
};

const deleteCar = async (carId: number) => {
  const token = JSON.parse(localStorage.getItem("loggedInUser")as string)?.token;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cars/${carId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
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

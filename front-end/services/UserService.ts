import { User } from "@/types";
import { headers } from "next/headers";

const createUser = async (user: User): Promise<void> => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const getUserByNationalRegisterNumber = (
  userByNationalRegisterNumber: string
) => {
  return fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/lecturers/${userByNationalRegisterNumber}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

const UserService = {
  createUser,
  getUserByNationalRegisterNumber,
};

export default UserService;

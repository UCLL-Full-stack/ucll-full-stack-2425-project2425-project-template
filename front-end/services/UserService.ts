const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const createUser = async (userInput: {
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  permission: string;
}): Promise<Response> => {
  return fetch(`${apiUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInput),
  });
};

const getAllUsers = async (): Promise<Response> => {
  return fetch(`${apiUrl}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

export default {
  createUser,
  getAllUsers,
};
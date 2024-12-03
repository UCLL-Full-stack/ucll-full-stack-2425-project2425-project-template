const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getDriverById = async (id: string): Promise<Response> => {
  return fetch(`${apiUrl}/drivers/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export default {
  getDriverById,
};

const login = async (credentials: { username: string; password: string; }): Promise<Response> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return fetch(apiUrl + '/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
};

export default {
  login,
};
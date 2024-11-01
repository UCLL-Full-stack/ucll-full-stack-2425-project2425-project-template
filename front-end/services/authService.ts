const login = async (credentials: { username: string; password: string }): Promise<Response> => {
  return fetch('/api/login', {
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
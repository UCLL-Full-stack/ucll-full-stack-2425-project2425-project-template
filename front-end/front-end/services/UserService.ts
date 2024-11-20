const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAllUsers = async () => {
  const response = await fetch(`${apiUrl}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return await response.json();
};

const UserService = {
  getAllUsers,
  async addUserToProject(projectId: string, userId: string) {
    return await fetch(`${apiUrl}/projects/${projectId}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
  },
};

export default UserService;
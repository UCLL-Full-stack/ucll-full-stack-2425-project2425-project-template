const getAllUsers = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(apiUrl + '/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    
    console.error('Error fetching users:', error);
    return [];
  }
};

const UserService = {
  getAllUsers,
};

export default UserService;
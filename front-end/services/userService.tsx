import { SubscriptionType, User } from "types";

const loginUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
  })
}

const signupUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
  })
}
    

    // async function deleteUser(rnummer : string) {
    //     const storedToken: string | null = sessionStorage.getItem('loggedInUser');
    //     try {
    //       const token = storedToken ? JSON.parse(storedToken)?.token : undefined;
    //       console.log(token)
    //       return await fetch(process.env.NEXT_PUBLIC_API_URL+ `/users/deleteUserAndLinkedPersonAndChatsAndMessagesByRnummer/${rnummer}`, {
    //         method: "DELETE",
    //         headers: {
    //           "accept": 'application/json',
    //           "Content-Type" : "application/json",
    //           "Authorization":`Bearer ${token}`
    //         },
           
    //       } );
    //     } catch (error) {
    //       console.error('Error adding person:', error);
    //       throw new Error('Failed to add person');
    //     }
    //   }
    
const getAllUsers = () => {

  const loggedInUser = localStorage.getItem('loggedInUser')
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null

  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
  })
}

const changeSubscription = async (
    subscriptionType: SubscriptionType,
    duration: string
  ): Promise<void> => {
    try {
      const loggedInUser = localStorage.getItem("loggedInUser");
      const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
      const userId = loggedInUser ? JSON.parse(loggedInUser).id : null;
      const startDate = new Date();
      
      let durationInDays = duration;
      if (duration !== "unlimited") {
        durationInDays = (parseInt(duration) * 30).toString();
      }
  
      console.log("Duration being sent to backend:", durationInDays); 
  
      if (!token || !userId) {
        throw new Error("Please log in to change your subscription.");
      }
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/subscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: subscriptionType,
            startDate: startDate,
            duration: durationInDays,
            userId: userId,
          }),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${errorData.message}`);
      }
  
      alert(`Subscription changed to ${subscriptionType} for ${duration} months!`);
    } catch (error) {
      console.error("Error changing subscription:", error);
      throw error;
    }
  };
  
  
  const getUserById = async (id: number) => {

    const loggedInUser = localStorage.getItem('loggedInUser')
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Error fetching user: ${error.message}`);
    }

    return response.json();
  }

  const updateRole = async (userId: number, newRole: string, adminId: number): Promise<Response> => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/updateRole`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id: userId, role: newRole, adminId })
    });
  
    return response;
  }


const UserService = {
  loginUser, signupUser, getAllUsers, changeSubscription, getUserById, updateRole
}      
    
export default UserService
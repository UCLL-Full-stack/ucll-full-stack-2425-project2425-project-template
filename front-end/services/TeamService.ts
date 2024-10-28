const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAllTeams = async () => {
  return fetch(apiUrl + "/teams", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const TeamService = {
    getAllTeams
  };
  
  export default TeamService;
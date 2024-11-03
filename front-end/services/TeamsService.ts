const getAllTeams = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + '/teams', {
    
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
     });
};

const TeamService = {
    getAllTeams,
};

export default TeamService;

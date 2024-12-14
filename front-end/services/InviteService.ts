const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAll = async () => {
    const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;

    return fetch(apiUrl + '/invites', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
};

const getInvitesByEventId = async (eventId: string) => {
    const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;

    return fetch(apiUrl + '/invites/' + eventId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
};

const createInvite = async (email: string, eventId: string) => {
    const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;

    return fetch(apiUrl + '/invites', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({email, eventId}),
    });
};

const getInvitesByUserEmail = async (email: string) => {
    const token = JSON.parse(localStorage.getItem("loggedInUser"))?.token;

    return fetch(apiUrl + '/invites/user/' + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        }
    });
};

const InviteService = {
    getAll,
    createInvite,
    getInvitesByEventId,
    getInvitesByUserEmail,
}

export default InviteService;
const getAllGroepen = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/groep`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer span`,
        },
    });
};

export default getAllGroepen;
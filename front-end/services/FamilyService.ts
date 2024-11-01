
const getAllFamlies = async () => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL +'/families', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })

        return await response.json();
    } catch (error) {
        console.error('Error fetching families:', error);
        return [];
    }
}


// Hierboven u code
const FamilyService = {
    getAllFamlies,
}

export default FamilyService
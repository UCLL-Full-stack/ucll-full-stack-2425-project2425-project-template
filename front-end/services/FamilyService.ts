import { Family, User } from "@/types";

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

const createFamily = async (familyName: string, user: User): Promise<Family | null> => {
    const familyList = [user];
    const family: Family = { name: familyName, familyList, owner: user };

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/families', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(family),
        });

        if (!response.ok) {
            throw new Error('Failed to create family');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating family:', error);
        return null;
    }
};


// Hierboven u code
const FamilyService = {
    getAllFamlies,
    createFamily,
}

export default FamilyService
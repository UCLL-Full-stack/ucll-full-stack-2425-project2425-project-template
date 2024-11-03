import { List, ListInput } from "@/types/index"

const getAllLists= async (): Promise<List[]> => {
    const listsJson = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists`);
    return await listsJson.json();
}

const createList = async (list: ListInput): Promise<List> => {
    const newListJson = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(list)
    }); 

    return await newListJson.json();
}

export default {
    getAllLists,
    createList
}

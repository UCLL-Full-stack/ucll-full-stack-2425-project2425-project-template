import { ListInput } from "@/types/index"

const getAllLists= async (): Promise<Response> => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

const getUserLists= async (id: number): Promise<Response> => {
    const loggedInUser = sessionStorage.getItem("LoggedInUser");
    const user = JSON.parse(loggedInUser??"");
    if (!user) return Response.error();

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    });
}

const createList = async (list: ListInput): Promise<Response> => {
    const loggedInUser = sessionStorage.getItem("LoggedInUser");
    const user = JSON.parse(loggedInUser??"");
    if (!user) return Response.error();

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(list)
    }); 
}

const deleteList = async (id: number): Promise<Response> =>{
    const loggedInUser = sessionStorage.getItem("LoggedInUser");
    const user = JSON.parse(loggedInUser??"");
    if (!user) return Response.error();

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/lists/${id}`,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    });
}

export default {
    getAllLists,
    getUserLists,
    createList,
    deleteList
}

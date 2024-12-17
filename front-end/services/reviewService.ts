import { Review, ReviewInput } from "@/types/index";

const getAllReviews = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

const getReviewById = async (id:number) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

const createReview = async (review: ReviewInput): Promise<Response> => {
    const loggedInUser = sessionStorage.getItem("LoggedInUser");
    const user = JSON.parse(loggedInUser??"");
    if (!user) return Response.error();

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}` 
        },
        body: JSON.stringify(review)
    }); 
};

const likeReview = async (review: Review): Promise<Response> => {
    const loggedInUser = sessionStorage.getItem("LoggedInUser");
    const user = JSON.parse(loggedInUser??"");
    if (!user) return Response.error();

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/like/${review.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user.token}` 
        },
        body: JSON.stringify(review.likes)
    }); 
}

const deleteReview = async (id: number) => {
    const loggedInUser = sessionStorage.getItem("LoggedInUser");
    const user = JSON.parse(loggedInUser??"");
    if (!user) return Response.error();

    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`,{
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    });
};

export default{
    getAllReviews,
    getReviewById,
    createReview,
    likeReview,
    deleteReview
}

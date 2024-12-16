import reviewService from "@/services/reviewService";
import { Review } from "@/types/index";
import { Rating } from "@mui/material";
import { setConfig } from "next/config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import IconComment from "../ui/comment";
import IconDelete from "../ui/delete";
import IconDetails from "../ui/details";
import IconEdit from "../ui/edit";
import IconLike from "../ui/like";

type Props = {
    review: Review;
    onDelete?: (id:number)=>void;
    userId?: number;
}

const ReviewCard: React.FC<Props> = ({review, onDelete, userId}: Props) => {

    const router = useRouter();
    const formattedDate = new Date(review.createdAt).toLocaleDateString();
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(review.likes.length);
    const [clicked, setClicked] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(()=>{
        const userLiked = review.likes.find(like=> like === userId);
        if(userLiked) setIsLiked(true);
    },[userId]);

    useEffect(()=>{
        if(!userId || !clicked)return;

        if(isLiked)
            review.likes.push(userId); 
        else
            review.likes = review.likes.filter(like => like !== userId);

        updateLikes();
        setLikeCount(review.likes.length);
    },[isLiked]);
    
    const updateLikes = async () => {
        console.log(review);
        const response = await reviewService.likeReview(review);
        if(!response.ok){
            setError(await response.json());
        }
    }

    const handleLike = ()=>{
        setClicked(true);
        if(!userId) {
            router.push("/login");
            return;
        }

        setIsLiked(!isLiked);
    };

    return (
        <div className="bg-bg2 rounded-lg p-4 shadow-md shadow-text1 w-[20vw]">
            <div className="flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl main-font mb-2 text-text2 truncate">{review.title}</h2>
                {onDelete &&
                    <IconDelete 
                        className="text-text1 hover:text-red-500 duration-100"
                        width={30} height={30}
                        onClick={() => onDelete(review.id) }
                    />
                }
            </div>
            <p className="text-sm sm:text-md text-left text-text1 mb-3 sm:mb-4 main-font truncate">{review.body}</p>
            <p className="text-sm sm:text-md mb-2 sm:mb-4 text-text2 main-font flex truncate">
                {review.albumId.split('-')[1]} - {review.albumId.split('-')[0]}
            </p>
            <Rating value={review.starRating} readOnly size="medium" />
            <div className="text-left text-xs sm:text-sm text-text2 my-2 main-thin">
                <span> {review.author.username} </span>
                <span> {formattedDate} </span>
                
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <div className="flex gap-2">
                    <span className="flex items-center gap-2 text-xs sm:text-sm text-text2 main-font">
                        <p> {likeCount} </p>
                        <IconLike 
                            width={25} height={25} 
                            className={isLiked?"text-green-500 hover:text-text2 duration-100":"text-text2 hover:text-green-500 duration-100"}
                            onClick={handleLike}
                        /> 
                    </span>
                    <span className="flex items-center gap-2 text-xs sm:text-sm text-text2 main-font">
                        <p>{review.comments.length}</p>
                        <IconComment width={25} height={25} className="text-text2 hover:text-bg1"/>
                    </span>
                </div>
                <div className="flex gap-2">
                {onDelete &&
                    <button
                        className="rounded-lg px-2 sm:px-3 py-1 w-full flex justify-center sm:py-1 main-thin text-xs sm:text-sm bg-text1 text-text2 hover:text-bg1 hover:bg-text2 transition-colors duration-100">
                        <IconEdit width={25} height={25}/>
                    </button>
                }
                    <button 
                        className="rounded-lg px-2 sm:px-3 py-1 w-full flex justify-center sm:py-1 main-thin text-xs sm:text-sm bg-text1 text-text2 hover:text-bg1 hover:bg-text2 transition-colors duration-100">
                        <IconDetails width={25} height={25}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;

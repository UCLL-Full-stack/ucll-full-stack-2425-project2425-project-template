import listService from "@/services/listService";
import { List } from "@/types/index";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import IconDelete from "../ui/delete";
import IconDetails from "../ui/details";
import IconEdit from "../ui/edit";
import IconLike from "../ui/like";

type Props = {
    list: List;
    onDelete?: (id: number)=>void;
    userId?: number
}

const ListCard: React.FC<Props> = ({list, onDelete, userId}: Props) => {
    const { title, description, createdAt, albumIds } = list;
    const formattedDate = new Date(createdAt).toLocaleDateString();

    const router = useRouter();
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(list.likes.length);
    const [clicked, setClicked] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(()=>{
        const userLiked = list.likes.find(like=> like === userId);
        if(userLiked) setIsLiked(true);
    },[userId]);

    useEffect(()=>{
        if(!userId || !clicked)return;

        if(isLiked)
            list.likes.push(userId); 
        else
            list.likes = list.likes.filter(like => like !== userId);

        updateLikes();
        setLikeCount(list.likes.length);
    },[isLiked]);
    
    const updateLikes = async () => {
        console.log(list);
        const response = await listService.likeList(list);
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
        <div className="bg-bg2 p-4 sm:p-5 rounded-lg shadow-lg shadow-text1 max-w-full sm:max-w-sm">
            <div className="flex items-center justify-between">
                <h2 className="text-xl sm:text-2xl main-font mb-2 text-text2">{title}</h2>
                {onDelete &&
                    <IconDelete 
                    className="text-text1 hover:text-red-500 duration-100"
                    width={30} height={30}
                    onClick={()=>{onDelete(list.id)}}
                    />
                }
            </div>
            <p className="text-sm sm:text-md text-text1 mb-3 sm:mb-4 main-thin">{description}</p>
            <p className="text-xs sm:text-sm text-text1 mb-3 sm:mb-4 main-font">{list.author.username} {formattedDate}</p>

            <span className="text-xs sm:text-sm text-text2 main-font">Albums: {albumIds.length}</span>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                <span className="flex items-center gap-2 text-xs sm:text-sm text-text2 main-font">
                    <p> {likeCount} </p>
                    <IconLike 
                        width={25} height={25} 
                        className={isLiked?"text-green-500 hover:text-text2 duration-100":"text-text2 hover:text-green-500 duration-100"}
                        onClick={handleLike}
                    /> 
                </span>
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

export default ListCard;

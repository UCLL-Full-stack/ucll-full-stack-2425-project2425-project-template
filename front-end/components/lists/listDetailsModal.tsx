import IconLike from "../ui/like";
import { List } from "@/types/index";
import IconClose from "../ui/close";
import AlbumListCard from "../album/albumListCard";

type Props = {
    onClose: () => void;
    list: List;
    handleLike: () => void;
    isLiked: boolean;
    likeCount: number;
};

const ListDetailsModal = ({ onClose, list, handleLike, isLiked, likeCount }: Props) => {

    const { title, description, createdAt, author } = list;
    const formattedDate = new Date(createdAt).toLocaleDateString();

    return (
        <div className="absolute inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-bg2 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl main-font text-text2">{title}</h2>
                    <IconClose
                        className="text-text1 hover:text-red-500 duration-100 cursor-pointer"
                        width={30}
                        height={30}
                        onClick={()=>onClose()}
                    />
                </div>
                <p className="text-xl text-text1 mb-4 main-font">{description}</p>
                <span className="text-md text-text2 main-font">Albums:</span>
                <div>
                    {/*list.albumIds &&
                        <AlbumListCard albums={}/>
                    */}
                </div>
                <div className="flex w-full justify-between mt-4">
                    <p className="text-l text-text1 main-thin">By {author.username} on {formattedDate}</p>
                    <span className="flex items-center gap-2 text-xs sm:text-sm text-text2 main-font">
                        <p>{likeCount}</p>
                        <IconLike
                            width={25}
                            height={25}
                            className={isLiked ? "text-green-500 hover:text-text2 duration-100" : "text-text2 hover:text-green-500 duration-100"}
                            onClick={handleLike}
                        />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ListDetailsModal;

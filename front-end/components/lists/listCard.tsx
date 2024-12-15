import { List } from "@/types/index";
import IconDelete from "../ui/delete";
import IconDetails from "../ui/details";

type Props = {
    list: List;
    onDelete?: (id: number)=>void;
}

const ListCard: React.FC<Props> = ({list, onDelete}: Props) => {
    const { title, description, createdAt, albumIds } = list;
    const formattedDate = new Date(createdAt).toLocaleDateString();

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

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 sm:mt-4 gap-2 sm:gap-0">
                <span className="text-xs sm:text-sm text-text2 main-font">Albums: {albumIds.length}</span>
                <button 
                    className="rounded-lg px-2 sm:px-3 py-1 w-1/4 flex justify-center sm:py-1 main-thin text-xs sm:text-sm bg-text1 text-text2 hover:text-bg1 hover:bg-text2 transition-colors duration-100">
                    <IconDetails width={25} height={25}/>
                </button>
            </div>
        </div>    
    );
};

export default ListCard;

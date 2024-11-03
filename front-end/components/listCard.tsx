import { List } from "@/types/index";

type Props = {
    list: List
}

const ListCard: React.FC<Props> = ({list}: Props) => {
    const { title, description, createdAt, albums } = list;

    const formattedDate = new Date(createdAt).toLocaleDateString();

    return (
        <div className="bg-bg2 p-5 rounded-lg shadow-lg text-text1 max-w-sm">
            <h2 className="text-2xl main-font mb-2">{title}</h2>
            <p className="text-sm text-text2 mb-4">{formattedDate}</p>
            <p className="text-md text-text2 mb-4">{description}</p>
            
            <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-text3">Albums: {albums.length}</span>
                <button 
                    className="rounded-lg px-3 py-2 text-sm bg-bg2 border-text1 border-[1px] text-text2 hover:text-white hover:bg-bg1 transition-colors duration-150"
                >
                    View List
                </button>
            </div>
        </div>
    );
};

export default ListCard;

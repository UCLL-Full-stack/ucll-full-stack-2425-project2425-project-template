import Header from "@/components/header";
import ListCard from "@/components/listCard";
import ListModal from "@/components/listModal";
import listService from "@/services/listService";
import { List, ListInput, Review } from "@/types/index";
import Head from "next/head";
import { useEffect, useState } from "react";

const Profile: React.FC = () => {

    const [lists, setLists] = useState<List[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const getLists = async () => {
        setLists(await listService.getAllLists());    
    }

    useEffect(() => {
        getLists();
    }, [isModalOpen]);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleCreateList = async (list: ListInput) => {
        const newList = await listService.createList(list);
        console.log(newList);
        toggleModal();
    }

    return (
        <>
            <Head>
                <title>Yadig</title>
            </Head>
            <div className="flex flex-col h-screen">
                <Header current="profile"/>
                <main className="flex-1 flex bg-bg1 p-10 overflow-y-auto">

                    <div className="w-1/2 pr-10">
                        <div className="relative flex items-center justify-center">
                            <h1 className="main-font text-text2 text-4xl">My Reviews</h1>
                            <button
                                type="button"
                                className="absolute right-0 rounded-lg px-3 py-2 text-sm bg-bg2 border-text1 border-[1px] text-text2 hover:text-white hover:bg-bg1 transition-colors duration-100"
                            >
                                New Review
                            </button>
                        </div>
                        <div className="grid pt-10 gap-4">
                            {reviews.length > 0 ? reviews.map((review) => (
                                <h2></h2>//TODO: Add reviewCard
                            )) : (
                                <h2 className="text-center main-font text-white">No Reviews To Show</h2>
                            )}
                        </div>
                    </div>

                    <div className="w-1/2 border-bg2 border-l-[1px] pl-10">
                        <div className="relative flex items-center justify-center">
                            <h1 className="main-font text-text2 text-4xl">My Lists</h1>
                            <button
                                onClick={toggleModal}
                                type="button"
                                className="absolute right-0 rounded-lg px-3 py-2 text-sm bg-bg2 border-text1 border-[1px] text-text2 hover:text-white hover:bg-bg1 transition-colors duration-100"
                            >
                                New List
                            </button>
                        </div>
                        <div className="grid grid-cols-2 pt-10 gap-4">
                            {lists.length > 0 ? lists.map((list) => (
                                <ListCard key={list.id} list={list} />
                            )) : (
                                <h2 className="col-span-2 text-center main-font text-white">No Lists To Show</h2>
                            )}
                        </div>
                    </div>

                </main>

                {isModalOpen && (
                    <ListModal 
                        isOpen={isModalOpen} 
                        onClose={toggleModal} 
                        onSave={(newList: ListInput) => handleCreateList(newList)} 
                    />
                )}

            </div>
        </>
    );
}

export default Profile;

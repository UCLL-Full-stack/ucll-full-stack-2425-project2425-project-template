import userService from '@services/userService';
import playerService from '@services/playerService';
import { useState, useEffect } from 'react';
import { Player, User, World } from '@types';
import worldService from '@services/worldService';
import { useRouter } from 'next/router';

const WorldSelection: React.FC = () => {
    const router = useRouter();
    const [loggedInUser, setLoggedInUser] = useState<User>();
    const [userWorlds, setUserWorlds] = useState<World[]>();
    const [allWorldsMinusUser, setAllWorldsMinusUser] = useState<World[]>();
    const [allWorlds, setAllWorlds] = useState<World[]>();

    const getWorlds = async () => {
        if (loggedInUser){
            const worlds = await worldService.getWorlds();
            setAllWorlds(worlds);
        }
    }

    const getUserWorlds = async () => {
        if (allWorlds && loggedInUser){
            let worldsOfUser: World[] = [];
            let worldsNotOfUser: World[] = [];
            allWorlds.forEach(world => {
                if (world.owner.email === loggedInUser.email) {
                    worldsOfUser.push(world);
                }
                else {
                    worldsNotOfUser.push(world);
                }
            })
            setUserWorlds(worldsOfUser);
            setAllWorldsMinusUser(worldsNotOfUser);
        }
    }

    const joinworld = async (id: number) => {
        router.push("/game/in/world/" + id);
    }

    useEffect(() => {
        getWorlds();
    }, [loggedInUser]);

    
    useEffect(() => {
        getUserWorlds();
    }, [allWorlds]);

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

    if (!allWorlds){
        return <p>Loading worlds...</p>
    }

    if (!userWorlds){
        return <p>Loading your worlds...</p>
    }

    if (!allWorldsMinusUser){
        return <p>Loading other people's worlds...</p>
    }

    return (
        <div className="flex flex-col items-center justify-center ">
            <p className='text-2xl m-6'>Your Worlds</p>
            {userWorlds.length <= 0 ? (
                <p>You have no worlds</p>
            ):(
                <div className='flex flex-row flex-wrap justify-center'>
                {userWorlds.map((world, index) => (
                    <div className='border-solid hover:border-dotted border-2 rounded h-24 w-60 content-center m-2' key={index} onClick={() => joinworld(world.id)}>
                        <p className='text-2xl'>{world.name}</p>
                    </div>
                ))}
                    <div className='border-solid hover:border-dotted border-2 border-green-500 rounded h-24 w-60 content-center m-2 bg-green-200' onClick={() => router.push("/game/worlds/new")}>
                        <p className='text-2xl'>Create New World</p>
                    </div>
                </div>
            )}
            <p className='text-2xl m-6'>Other people's worlds</p>
            {allWorldsMinusUser.length <= 0 ? (
                <p>No other worlds found</p>
            ):(
                <div className='flex flex-row'>
                {allWorldsMinusUser.map((world, index) => (
                    <div className='border-solid hover:border-dotted border-2 rounded h-24 w-60 content-center m-2' key={index} onClick={() => joinworld(world.id)}>
                        <p className='text-2xl'>{world.name}</p>
                        <p className='text-xl'>{world.owner.name}</p>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
};

export default WorldSelection;
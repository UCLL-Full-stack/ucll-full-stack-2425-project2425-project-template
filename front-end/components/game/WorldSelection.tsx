import userService from '@services/userService';
import playerService from '@services/playerService';
import { useState, useEffect } from 'react';
import { Player, User, World } from '@types';
import worldService from '@services/worldService';

const WorldSelection: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User>();
    const [userWorlds, setUserWorlds] = useState<World[]>();
    const [allWorlds, setAllWorlds] = useState<World[]>();

    const getWorlds = async () => {
        if (loggedInUser){
            const worlds = await worldService.getWorlds();
            setAllWorlds(worlds);
        }
    }

    const getUserWorlds = async () => {
        if (allWorlds && loggedInUser){
            let result: World[] = [];
            allWorlds.forEach(world => {
                if (world.owner.email === loggedInUser.email) {
                    result.push(world);
                }
            })
            setUserWorlds(result);
        }
    }

    const joinworld = async (id: number) => {
        console.log("hallo");
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
        return <p>Loading Worlds...</p>
    }

    if (!userWorlds){
        return <p>Loading Worlds...</p>
    }

    return (
        <div className="flex flex-col items-center justify-center ">
            {userWorlds.length <= 0 ? (
                <p>You have no worlds</p>
            ):(
                <>
                <p className='text-2xl m-6'>Your Worlds</p>
                {userWorlds.map((world, index) => (
                    <div className='border-solid hover:border-dotted border-2 rounded p-12' key={index} onClick={() => joinworld(world.id)}>
                        <p className='text-2xl'>{world.name}</p>
                    </div>
                ))}
                </>
            )}
        </div>
    );
};

export default WorldSelection;
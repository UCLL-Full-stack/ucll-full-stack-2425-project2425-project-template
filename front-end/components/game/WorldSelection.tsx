import userService from '@services/userService';
import playerService from '@services/playerService';
import { useState, useEffect } from 'react';
import { Player, User } from '@types';

const WorldSelection: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User>();
    const [characters, setCharacters] = useState<Player[]>();
    const [selectedCharacter, setSelectedCharacter] = useState<Player>();
    const [detectChange, setDetect] = useState<boolean>();

    const getCharacters = async () => {
        if (loggedInUser){
            setCharacters(await playerService.getPlayersFromUser(loggedInUser.email));
        }
    }

    const getSelectedCharacter = async () => {
        const select = localStorage.getItem('selectedCharacter');
        if (select) {
            setSelectedCharacter(await playerService.getPlayerById(select));
        }
    }

    const changeSelectedCharacter = async (character: Player) => {
        localStorage.setItem("selectedCharacter", character.id.toString());
        setDetect(!detectChange);
    }

    useEffect(() => {
        getCharacters();
    }, [loggedInUser]);

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

    useEffect(() => {
        getSelectedCharacter();
    }, [detectChange]);

    if (!characters){
        return <p>Loading Characters...</p>
    }

    if (characters.length <= 0){
        return <p>Please make a player character first</p>
    }

    return (
        <div className="flex flex-col items-center justify-center ">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Character
                        </th>
                        <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Money
                        </th>
                        <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Statistics
                        </th>
                        <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Class
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                {characters && characters.length > 0 && characters.map((character, index) => (    
                <>
                    {character.id === selectedCharacter?.id ? (
                        <tr className="" key={index} onClick={() => changeSelectedCharacter(character)}>
                            <td className="px-6 py-4 whitespace-nowrap">• {character.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{character.currency}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{character.statistics}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{character.class}</td>
                        </tr>
                    ):(
                        <tr key={index} onClick={() => changeSelectedCharacter(character)}>
                            <td className="px-6 py-4 whitespace-nowrap">{character.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{character.currency}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{character.statistics}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{character.class}</td>
                        </tr>
                    )}
                </>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WorldSelection;
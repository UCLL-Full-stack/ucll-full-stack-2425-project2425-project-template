import userService from '@services/userService';
import playerService from '@services/playerService';
import { useState, useEffect } from 'react';
import { Player, User, World } from '@types';
import worldService from '@services/worldService';
import { useRouter } from 'next/router';
import useInterval from 'use-interval';

const WorldLoading: React.FC = () => {
    const router = useRouter();
    const { worldid } = router.query;
    const [player, setPlayer] = useState<Player>();
    const [world, setWorld] = useState<World>();
    const [floor, setFloor] = useState<number>(0);
    const [timer, setTimer] = useState<number>(0);

    const getWorlds = async () => {
        if (worldid){
            const worlds = await worldService.getWorldById(worldid as string);
            setWorld(worlds);
        }
    }

    const getPlayer = async() => {
        const id = localStorage.getItem("selectedCharacter");
        if (id){
            const res = await playerService.getPlayerById(id);
            setPlayer(res);
        }
    }

    const getFloor = async () => {
        if (player && world){
            let lastFloor = 1;
            world.floors.forEach(floor => {
                floor.positions.forEach(pos => {
                    if (pos.playerID && pos.playerID === player.id){
                        lastFloor = floor.floornumber;
                    }
                })
            })
            setFloor(lastFloor);
        }
    }

    const joinworld = async () => {
        if (world && floor > 0){
            router.push("/game/in/world/" + world.id + "/" + floor);
        }
    }

    useEffect(() => {
        getWorlds();
    }, [timer]);

    useEffect(() => {
        getPlayer();
    }, []);

    useEffect(() => {
        getFloor();
    }, [world, player, timer]);

    useEffect(() => {
        joinworld();
    }, [world, floor, timer]);

    useInterval(() => {
        if (timer >= 10){
            setTimer(0);
        }
        setTimer(timer + 1);
    }, 50);

    return (
        <p>Loading into world...</p>
    );
};

export default WorldLoading;
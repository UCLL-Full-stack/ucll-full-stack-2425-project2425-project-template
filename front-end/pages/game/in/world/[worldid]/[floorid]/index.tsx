import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import worldService from "@services/worldService";
import { World, Floor, Line, Position, Player, PositionUpdate, coordinate, PositionInput } from '@types';
import useInterval from 'use-interval';
import floorService from '@services/floorService';
import playerService from '@services/playerService';

const GameMap: React.FC = () => {
    const router = useRouter();
    const { worldid } = router.query;
    const { floorid } = router.query;

    const [update, setUpdate] = useState(0);
    const [world, setWorld] = useState<World | null>(null);
    const [floor, setFloor] = useState<Floor | null>(null);
    const [playerPosition, setPlayerPosition] = useState<coordinate | null>(null);
    const [positions, setPositions] = useState<Position[]>([]);
    const [player, setPlayer] = useState<Player | null>(null);
    const [lastMoveTime, setLastMoveTime] = useState<number>(0);
    const [spawnedIn, setSpawnedIn] = useState<boolean>(false);
    const [isBeyondLastFloor, setBeyondLastFloor] = useState<boolean>(false);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (floor && player){
                event.preventDefault();
                const prev = playerPosition;
                console.log(prev)
                if (!prev){
                    return;
                }
                const res: PositionUpdate = {posID: prev.posID, floorID: floor.id, playerID: player.id, x: prev.x, y: prev.y, active: false};
                floorService.updatePosition(res);
                event.returnValue = 'are you sure...';
            }
        };
    
        window.addEventListener('beforeunload', handleBeforeUnload);
    
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        if (floor && player && positions && !spawnedIn){
            let gotPos = false;
            positions.forEach(pos => {
                if (pos.type === "player"){
                    if (pos.playerID === player.id){
                        const res: PositionUpdate = {posID: pos.id, floorID: floor.id, playerID: player.id, x: pos.x, y: pos.y, active: true};
                        floorService.updatePosition(res);
                        setPlayerPosition({x: pos.x, y: pos.y, posID: pos.id});
                        gotPos = true;
                        setSpawnedIn(true);
                    }
                }
            });
            if (!gotPos){
                const newPos : PositionInput = {playerID: player.id, floorID: floor.id, x: 10, y: 10, type: "player", active: true};
                floorService.addPosition(newPos);
                setSpawnedIn(true);
            }
        }
    }, [floor, update])

    useEffect(() => {
        getWorld();
        getFloor();
        getPlayer();
    }, [worldid, floorid]);

    const getWorld = async () => {
        if (worldid) {
            const result = await worldService.getWorldById(worldid as string)
            setWorld(result);
            setPositions(result.positions);
        }
    }

    const getFloor = async() => {
        if (floorid && world && world.floors){
            let outOfFloors = true;
            world.floors.forEach(aFloor => {
                if (aFloor.floornumber === parseInt(floorid as string)){
                    setFloor(aFloor);
                    outOfFloors = false;
                }
            });
            setBeyondLastFloor(outOfFloors)
        }
    }

    const getPositions = async() => {
        if (floor){
            const res = await floorService.getFloorPositions(floor.id);
            setPositions(res);
            res.forEach(pos => {
                if (pos.type === "player" && pos.active === true){
                    if (pos.playerID === player?.id){
                        setPlayerPosition({x: pos.x, y: pos.y, posID: pos.id});
                    }
                }
            });
        }
    }

    const getPlayer = async() => {
        const id = localStorage.getItem("selectedCharacter");
        if (id){
            const res = await playerService.getPlayerById(id);
            setPlayer(res);
        }
    }

    const leaveGame = async() => {
        if (floor && player){
            const prev = playerPosition;
            if (!prev){
                return;
            }
            const res: PositionUpdate = {posID: prev.posID, floorID: floor.id, playerID: player.id, x: prev.x, y: prev.y, active: false};
            await floorService.updatePosition(res);
            router.push("/game");
        }
    }

    const checkEvent = (position: coordinate) => {
        positions.forEach(pos => {
            if (pos.x === position.x && pos.y === position.y && pos.active){
                if (pos.type === "stairdown"){
                    changeFloor(1)
                    return true;
                }
                if (pos.type === "stairup"){
                    changeFloor(-1)
                    return true;
                }
            }
        })
        return false;
    }

    const changeFloor = async (difference: number) => {
        if (floorid && floor && player){
            const prev = playerPosition;
            if (!prev){
                return;
            }
            const res: PositionUpdate = {posID: prev.posID, floorID: floor.id, playerID: player.id, x: prev.x, y: prev.y, active: false};
            await floorService.updatePosition(res);
            const toFloor = +floorid + difference;
            router.replace("/game/in/world/" + worldid + "/" + toFloor).then(() => router.reload());
        }
    }

    useInterval(() => {
        if (update >= 10){
            setUpdate(0);
        }
        setUpdate(update + 1);
    }, 100);

    useEffect(() => {
        getFloor();
        getPlayer();
        getPositions();
    }, [update]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const now = Date.now();
            if (now - lastMoveTime < 200){
                return;
            }
            setLastMoveTime(now);

            const prev = playerPosition;
            if (!prev){
                return;
            }
            
            let newPosition = prev;
            switch (e.key) {
                case 'ArrowUp':
                    newPosition = { x: prev.x, y: prev.y - 1, posID: prev.posID};
                    break;
                case 'ArrowDown':
                    newPosition = { x: prev.x, y: prev.y + 1, posID: prev.posID};
                    break;
                case 'ArrowLeft':
                    newPosition = { x: prev.x - 1, y: prev.y, posID: prev.posID };
                    break;
                case 'ArrowRight':
                    newPosition = { x: prev.x + 1, y: prev.y, posID: prev.posID };
                    break;
                default:
                    return prev;
            }
            if (floor && player){
                if (!checkEvent(newPosition)){
                    const res: PositionUpdate = {posID: newPosition.posID, floorID: floor.id, playerID: player.id, x: newPosition.x, y: newPosition.y, active: true};
                    floorService.updatePosition(res);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [floor, player]);

    if (isBeyondLastFloor){
        return (
            <div className="flex flex-col">
                <p className="text-center m-6">You completed this world!</p>
                <button
                    onClick={() => router.push("/game")}
                    className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 text-center m-6"
                >
                    Leave
                </button>
            </div>
        )
    }

    if (!floor) {
        return <div className="text-center">Loading Floor...</div>;
    }

    if (!player) {
        return <div className="text-center"><p>Loading Player...</p><p>If loading takes too long, try logging in or selecting character.</p></div>;
    }


    if (!playerPosition) {
        return <div className="text-center">Spawning Player...</div>;
    }

    return (
        <div className="relative overflow-hidden w-screen h-screen bg-black">
            <div
            className="absolute transform"
            style={{
                top: `calc(50% - ${(playerPosition.y + 0.5) * 64}px)`,
                left: `calc(50% - ${(playerPosition.x + 0.5) * 64}px)`
            }}
            >
                {floor.tiles.map((line, lineIndex) => (
                <div key={lineIndex} className="flex">
                    {line.tiles.map((tile, tileIndex) => (
                    <div
                        key={tileIndex}
                        className="w-16 h-16"
                        style={{
                            backgroundImage: `url(/images/${tile}.png)`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                    ))}
                </div>
                ))}

                {positions && positions.map((pos, posIndex) => (
                    pos.active ? (
                        <div
                            key={pos.id}
                            className="absolute w-16 h-16"
                            style={{
                                top: `${pos.y * 64}px`,
                                left: `${pos.x * 64}px`,
                                backgroundImage: `url(/images/${pos.type}.png)`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                        ></div>
                    ):(<></>)
                ))}
            </div>

            <div
                className="absolute w-16 h-16"
                style={{
                    top: `calc(50% - 32px)`,
                    left: `calc(50% - 32px)`,
                    backgroundImage: 'url(/images/character.png)',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }}
            ></div>

            <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button
                    onClick={leaveGame}
                    className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600"
                >
                    Leave
                </button>
            </div>
        </div>
    );
};

export default GameMap;
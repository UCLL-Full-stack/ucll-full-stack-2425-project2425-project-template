import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'tailwindcss/tailwind.css';
import worldService from "@services/worldService";
import { World, Floor, Line, Position } from '@types';
import useInterval from 'use-interval';
import floorService from '@services/floorService';

const GameMap: React.FC = () => {
    const router = useRouter();
    const { worldid } = router.query;
    const { floorid } = router.query;

    const [update, setUpdate] = useState(0);
    const [world, setWorld] = useState<World | null>(null);
    const [floor, setFloor] = useState<Floor | null>(null);
    const [playerPosition, setPlayerPosition] = useState({ x: 10, y: 10 });
    const [positions, setPositions] = useState<Position[]>([]);

    useEffect(() => {
        getWorld();
        getFloor();
    }, [worldid, floorid]);

    const getWorld = async () => {
        if (worldid) {
            const result = await worldService.getWorldById(worldid as string)
            setWorld(result);
            setPositions(result.positions);
        }
    }

    const getFloor = async() => {
        if (floorid){
            world?.floors.forEach(aFloor => {
                if (aFloor.floornumber === parseInt(floorid as string)){
                    setFloor(aFloor);
                }
            });
        }
    }

    const getPositions = async() => {
        if (floor){
            const res = await floorService.getFloorPositions(floor.id);
            setPositions(res);
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
        getPositions();
    }, [update]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            setPlayerPosition((prev) => {
                let newPosition = prev;
                switch (e.key) {
                    case 'ArrowUp':
                        newPosition = { x: prev.x, y: prev.y - 1 };
                        break;
                    case 'ArrowDown':
                        newPosition = { x: prev.x, y: prev.y + 1 };
                        break;
                    case 'ArrowLeft':
                        newPosition = { x: prev.x - 1, y: prev.y };
                        break;
                    case 'ArrowRight':
                        newPosition = { x: prev.x + 1, y: prev.y };
                        break;
                    default:
                        return prev;
                }
                console.log(newPosition);
                return newPosition;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (!floor) {
        return <div className="text-center">Loading floor...</div>;
    }

    return (
        <div className="relative overflow-hidden w-screen h-screen">
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
        </div>
    );
};

export default GameMap;
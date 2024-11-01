import { Game } from '../model/game';

const games = [
    new Game({
        id: 1,
        title: "Epic Quest",
        image: "/images/epic-quest.png",
        categories: ["Adventure", "RPG"],
        price: 59.99
    }),

    new Game({
        id: 2,
        title: "Battle Arena",
        image: "/images/battle-arena.png",
        categories: ["Fighting", "Action"],
        price: 39.99
    }),

    new Game({
        id: 3,
        title: "Cyber Assault",
        image: "/images/cyber-assault.png",
        categories: ["FPS", "Action"],
        price: 69.99
    }),

    new Game({
        id: 4,
        title: "Mystic Lands",
        image: "/images/mystic-lands.png",
        categories: ["Adventure", "RPG"],
        price: 49.99
    }),

    new Game({
        id: 5,
        title: "Warriors United",
        image: "/images/warriors-united.png",
        categories: ["Action", "Fighting"],
        price: 44.99
    }),

];

const getAllGames = (): Game[] => games;

const getGameById = ({ id }: { id: number }): Game | null => {
    return games.find((game) => game.getId() === id) || null;
};

export default {
    getAllGames,
    getGameById,
};

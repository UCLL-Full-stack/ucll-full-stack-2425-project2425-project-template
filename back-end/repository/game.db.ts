import { Game } from '../model/game';

const games = [
    new Game({
        id: 1,
        title: "Epic Quest",
        image: "/images/placeholder.png",
        categories: ["Adventure", "RPG"],
        price: 59.99
    }),

    new Game({
        id: 2,
        title: "Battle Arena",
        image: "/images/placeholder.png",
        categories: ["Fighting", "Action"],
        price: 39.99,
        discount: 10
    }),

    new Game({
        id: 3,
        title: "Cyber Assault",
        image: "/images/placeholder.png",
        categories: ["FPS", "Action"],
        price: 69.99
    }),

    new Game({
        id: 4,
        title: "Mystic Lands",
        image: "/images/placeholder.png",
        categories: ["Adventure", "RPG"],
        price: 49.99
    }),

    new Game({
        id: 5,
        title: "Warriors United",
        image: "/images/placeholder.png",
        categories: ["Action", "Fighting"],
        price: 44.99,
        discount: 25
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

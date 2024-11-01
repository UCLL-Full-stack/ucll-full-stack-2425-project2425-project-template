import { Game } from '../model/game';

const libraryGames = [
    new Game({
        id: 1,
        title: "Epic Quest",
        image: "/images/placeholder.png",
        categories: ["Adventure", "RPG"],
        price: 59.99
    })

];

const getAllLibraryGames = (): Game[] => libraryGames;

export default {
    getAllLibraryGames,
};

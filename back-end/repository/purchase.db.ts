import { Game } from '../model/game';
import { Purchase } from '../model/purchase';
import { User } from '../model/user';
import gameDB from '../repository/game.db'
import userDb from './user.db';
import libraryDb from './library.db';

const purchases = [
    new Purchase({
        id: 1,
        date: new Date(1, 1, 2024),
        cost: 59.99,
        user: userDb.getUserById(1)!,
        game: gameDB.getGameById(1)!
    })
];

const getAllPurchases = (): Purchase[] => purchases;

const newPurchase = (user: User, game: Game): Purchase => {
    libraryDb.addGameToLibrary(user.getLibrary(), game);
    return new Purchase({
        id: purchases.length + 1,
        date: new Date(Date.now()),
        cost: game.price,
        user: user,
        game: game
    })
}

export default {
    getAllPurchases,
    newPurchase
};

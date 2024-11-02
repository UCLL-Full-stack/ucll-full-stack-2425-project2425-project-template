import { Game } from '../model/game';
import { Purchase } from '../model/purchase';
import { User } from '../model/user';
import gameDB from '../repository/game.db'
import userDb from './user.db';
import libraryDb from './library.db';

const purchases: Purchase[] = [];

const getAllPurchases = (): Purchase[] => purchases;

const getPurchaseById = (id: number ): Purchase | null => {
    return purchases.find((purchase) => purchase.getId() === id) || null;
};

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
    getPurchaseById,
    newPurchase
};

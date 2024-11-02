import { Game } from '../model/game';
import purchaseDb from '../repository/purchase.db';
import { Purchase } from '../model/purchase';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import gameDb from '../repository/game.db';

const getAllPurchases = (): Purchase[] => purchaseDb.getAllPurchases();

const newPurchase = (userId: number, gameId: number): Purchase => {
    return purchaseDb.newPurchase(userDb.getUserById(userId)!, gameDb.getGameById(gameId)!);
}

export default {
    getAllPurchases,
    newPurchase,
};

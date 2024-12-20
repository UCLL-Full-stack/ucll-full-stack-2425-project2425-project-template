import { Subscription } from "../model/subscription"
import { User } from "../model/user"
import { SubscriptionType } from "../types"
import database from "../util/database"

const getAllUsersBySubscription = async (type: SubscriptionType): Promise<User[]> => {
    try {
        const subscriptions = await database.subscription.findMany({
            where: { type },
            include: { user: true }, 
        });

        const users = subscriptions.map(subscription => subscription.user).filter(user => user !== null);
        return users.map(userPrisma => User.from(userPrisma)); 
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};



export default {
    getAllUsersBySubscription
}
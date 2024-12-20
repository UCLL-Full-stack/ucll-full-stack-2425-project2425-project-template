import { User } from '../model/user';
import { AuthenticationResponse, SubscriptionType, UserInput } from '../types';
import bcrypt from 'bcrypt'
import { generateJwtToken } from '../util/jwt';
import { Subscription } from '../model/subscription';
import subscriptionDb from '../repository/subscription.db';

const getAllUsersBySubscription = async (type: SubscriptionType): Promise<User[]> => subscriptionDb.getAllUsersBySubscription(type);

export default { getAllUsersBySubscription};

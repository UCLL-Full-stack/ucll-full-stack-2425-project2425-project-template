import database from "../util/database";
import { User } from "../model/User";

const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany();
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error)
        throw new Error('Error in database file at getAllUsers')
    }
};

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!userPrisma) {
            return null;
        }
        return User.from(userPrisma);
    }
    catch (error) {
        console.error(error)
        throw new Error('Error in database file at getUserById')
    }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    try { 
        const userPrisma = await database.user.findFirst({
        where: {
            email: email,
        },
        });
        if (!userPrisma) {
            return null;
        }
        return User.from(userPrisma);
    } catch (error) {
        console.error(error)
        throw new Error('Error in database file at getUserByEmail')
    }
}

const getUserByUsername = async (username: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: {
                username: username,
            },
        });
        if (!userPrisma) {
            return null;
        }
        return User.from(userPrisma);
    } catch (error) {
        console.error(error)
        throw new Error('Error in database file at getUserByUsername')
    }
}

const createUser = async ({ username, password, email, firstName, lastName, recipes, reviews}: User): Promise<User> => {
    try { 
        const userPrisma = await database.user.create({
            data: {
                username: username,
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName,
                recipes: {
                    connect: recipes?.map((recipe) => ({ id: recipe.id })),
                },
                reviews: {
                    connect: reviews?.map((review) => ({ id: review.id }))
                },
            },
            include: {
                recipes: {
                    include: { 
                        ingredients: { 
                            include: {
                                ingredient: true, 
                            },
                        },
                        creator: true,
                        reviews: true,
                    },
                },
                reviews: {
                    include: {
                        writer: true,
                        recipe: true,
                    },
                },
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error)
        throw new Error('Error in database file at createUser')
    }
}

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
};

// import database from '../util/database';
// import { User } from '../model/User';

// const users: User[] = [
//     new User({
//         id: 1,
//         username: 'Julie',
//         password: 'examplePassword',
//         email: 'example@example.com',
//         firstName: 'Julie',
//         lastName: 'Lanssens',
//         recipes: [],
//         reviews: [],
//     }),
// ];

// const getAllUsers = (): User[] => {
//     return users;
// };

// const getUserById = (id: number): User => {
//     const user = users.find((user) => user.id === id);
//     if (!user) {
//         throw new Error(`User with id ${id} not found`);
//     }
//     return user;
// };

// const getUserByEmail = (email: string): User | null => {
//     return users.find((user) => user.email === email) || null;
// };

// const getUserByUsername = (username: string): User | null => {
//     return users.find((user) => user.username === username) || null;
// };

// const createUser = (user: User): User => {
//     const newId = users.length > 0 ? (users[users.length - 1]?.id ?? 0) + 1 : 1;
//     const newUser = new User({
//         id: newId,
//         username: user.username,
//         password: user.password,
//         email: user.email,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         recipes: user.recipes,
//         reviews: user.reviews,
//     });
//     users.push(newUser);
//     return newUser;
// };

// export default {
//     getAllUsers,
//     getUserById,
//     getUserByEmail,
//     getUserByUsername,
//     createUser,
// };

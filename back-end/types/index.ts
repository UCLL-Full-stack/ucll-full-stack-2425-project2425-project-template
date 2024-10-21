type itemInput = {
    name: string;
    description: string;
    price?: number;
    urgency?: string | number;
}

type shoppingListInput = {
    ListName?: string;
    items?: itemInput[];
}

type userInput = {
    username: string;
    password: string;
    role: string;
}

type profileInput = {
    email: string;
    name: string;
    lastname: string;
}

export {
    itemInput,
    shoppingListInput,
    userInput,
    profileInput,
    
}
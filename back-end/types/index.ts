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

export {
    itemInput,
    shoppingListInput,
    
}
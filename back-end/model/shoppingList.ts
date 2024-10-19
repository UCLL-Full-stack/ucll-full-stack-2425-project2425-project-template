import Item from "./item";
class ShoppingList {
    private ListName?: string;
    private items?: Array<Item>

    constructor (shoppingList: {ListName?: string, items?: Array<Item>}) {
        this.validate(shoppingList)

        this.ListName = shoppingList.ListName?.trim() || "General list";
        this.items = shoppingList.items || [];
    };

    private validate = (shoppingList: {ListName?: string, items?: Array<Item>}) => {
        if (shoppingList.ListName == undefined) {
            this.items = []
        }
        else if (typeof shoppingList.ListName !== 'string' || shoppingList.ListName.trim() === '' || shoppingList.ListName.length > 40) {
            throw new Error('Invalid ListName value');
        };

        if (shoppingList.items == undefined) {

        }
        else if (!Array.isArray(shoppingList.items)) {
            throw new Error('Invalid items value');
        };

        if (shoppingList.items) {
            for (const item of shoppingList.items) {
                if (!(item instanceof Item)) {
                    throw new Error('Invalid item in items array');
                }
            }
        };
    }

    getListName = (): string => {
        return this.ListName!;
    };

    getListItems = (): Array<Item> => {
        return this.items!;
    };

    addItem = (item: Item): void => {
        if (!(item instanceof Item)) {
            throw new Error('Invalid item');
        }
        this.items!.push(item);
    };

    removeItem = (name: string): void => {
        this.items = this.items!.filter(item => item.getName() !== name);
    };

    /* not needed implement in service 
    buyItem = (name: string): void => {
        const item = this.items!.find(item => item.getName() === name);
        if (item) {
            this.removeItem(name);
        } else {
            throw new Error('Item not found');
        }
    }*/
};

export default ShoppingList;
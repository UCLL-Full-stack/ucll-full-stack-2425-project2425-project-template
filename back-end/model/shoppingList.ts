import { Item } from "./item";
import { User } from "./user";

export class ShoppingList {
    private items: Item[];
    private name: string;
    private creationDate: Date;
    private lastUpdate: Date;
    private updatedBy: User;

    constructor(shoppingList: {name: string, creationDate: Date, lastUpdate: Date, updatedBy: User}) {
        this.validate(shoppingList);

        this.name = shoppingList.name;
        this.creationDate = shoppingList.creationDate;
        this.lastUpdate = shoppingList.lastUpdate;
        this.updatedBy = shoppingList.updatedBy;
        this.items = [];
    }

    validate(shoppingList: {name: string, creationDate: Date, lastUpdate: Date, updatedBy: User}) {
        if (!shoppingList.name || shoppingList.name.trim().length < 1) {
            throw new Error("Item name must not empty.");
        }

        if (shoppingList.creationDate.getTime() > Date.now()) {
            throw new Error("The creation date can't be before today's date.");
        }

        if (shoppingList.lastUpdate.getTime() > Date.now()) {
            throw new Error("The last update can't be in the future.");
        }

        if (shoppingList.lastUpdate.getTime() < shoppingList.creationDate.getTime()) {
            throw new Error("The last update can't occur before the creation date.");
        }
    }

    addItem(item: Item) {
        this.items.push(item);
    }

    getItems(): Item[] {
        return this.items;
    }

    getName(): string {
        return this.name;
    }

    getCreationDate(): Date {
        return this.creationDate;
    }

    getLastUpdate(): Date {
        return this.lastUpdate;
    }

    setLastUpdateToNow() {
        this.lastUpdate = new Date();
    }

    getUpdatedBy(): User {
        return this.updatedBy;
    }

    setUpdatedBy(user: User) {
        this.updatedBy = user;
    }
}
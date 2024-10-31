export class Privilege {
    private readonly _id?: number; // This is optional
    private readonly _name: string;
    private readonly _description: string;

    constructor(privilege: { id?: number; name: string; description: string }) { // 'id' is optional here
        this.validate(privilege);
        this._id = privilege.id;
        this._name = privilege.name;
        this._description = privilege.description;
    }

    validate(privilege: { name: string; description: string }) {
        if (!privilege.name || privilege.name.length === 0) {
            throw new Error("Name is required.");
        }
        if (!privilege.description || privilege.description.length === 0) {
            throw new Error("Description is required.");
        }
    }

    get id(): number | undefined {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }
}

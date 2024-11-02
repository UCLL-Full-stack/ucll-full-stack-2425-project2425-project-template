export class Appliance {
    private _applianceId?: number
    private _name: string
    private _description: string
    private _created_at: Date
    private _updated_at: Date | undefined

    constructor(appliance: {
        applianceId?: number,
        name: string,
        description: string,
        created_at: Date,
        updated_at?: Date
    }) {
        this._applianceId = appliance.applianceId
        this._name = appliance.name
        this._description = appliance.description
        this._created_at = appliance.created_at
        this._updated_at = appliance.updated_at
    }

    public getApplianceId(): number | undefined {
        return this._applianceId
    }

    //no setter of applianceId it will be set by the DB

    public getName(): string {
        return this._name
    }

    public setName(name: string): void {
        this._name = name
    }

    public getDescription(): string {
        return this._description
    }

    public setDescription(description: string): void {
        this._description = description
    }

    public getCreatedAt(): Date {
        return this._created_at;
    }

    public setCreatedAt(createAt: Date): void {
        this._created_at = createAt
    }

    public getUpdatedAt(): Date | undefined {
        return this._updated_at
    }

    public setUpdateAt(updatedAt: Date): void {
        this._updated_at = updatedAt;
    }

    equals(appliance: Appliance): boolean {
        return (
            this._name === appliance.getName() &&
            this._description === appliance.getDescription() &&
            this._created_at === appliance.getCreatedAt() &&
            this._updated_at === appliance.getUpdatedAt()
        )
    }
}
export class ISP {
    private _id: number;
    private _status: string;
    private _totalCredits: number;
    private _year: number;

    constructor(isp: { id: number; status: string; totalCredits: number; year: number }) {
        this._id = isp.id;
        this._status = isp.status;
        this._totalCredits = isp.totalCredits;
        this._year = isp.year;
    }

    public get id(): number {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get status(): string {
        return this._status;
    }

    public set status(value: string) {
        this._status = value;
    }

    public get totalCredits(): number {
        return this._totalCredits;
    }

    public set totalCredits(value: number) {
        this._totalCredits = value;
    }

    public get year(): number {
        return this._year;
    }

    public set year(value: number) {
        this._year = value;
    }

    public equals(isp: ISP): boolean {
        return (
            this.id === isp.id &&
            this.status === isp.status &&
            this.totalCredits === isp.totalCredits &&
            this.year === isp.year
        );
    }
}
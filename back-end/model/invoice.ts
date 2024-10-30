import { ISP } from "./isp";

export class Invoice {
    private _id?: number;
    private _totalAmount: number;
    private _deadline: Date;
    private _paidAmount?: number;
    private _isp: ISP;

    constructor(invoice: {
        id: number;
        totalAmount: number;
        deadline: Date;
        paidAmount?: number;
        isp: ISP;
    }) {
        this._id = invoice.id;
        this._totalAmount = invoice.totalAmount;
        this._deadline = invoice.deadline;
        this._paidAmount = invoice.paidAmount||0;
        this._isp = invoice.isp;
    }

    public get id(): number|undefined {
        return this._id;
    }

    public set id(value: number) {
        this._id = value;
    }

    public get totalAmount(): number {
        return this._totalAmount;
    }

    public set totalAmount(value: number) {
        if (!value || value < 0 ){
            throw new Error("Total amount cannot be negative.")
        }
        this._totalAmount = value;
    }

    public get deadline(): Date {
        return this._deadline;
    }

    public set deadline(value: Date) {
        if (!value){
            throw new Error("Deadline is required.")
        }
        this._deadline = value;
    }

    public get paidAmount(): number | undefined {
        return this._paidAmount;
    }

    public set paidAmount(value: number | undefined) {
        if (!value || value < 0 ){
            throw new Error("Paid amount cannot be negative.")
        }
        this._paidAmount = value;
    }

    public get isp(): ISP {
        return this._isp;
    }

    public set isp(value: ISP) {
        if (!value){
            throw new Error("ISP is required.")
        }
        this._isp = value;
    }

    public equals(invoice: Invoice): boolean {
        return (
            this.id === invoice.id &&
            this.totalAmount === invoice.totalAmount &&
            this.deadline.getTime() === invoice.deadline.getTime() &&
            this.paidAmount === invoice.paidAmount&&
            this.isp === invoice.isp
        );
    }
}

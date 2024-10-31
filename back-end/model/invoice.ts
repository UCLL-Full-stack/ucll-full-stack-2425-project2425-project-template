import { ISP } from "./isp";

export class Invoice {
    private readonly _id?: number;
    private readonly _totalAmount: number;
    private readonly _deadline: Date;
    private readonly _paidAmount?: number;
    private readonly _isp: ISP;

    constructor(invoice: {
        id: number;
        totalAmount: number;
        deadline: Date;
        paidAmount?: number;
        isp: ISP;
    }) {
        this.validate(invoice);
        this._id = invoice.id;
        this._totalAmount = invoice.totalAmount;
        this._deadline = invoice.deadline;
        this._paidAmount = invoice.paidAmount||0;
        this._isp = invoice.isp;
    }

    validate(invoice: {totalAmount: number; deadline: Date; paidAmount?: number; isp: ISP;}) {
        if (!invoice.totalAmount || invoice.totalAmount < 0 ){
            throw new Error("Total amount cannot be negative.")
        }
        if (!invoice.deadline){
            throw new Error("Deadline is required.")
        }
        if (!invoice.paidAmount ||invoice.paidAmount < 0 ){
            throw new Error("Paid amount cannot be negative.")
        }
        if (!invoice.isp){
            throw new Error("ISP is required.")
        }
    }

    public get id(): number|undefined {
        return this._id;
    }

    public get totalAmount(): number {
        return this._totalAmount;
    }

    public get deadline(): Date {
        return this._deadline;
    }

    public get paidAmount(): number | undefined {
        return this._paidAmount;
    }

    public get isp(): ISP {
        return this._isp;
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

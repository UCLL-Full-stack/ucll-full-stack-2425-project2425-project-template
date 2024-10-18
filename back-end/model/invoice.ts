export class Invoice{
    private id: number;
    private totalAmount : number;
    private deadline : Date;
    private paidAmount? : number;

    constructor(invoice: { id: number; totalAmount: number; deadline: Date; paidAmount?: number }) {
        this.id = invoice.id;
        this.totalAmount = invoice.totalAmount;
        this.deadline = invoice.deadline;
        this.paidAmount = invoice.paidAmount;
    }

    public getId(): number {
        return this.id;
    }

    public getTotalAmount(): number {
        return this.totalAmount;
    }

    public getDeadline(): Date {
        return this.deadline;
    }

    public getPaidAmount(): number | undefined {
        return this.paidAmount;
    }

    public equals(invoice: Invoice): boolean {
        return (
            this.getId() === invoice.getId() &&
            this.getTotalAmount() === invoice.getTotalAmount() &&
            this.getDeadline().getTime() === invoice.getDeadline().getTime() &&
            this.getPaidAmount() === invoice.getPaidAmount()
        );
    }
}
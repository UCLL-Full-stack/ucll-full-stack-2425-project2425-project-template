export class ISP{
    private id: number;
    private status: string;
    private totalCredits: number;
    private year: number;

    constructor(isp: { id: number; status: string; totalCredits: number; year: number }) {
        this.id = isp.id;
        this.status = isp.status;
        this.totalCredits = isp.totalCredits;
        this.year = isp.year;
    }

    public getId(): number {
        return this.id;
    }

    public getStatus(): string {
        return this.status;
    }

    public getTotalCredits(): number {
        return this.totalCredits;
    }

    public getYear(): number {
        return this.year;
    }

    public equals(isp: ISP): boolean {
        return (
            this.getId() === isp.getId() &&
            this.getStatus() === isp.getStatus() &&
            this.getTotalCredits() === isp.getTotalCredits() &&
            this.getYear() === isp.getYear()
        );
    }
}
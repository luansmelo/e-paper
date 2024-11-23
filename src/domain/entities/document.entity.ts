export class Document {
    id: string;
    name?: string;
    origin: string;
    type: string;
    issuer?: string;
    totalTaxValue?: number;
    netValue?: number;
    fileUrl?: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(
        id: string,
        name: string,
        origin: string,
        type: string,
        issuer: string,
        totalTaxValue: number,
        netValue: number,
        createdAt: Date,
        updatedAt: Date,
    ) {
        this.id = id;
        this.name = name;
        this.origin = origin;
        this.type = type;
        this.issuer = issuer;
        this.totalTaxValue = totalTaxValue;
        this.netValue = netValue;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

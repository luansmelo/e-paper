export class Document {
    id!: string;
    name?: string;
    origin!: string;
    type!: string;
    issuer?: string;
    totalTaxValue?: number;
    netValue?: number;
    fileUrl?: string;
    createdAt!: Date;
    updatedAt!: Date;

    constructor(data: Partial<Document>) {
        Object.assign(this, {
            id: '',
            name: '',
            origin: '',
            type: '',
            issuer: '',
            totalTaxValue: 0,
            netValue: 0,
            fileUrl: '',
            createdAt: new Date(),
            updatedAt: new Date(),
            ...data,
        });
    }
}

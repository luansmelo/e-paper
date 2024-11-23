export class Document {
    id!: string;
    name!: string | null;
    origin!: string;
    type!: string;
    issuer!: string | null;
    totalTaxValue!: number | null;
    netValue!: number | null;
    fileUrl!: string | null;
    createdAt!: Date | null;
    updatedAt!: Date | null;

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

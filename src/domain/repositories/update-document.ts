import { Document } from "../entities/document.entity";

export abstract class UpdateDocumentByIdRepository {
    abstract updateById(id:string, document: Partial<Document>): Promise<Document>
}
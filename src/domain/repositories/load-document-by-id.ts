import { Document } from "../entities/document.entity";

export abstract class LoadDocumentByIdRepository {
    abstract loadById(id: string): Promise<Document | null>
}
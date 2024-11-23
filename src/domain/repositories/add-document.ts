import { AddDocumentDto } from "src/application/dtos/request/add-document.dto";
import { Document } from "../entities/document.entity";

export abstract class AddDocumentRepository {
    abstract add(document: AddDocumentDto): Promise<Document>
}
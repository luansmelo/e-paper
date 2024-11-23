import { AddDocumentDto } from "@/application/dtos";
import { Document } from "../entities/document.entity";

export abstract class AddDocumentRepository {
    abstract add(document: AddDocumentDto): Promise<Document>
}
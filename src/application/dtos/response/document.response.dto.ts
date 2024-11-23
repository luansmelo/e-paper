import { Document } from "src/domain/entities/document.entity";

export class DocumentResponse {
    data: Document[];
    totalPages: number;
    totalItems: number;
}
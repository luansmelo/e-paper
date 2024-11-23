import { Document } from "@/domain/entities/document.entity";
export class DocumentResponse {
    data: Document[] = []
    totalPages: number = 0;
    totalItems: number = 0;
}
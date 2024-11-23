import { Document } from "@/domain/entities/document.entity";
import { LoadDocumentByIdRepository } from "@/domain/repositories/load-document-by-id";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class LoadDocumentUseCase {
    constructor(private readonly repository: LoadDocumentByIdRepository) { }

    async execute(id: string): Promise<Document> {
        const document = await this.repository.loadById(id);

        if (!document) {
            throw new NotFoundException("Document not found");
        }

        return document;
    }
}

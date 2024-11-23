import { LoadDocumentsRepository } from "@/domain/repositories/load-documents";
import { Injectable } from "@nestjs/common";
import { DocumentFilter } from "../dtos/request";
import { DocumentResponse } from "../dtos";

@Injectable()
export class LoadDocumentsUseCase {
    constructor(private readonly repository: LoadDocumentsRepository) { }

    async execute(filter: DocumentFilter): Promise<DocumentResponse> {
        const document = await this.repository.loadAll(filter);
        return document;
    }
}

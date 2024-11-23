import { AddDocumentRepository } from "@/domain/repositories/add-document";
import { Injectable } from "@nestjs/common";
import { Document } from "@/domain/entities/document.entity";
import { AddDocumentDto } from "../dtos";

@Injectable()
export class AddDocumentUseCase {
    constructor(private readonly repository: AddDocumentRepository) { }

    async execute(input: AddDocumentDto): Promise<Document> {
        const document = await this.repository.add(input);
        return document;
    }
}

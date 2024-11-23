import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateDocumentDto } from '../dtos/request/update-document.dto';
import { UpdateDocumentByIdRepository } from '@/domain/repositories/update-document';
import { LoadDocumentByIdRepository } from '@/domain/repositories/load-document-by-id';
import { Document } from '@/domain/entities/document.entity';

@Injectable()
export class UpdateDocumentUseCase {
    constructor(
        private readonly repository: UpdateDocumentByIdRepository,
        private readonly load: LoadDocumentByIdRepository,
    ) { }

    async execute(id: string, updates: UpdateDocumentDto): Promise<Document> {
        const document = await this.load.loadById(id);

        if (!document) {
            throw new NotFoundException("Document not found");
        }

        return await this.repository.updateById(id, updates);
    }
}

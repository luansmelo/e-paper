import { InMemoryDocumentRepository } from '@/infrastructure/database/in-memory/repositories/in-memory.document.repository';
import { UpdateDocumentUseCase } from '../../update-document.usecase';
import { NotFoundException } from '@nestjs/common';

describe('UpdateDocumentUseCase', () => {
    let useCase: UpdateDocumentUseCase;
    let repository: InMemoryDocumentRepository;

    beforeEach(() => {
        repository = new InMemoryDocumentRepository();
        useCase = new UpdateDocumentUseCase(repository, repository);
    });

    it('should update a document successfully', async () => {
        const document = await repository.add({ origin: 'system', type: 'report' });
        const updates = { type: 'updated-type' };

        await new Promise((resolve) => setTimeout(resolve, 1));

        const result = await useCase.execute(document.id, updates);

        expect(result.type).toEqual(updates.type);
        expect(new Date(result.updatedAt!).getTime()).toBeGreaterThan(new Date(document.updatedAt!).getTime());
    });

    it('should throw NotFoundException if document is not found', async () => {
        await expect(useCase.execute('invalid-id', {})).rejects.toThrow(NotFoundException);
    });
});

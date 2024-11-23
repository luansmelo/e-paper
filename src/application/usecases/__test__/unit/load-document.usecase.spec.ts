import { InMemoryDocumentRepository } from '@/infrastructure/database/in-memory/repositories/in-memory.document.repository';
import { LoadDocumentUseCase } from '../../load-document.usecase';
import { NotFoundException } from '@nestjs/common';

describe('LoadDocumentUseCase', () => {
    let useCase: LoadDocumentUseCase;
    let repository: InMemoryDocumentRepository;

    beforeEach(() => {
        repository = new InMemoryDocumentRepository();
        useCase = new LoadDocumentUseCase(repository);
    });

    it('should load a document by ID', async () => {
        const document = await repository.add({ origin: 'system', type: 'report' });

        const result = await useCase.execute(document.id);

        expect(result).toEqual(document);
    });

    it('should throw NotFoundException if document is not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(NotFoundException);
    });
});

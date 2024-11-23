import { InMemoryDocumentRepository } from '@/infrastructure/database/in-memory/repositories/in-memory.document.repository';
import { LoadDocumentsUseCase } from '../../load-documents.usecase';

describe('LoadDocumentsUseCase', () => {
    let useCase: LoadDocumentsUseCase;
    let repository: InMemoryDocumentRepository;

    beforeEach(() => {
        repository = new InMemoryDocumentRepository();
        useCase = new LoadDocumentsUseCase(repository);
    });

    it('should load documents with filter', async () => {
        await repository.add({ origin: 'system', type: 'report' });
        await repository.add({ origin: 'user', type: 'invoice' });

        const result = await useCase.execute({ type: 'report', page: 1, pageSize: 10 });

        expect(result.data).toHaveLength(1);
        expect(result.totalItems).toEqual(1);
        expect(result.totalPages).toEqual(1);
    });
});

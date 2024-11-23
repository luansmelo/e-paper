import { InMemoryDocumentRepository } from '@/infrastructure/database/in-memory/repositories/in-memory.document.repository';
import { DeleteDocumentUseCase } from '../../delete-document.usecase';
import { NotFoundException } from '@nestjs/common';

jest.mock('@/config/multer-s3.config', () => ({
    s3: {
        send: jest.fn().mockResolvedValue({}),
    },
}));

describe('DeleteDocumentUseCase', () => {
    let useCase: DeleteDocumentUseCase;
    let repository: InMemoryDocumentRepository;

    beforeEach(() => {
        repository = new InMemoryDocumentRepository();
        useCase = new DeleteDocumentUseCase(repository, repository);
    });

    it('should delete a document successfully', async () => {
        const document = await repository.add({ origin: 'system', type: 'report' });

        await useCase.execute(document.id);

        expect(await repository.loadById(document.id)).toBeNull();
    });

    it('should throw NotFoundException if document is not found', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(NotFoundException);
    });
});

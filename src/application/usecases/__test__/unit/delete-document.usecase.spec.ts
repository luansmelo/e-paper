import { s3 } from "@/config/multer-s3.config";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { DeleteDocumentUseCase } from "../../delete-document.usecase";
import { NotFoundException } from "@nestjs/common";
import { InMemoryDocumentRepository } from "@/infrastructure/database/in-memory/repositories/in-memory.document.repository";

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

    it('should delete a document without calling S3 if fileUrl does not exist', async () => {
        const document = await repository.add({
            origin: 'system',
            type: 'report',
        });

        await useCase.execute(document.id);

        expect(await repository.loadById(document.id)).toBeNull();
        expect(jest.mocked(s3.send)).not.toHaveBeenCalled();
    });

    it('should delete a document and its associated file if fileUrl exists', async () => {
        const document = await repository.add({
            origin: 'system',
            type: 'report',
        });

        document.fileUrl = 'http://localhost/bucket/old-file.pdf';

        await useCase.execute(document.id);

        expect(await repository.loadById(document.id)).toBeNull();
        expect(jest.mocked(s3.send)).toHaveBeenCalledWith(
            expect.any(DeleteObjectCommand)
        );
    });

    it('should throw NotFoundException if document does not exist', async () => {
        await expect(useCase.execute('invalid-id')).rejects.toThrow(NotFoundException);
    });

    it('should throw an error if deleting file from S3 fails', async () => {
        jest.mocked(s3.send).mockRejectedValueOnce(new Error('S3 deletion error') as never);

        const document = await repository.add({
            origin: 'system',
            type: 'report',
        });
        document.fileUrl = 'http://localhost/bucket/old-file.pdf';

        await expect(useCase.execute(document.id)).rejects.toThrow('S3 deletion error');
        expect(await repository.loadById(document.id)).not.toBeNull();
    });
})

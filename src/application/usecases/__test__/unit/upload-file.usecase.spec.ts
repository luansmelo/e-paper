import { UploadFileUseCase } from '../../upload-file.usecase';
import { ConfigService } from '@nestjs/config';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { InMemoryDocumentRepository } from '@/infrastructure/database/in-memory/repositories/in-memory.document.repository';
import { NotFoundException } from '@nestjs/common';

jest.mock('@/config/multer-s3.config', () => ({
    s3: {
        send: jest.fn().mockResolvedValue({}),
    },
}));

describe('UploadFileUseCase', () => {
    let useCase: UploadFileUseCase;
    let repository: InMemoryDocumentRepository;
    let config: jest.Mocked<ConfigService>;
    const mockS3 = require('@/config/multer-s3.config').s3;

    beforeEach(() => {
        repository = new InMemoryDocumentRepository();
        config = { get: jest.fn() } as unknown as jest.Mocked<ConfigService>;
        useCase = new UploadFileUseCase(config, repository, repository);
    });

    it('should upload a file and update document', async () => {
        const document = await repository.add({ origin: 'system', type: 'report' });
        const file = { originalname: 'file.pdf', buffer: Buffer.from('data') } as Express.Multer.File;

        config.get.mockReturnValue('bucket');

        const result = await useCase.execute(document.id, file);

        expect(result.fileUrl).toContain('bucket');
    });

    it('should throw NotFoundException if document does not exist', async () => {
        const file = { originalname: 'file.pdf', buffer: Buffer.from('data') } as Express.Multer.File;
        await expect(useCase.execute('non-existent-id', file)).rejects.toThrow(NotFoundException);
    });

    it('should upload a file and update document', async () => {
        const document = await repository.add({ origin: 'system', type: 'report' });
        const file = { originalname: 'file.pdf', buffer: Buffer.from('data') } as Express.Multer.File;

        config.get.mockImplementation((key: string) => {
            if (key === 'MINIO_BUCKET') return 'bucket';
            if (key === 'MINIO_ENDPOINT') return 'http://localhost:9000';
        });

        const result = await useCase.execute(document.id, file);

        expect(result.fileUrl).toContain('http://localhost:9000/bucket/uploads/');
        expect(mockS3.send).toHaveBeenCalledWith(
            expect.any(PutObjectCommand)
        );
    });

    it('should delete old file if document already has a fileUrl', async () => {
        const document = await repository.add({
            origin: 'system',
            type: 'report',
        });

        await repository.updateById(document.id, {
            fileUrl: 'http://localhost:9000/bucket/uploads/old-file.pdf',
        });

        const file = { originalname: 'new-file.pdf', buffer: Buffer.from('new-data') } as Express.Multer.File;

        config.get.mockImplementation((key: string) => {
            if (key === 'MINIO_BUCKET') return 'bucket';
            if (key === 'MINIO_ENDPOINT') return 'http://localhost:9000';
        });

        const result = await useCase.execute(document.id, file);

        expect(mockS3.send).toHaveBeenCalledWith(expect.any(DeleteObjectCommand));
        expect(mockS3.send).toHaveBeenCalledWith(expect.any(PutObjectCommand));
        expect(result.fileUrl).toContain('http://localhost:9000/bucket/uploads/');
        expect(result.name).toBe('new-file.pdf');
    });
});

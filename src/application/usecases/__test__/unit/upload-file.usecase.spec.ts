import { UploadFileUseCase } from '../../upload-file.usecase';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { InMemoryDocumentRepository } from '@/infrastructure/database/in-memory/repositories/in-memory.document.repository';

jest.mock('@/config/multer-s3.config', () => ({
    s3: {
        send: jest.fn().mockResolvedValue({}),
    },
}));

describe('UploadFileUseCase', () => {
    let useCase: UploadFileUseCase;
    let repository: InMemoryDocumentRepository;
    let config: jest.Mocked<ConfigService>;

    beforeEach(() => {
        repository = new InMemoryDocumentRepository();
        config = { get: jest.fn() } as unknown as jest.Mocked<ConfigService>;
        useCase = new UploadFileUseCase(config, repository);
    });

    it('should upload a file and update document', async () => {
        const document = await repository.add({ origin: 'system', type: 'report' });
        const file = { originalname: 'file.pdf', buffer: Buffer.from('data') } as Express.Multer.File;

        config.get.mockReturnValue('bucket');

        const result = await useCase.execute(document.id, file);

        expect(result.fileUrl).toContain('bucket');
    });
});

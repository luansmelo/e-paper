import { InMemoryDocumentRepository } from '@/infrastructure/database/in-memory/repositories/in-memory.document.repository';
import { AddDocumentDto } from 'src/application/dtos/request/add-document.dto';
import { AddDocumentUseCase } from '../../add-document.usecase';

describe('AddDocumentUseCase', () => {
  let repository: InMemoryDocumentRepository;
  let useCase: AddDocumentUseCase;

  beforeEach(() => {
    repository = new InMemoryDocumentRepository();
    useCase = new AddDocumentUseCase(repository);
  });

  it('should add a document successfully', async () => {
    const dto: AddDocumentDto = { type: 'report', origin: 'system' };

    const result = await useCase.execute(dto);

    expect(result).toMatchObject(dto);
    expect(repository.loadById(result.id)).resolves.toEqual(result);
  });
});

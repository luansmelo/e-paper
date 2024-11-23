import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { AddDocumentRepository } from 'src/domain/repositories/add-document';
import { DrizzleDocumentRepositoryImpl } from '../database/drizzle/repositories/document.repository.impl';
import { AddDocumentUseCase } from 'src/application/usecases/add-document.usecase';
import { UploadFileUseCase } from 'src/application/usecases/upload-file.usecase';
import { LoadDocumentUseCase } from 'src/application/usecases/load-document.usecase';
import { LoadDocumentByIdRepository } from 'src/domain/repositories/load-document-by-id';
import { LoadDocumentsUseCase } from 'src/application/usecases/load-documents.usecase';
import { LoadDocumentsRepository } from 'src/domain/repositories/load-documents';
import { DeleteDocumentRepository } from 'src/domain/repositories/delete-document';
import { DeleteDocumentUseCase } from 'src/application/usecases/delete-document.usecase';
import { UpdateDocumentUseCase } from 'src/application/usecases/update-document.usecase';
import { UpdateDocumentByIdRepository } from 'src/domain/repositories/update-document';

@Module({
    imports: [DatabaseModule],
    providers: [
        AddDocumentUseCase,
        UploadFileUseCase,
        LoadDocumentUseCase,
        LoadDocumentsUseCase,
        DeleteDocumentUseCase,
        UpdateDocumentUseCase,
        {
            provide: AddDocumentRepository,
            useClass: DrizzleDocumentRepositoryImpl,
        },
        {
            provide: LoadDocumentByIdRepository,
            useClass: DrizzleDocumentRepositoryImpl
        },
        {
            provide: LoadDocumentsRepository,
            useClass: DrizzleDocumentRepositoryImpl,
        },
        {
            provide: DeleteDocumentRepository,
            useClass: DrizzleDocumentRepositoryImpl,
        },
        {
            provide: UpdateDocumentByIdRepository,
            useClass: DrizzleDocumentRepositoryImpl,
        }
    ],
    exports: [AddDocumentUseCase, UpdateDocumentUseCase, UploadFileUseCase, LoadDocumentUseCase, LoadDocumentsUseCase, DeleteDocumentUseCase],
})
export class DocumentModule { }

import { AddDocumentUseCase, DeleteDocumentUseCase, LoadDocumentsUseCase, LoadDocumentUseCase, UpdateDocumentUseCase, UploadFileUseCase } from '@/application';
import { documentContract } from '@/application/contracts/document.contract';
import { AddDocumentDto, DocumentFilter, UpdateDocumentDto } from '@/application/dtos';
import { Controller, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NestControllerInterface, TsRest, TsRestRequest } from '@ts-rest/nest';

@Controller()
export class DocumentController implements NestControllerInterface<typeof documentContract> {
    constructor(
        private readonly addDocumentUseCase: AddDocumentUseCase,
        private readonly uploadDocumentUseCase: UploadFileUseCase,
        private readonly loadDocument: LoadDocumentUseCase,
        private readonly loadDocuments: LoadDocumentsUseCase,
        private readonly deleteUseCase: DeleteDocumentUseCase,
        private readonly updateUseCase: UpdateDocumentUseCase,
    ) { }

    @TsRest(documentContract.createDocument)
    async createDocument(
        @TsRestRequest() { body }: { body: AddDocumentDto }
    ) {
        const data = await this.addDocumentUseCase.execute(body);

        return {
            status: 201 as const,
            body: {
                message: 'Documento criado com sucesso!',
                data,
            },
        };
    }

    @TsRest(documentContract.uploadFile)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @TsRestRequest()
        { params }: { params: { documentId: string } },
        @UploadedFile() file: Express.Multer.File
    ) {
        const data = await this.uploadDocumentUseCase.execute(params.documentId, file);

        return {
            status: 200 as const,
            body: {
                message: 'Arquivo enviado com sucesso!',
                data,
            },
        }
    }

    @TsRest(documentContract.loadById)
    async loadById(@TsRestRequest() { params }: { params: { id: string } }) {
        const data = await this.loadDocument.execute(params.id);
        return { status: 200 as const, body: data }
    }

    @TsRest(documentContract.loadAll)
    async loadAll(
        @TsRestRequest() { query }: { query: DocumentFilter }
    ) {
        const data = await this.loadDocuments.execute(query);
        return {
            status: 200 as const,
            body: {
                data: data.data,
                totalPages: data.totalPages,
                totalItems: data.totalItems,
            },
        }
    }

    @TsRest(documentContract.deleteDocument)
    async deleteDocument(
        @TsRestRequest() { params }: { params: { id: string } }
    ) {
        await this.deleteUseCase.execute(params.id);
        return {
            status: 200 as const,
            body: {
                message: 'Documento removido com sucesso!'
            }
        }
    }

    @TsRest(documentContract.updateDocument)
    async updateDocument(
        @TsRestRequest() { params, body }: {
            params: { id: string }, body: UpdateDocumentDto
        }
    ) {
        const data = await this.updateUseCase.execute(params.id, body);
        return {
            status: 200 as const,
            body: {
                message: 'Arquivo enviado com sucesso!',
                data,
            },
        }
    }
}
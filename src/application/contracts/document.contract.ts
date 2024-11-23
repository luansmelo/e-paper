import { nestControllerContract } from '@ts-rest/nest';
import { initContract } from '@ts-rest/core';
import { Document } from '@/domain/entities/document.entity';
import { AddDocumentDto, DocumentFilter, DocumentResponse, UpdateDocumentDto } from '../dtos';

const c = initContract();

export const documentContract = nestControllerContract({
    createDocument: {
        method: 'POST',
        path: '/document',
        body: c.type<AddDocumentDto>(),
        responses: {
            201: c.type<{ message: string; data: Document }>(),
        },
    },
    uploadFile: {
        method: 'POST',
        path: '/document/upload/:documentId',
        body: c.type<{ file: Express.Multer.File }>(),
        responses: {
            200: c.type<{ message: string; data: Document }>(),
        },
    },
    loadById: {
        method: 'GET',
        path: '/document/:id',
        responses: {
            200: c.type<Document>(),
        },
    },
    loadAll: {
        method: 'GET',
        path: '/document',
        query: c.type<DocumentFilter>(),
        responses: {
            200: c.type<DocumentResponse>(),
        },
    },
    deleteDocument: {
        method: 'DELETE',
        path: '/document/:id',
        responses: {
            200: c.type<null>(),
        },
    },
    updateDocument: {
        method: 'PATCH',
        path: '/document/:id',
        body: c.type<UpdateDocumentDto>(),
        responses: {
            200: c.type<{ message: string; data: Document }>(),
        },
    },
});

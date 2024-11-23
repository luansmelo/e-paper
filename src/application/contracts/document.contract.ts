import { initContract } from '@ts-rest/core';
import { AddDocumentSchema, DocumentFilterSchema, UpdateDocumentSchema, DocumentSchema } from '../schemas/document.schema';
import { z } from 'zod';

const c = initContract();

export const documentContract = c.router({
    createDocument: {
        method: 'POST',
        path: '/document',
        body: AddDocumentSchema,
        responses: {
            201: z.object({
                message: z.string(),
                data: DocumentSchema,
            })
        },
        summary: 'Criar um novo documento',
    } as const,
    uploadFile: {
        method: 'POST',
        path: '/document/upload/:documentId',
        contentType: 'multipart/form-data',
        body: z.object({
            file: z.instanceof(Buffer).or(z.any()).openapi({
                type: 'string',
                format: 'binary',
                description: 'Arquivo a ser enviado',
            }),
        }),
        responses: {
            200: z.object({
                message: z.string(),
                data: DocumentSchema,
            })
        },
        summary: 'Subir um arquivo para o documento',
    },
    loadById: {
        method: 'GET',
        path: '/document/:id',
        responses: {
            200: DocumentSchema,
            404: z.object({
                message: z.string()
            })
        },
        summary: 'Listar um documento pelo indentificador',
    },
    loadAll: {
        method: 'GET',
        path: '/document',
        query: DocumentFilterSchema,
        responses: {
            200: z.object({
                data: z.array(DocumentSchema),
                totalPages: z.number(),
                totalItems: z.number()
            }),
        },
        summary: 'Listar todos os documentos'
    },
    deleteDocument: {
        method: 'DELETE',
        path: '/document/:id',
        responses: {
            200: z.object({
                message: z.string()
            }),
        },
        summary: 'Excluir um documento',
    },
    updateDocument: {
        method: 'PATCH',
        path: '/document/:id',
        body: UpdateDocumentSchema,
        responses: {
            200: z.object({
                message: z.string(),
                data: DocumentSchema,
            })
        },
        summary: 'Atualizar um documento',
    },
});

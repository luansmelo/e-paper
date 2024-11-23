import { DocumentResponse } from '@/application/dtos';
import { AddDocumentDto, DocumentFilter } from '@/application/dtos/request';
import { Document } from '@/domain/entities/document.entity';
import { AddDocumentRepository } from '@/domain/repositories/add-document';
import { DeleteDocumentRepository } from '@/domain/repositories/delete-document';
import { LoadDocumentByIdRepository } from '@/domain/repositories/load-document-by-id';
import { LoadDocumentsRepository } from '@/domain/repositories/load-documents';
import { UpdateDocumentByIdRepository } from '@/domain/repositories/update-document';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class InMemoryDocumentRepository
  implements
  AddDocumentRepository,
  LoadDocumentByIdRepository,
  LoadDocumentsRepository,
  DeleteDocumentRepository,
  UpdateDocumentByIdRepository {
  private documents: Document[] = [];

  async add(data: AddDocumentDto): Promise<Document> {
    const document = {
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    } as Document;

    this.documents.push(document);
    return document;
  }

  async loadById(id: string): Promise<Document | null> {
    return this.documents.find((doc) => doc.id === id) || null;
  }

  async loadAll(filters: DocumentFilter): Promise<DocumentResponse> {
    let filteredDocuments = this.documents;

    if (filters.type) {
      filteredDocuments = filteredDocuments.filter((doc) => doc.type === filters.type);
    }

    if (filters.issuer) {
      filteredDocuments = filteredDocuments.filter((doc) =>
        doc.issuer?.toLowerCase().includes(filters.issuer!.toLowerCase()),
      );
    }

    const totalItems = filteredDocuments.length;
    const pageSize = filters.pageSize || 10;
    const page = filters.page || 1;

    const data = filteredDocuments.slice((page - 1) * pageSize, page * pageSize);

    return {
      data,
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  }

  async deleteById(id: string): Promise<void> {
    this.documents = this.documents.filter((doc) => doc.id !== id);
  }

  async updateById(id: string, data: Partial<Document>): Promise<Document> {
    const index = this.documents.findIndex((doc) => doc.id === id);
    if (index === -1) {
      throw new Error('Document not found');
    }

    const updatedDocument: Document = {
      ...this.documents[index],
      ...data,
      updatedAt: new Date(),
    };

    this.documents[index] = updatedDocument;
    return updatedDocument;
  }
}

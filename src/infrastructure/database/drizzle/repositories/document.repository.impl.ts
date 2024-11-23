import { AddDocumentDto } from 'src/application/dtos/request/add-document.dto';
import { DrizzleService } from '../drizzle.service';
import { AddDocumentRepository } from 'src/domain/repositories/add-document';
import { Document } from 'src/domain/entities/document.entity';
import { Injectable } from '@nestjs/common';
import { documents } from '../schemas/schema';
import { LoadDocumentByIdRepository } from 'src/domain/repositories/load-document-by-id';
import { and, asc, desc, eq, gte, ilike, lte, sql } from 'drizzle-orm';
import { LoadDocumentsRepository } from 'src/domain/repositories/load-documents';
import { DocumentResponse } from 'src/application/dtos/response/document.response.dto';
import { DeleteDocumentRepository } from 'src/domain/repositories/delete-document';
import { DocumentFilter } from 'src/application/dtos/request/filter.document.dto';
import { UpdateDocumentByIdRepository } from 'src/domain/repositories/update-document';

@Injectable()
export class DrizzleDocumentRepositoryImpl implements
    AddDocumentRepository,
    LoadDocumentByIdRepository,
    LoadDocumentsRepository,
    DeleteDocumentRepository,
    UpdateDocumentByIdRepository {

    constructor(private readonly drizzleService: DrizzleService) { }

    async add(data: AddDocumentDto): Promise<Document> {
        const [document] = await this.drizzleService.db
            .insert(documents)
            .values(data)
            .returning();
        return document;
    }

    async loadById(id: string): Promise<Document> {
        const [document] = await this.drizzleService.db
            .select()
            .from(documents)
            .where(eq(documents.id, id))

        return document;
    }

    async loadAll(filters: DocumentFilter): Promise<DocumentResponse> {
        const {
            type,
            issuer,
            createdAtStart,
            createdAtEnd,
            totalTaxValueMin,
            totalTaxValueMax,
            netValueMin,
            netValueMax,
            sortBy = 'createdAt',
            sortOrder = 'asc',
            page = 1,
            pageSize = 10
        } = filters;

        const conditions = [];
        if (type) conditions.push(eq(documents.type, type));
        if (issuer) conditions.push(ilike(documents.issuer, `%${issuer}%`));
        if (createdAtStart) conditions.push(gte(documents.createdAt, createdAtStart));
        if (createdAtEnd) conditions.push(lte(documents.createdAt, createdAtEnd));
        if (totalTaxValueMin) conditions.push(gte(documents.totalTaxValue, totalTaxValueMin));
        if (totalTaxValueMax) conditions.push(lte(documents.totalTaxValue, totalTaxValueMax));
        if (netValueMin) conditions.push(gte(documents.netValue, netValueMin));
        if (netValueMax) conditions.push(lte(documents.netValue, netValueMax));

        const validSortColumns = ['createdAt', 'updatedAt', 'netValue', 'totalTaxValue'];
        const sortColumn = validSortColumns.includes(sortBy) ? documents[sortBy] : documents.createdAt;
        const orderDirection = sortOrder.toLowerCase() === 'desc' ? desc(sortColumn) : asc(sortColumn);

        const rows = await this.drizzleService.db
            .select()
            .from(documents)
            .where(conditions.length > 0 ? and(...conditions) : undefined)
            .orderBy(orderDirection)
            .limit(Number(pageSize))
            .offset((page - 1) * Number(pageSize));

        const totalItems = Number(rows.length);
        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            data: rows,
            totalItems,
            totalPages,
        };
    }

    async deleteById(id: string): Promise<void> {
        await this.drizzleService.db.delete(documents).where(eq(documents.id, id))
    }

    async updateById(id: string, data: Partial<Document>): Promise<Document> {
        const [document] = await this.drizzleService.db
            .update(documents)
            .set(data)
            .where(eq(documents.id, id))
            .returning();

        return document;
    }
}

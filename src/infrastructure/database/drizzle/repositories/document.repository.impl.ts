import { DrizzleService } from '../drizzle.service';
import { AddDocumentRepository } from 'src/domain/repositories/add-document';
import { Document } from 'src/domain/entities/document.entity';
import { Injectable } from '@nestjs/common';
import { documents } from '../schemas/schema';
import { LoadDocumentByIdRepository } from 'src/domain/repositories/load-document-by-id';
import { and, AnyColumn, asc, desc, eq, gte, ilike, lte, sql } from 'drizzle-orm';
import { LoadDocumentsRepository } from 'src/domain/repositories/load-documents';
import { DeleteDocumentRepository } from 'src/domain/repositories/delete-document';
import { UpdateDocumentByIdRepository } from 'src/domain/repositories/update-document';
import { AddDocumentDto, DocumentFilter, DocumentResponse } from '@/application/dtos';

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
        return document as Document;
    }

    async loadById(id: string): Promise<Document> {
        const [document] = await this.drizzleService.db
            .select()
            .from(documents)
            .where(eq(documents.id, id))

        return document as Document;
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
        if (createdAtStart) conditions.push(gte(documents.createdAt, new Date(createdAtStart)));
        if (createdAtEnd) conditions.push(lte(documents.createdAt, new Date(createdAtEnd)));
        if (totalTaxValueMin) conditions.push(gte(documents.totalTaxValue, totalTaxValueMin));
        if (totalTaxValueMax) conditions.push(lte(documents.totalTaxValue, totalTaxValueMax));
        if (netValueMin) conditions.push(gte(documents.netValue, netValueMin));
        if (netValueMax) conditions.push(lte(documents.netValue, netValueMax));

        const sortColumnMap: Record<"createdAt" | "updatedAt" | "netValue" | "totalTaxValue", AnyColumn> = {
            createdAt: documents.createdAt,
            updatedAt: documents.updatedAt,
            netValue: documents.netValue,
            totalTaxValue: documents.totalTaxValue,
        };

        const sortColumn = sortColumnMap[sortBy as keyof typeof sortColumnMap] || documents.createdAt;
        const orderDirection = sortOrder.toLowerCase() === 'desc' ? desc(sortColumn) : asc(sortColumn);

        const rows = await this.drizzleService.db
            .select()
            .from(documents)
            .where(conditions.length > 0 ? and(...conditions) : undefined)
            .orderBy(orderDirection)
            .limit(Number(pageSize))
            .offset((page - 1) * Number(pageSize));

        const totalItems = rows.length;
        const totalPages = Math.ceil(totalItems / pageSize);

        return {
            data: rows as Document[],
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

        return document as Document;
    }
}

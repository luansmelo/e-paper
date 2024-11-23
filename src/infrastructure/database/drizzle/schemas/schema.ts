import { pgTable, text, integer, timestamp, uuid, pgEnum } from 'drizzle-orm/pg-core';
export const documentStatusEnum = pgEnum('document_status', ['pending', 'completed', 'failed']);

export const documents = pgTable('documents', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name'),
    type: text('type').notNull(),
    origin: text('origin').notNull(),
    issuer: text('issuer'),
    totalTaxValue: integer('total_tax_value'),
    netValue: integer('net_value'),
    fileUrl: text('fileUrl'),
    status: documentStatusEnum('status').notNull().default('pending'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

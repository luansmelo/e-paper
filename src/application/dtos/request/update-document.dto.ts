import { UpdateDocumentSchema } from '@/application/schemas/document.schema';
import { createZodDto } from 'nestjs-zod';

export class UpdateDocumentDto extends createZodDto(UpdateDocumentSchema) { }

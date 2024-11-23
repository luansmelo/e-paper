import { DocumentFilterSchema } from "@/application/schemas/document.schema";
import { createZodDto } from "nestjs-zod";

export class DocumentFilter extends createZodDto(DocumentFilterSchema)  { }

import { AddDocumentSchema } from "@/application/schemas/document.schema";
import { createZodDto } from "nestjs-zod";

export class AddDocumentDto extends createZodDto(AddDocumentSchema) { }
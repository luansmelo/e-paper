import { DocumentFilter } from "src/application/dtos/request/filter.document.dto";
import { DocumentResponse } from "src/application/dtos/response/document.response.dto";

export abstract class LoadDocumentsRepository {
    abstract loadAll(filter: DocumentFilter): Promise<DocumentResponse>
}
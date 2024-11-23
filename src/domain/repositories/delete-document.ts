export abstract class DeleteDocumentRepository {
    abstract deleteById(id: string): Promise<void>
}
import { s3 } from "@/config/multer-s3.config";
import { DeleteDocumentRepository } from "@/domain/repositories/delete-document";
import { LoadDocumentByIdRepository } from "@/domain/repositories/load-document-by-id";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteDocumentUseCase {
    constructor(
        private readonly repository: DeleteDocumentRepository,
        private readonly load: LoadDocumentByIdRepository,
    ) { }

    async execute(id: string): Promise<void> {
        const document = await this.load.loadById(id);

        if (!document) {
            throw new NotFoundException("Document not found");
        }

        const bucket = process.env.MINIO_BUCKET as string
        const oldFileKey = document.fileUrl.split(`${bucket}/`)[1];

        const deleteObjectCommand = new DeleteObjectCommand({
            Bucket: bucket,
            Key: oldFileKey,
        });

        await s3.send(deleteObjectCommand);

        await this.repository.deleteById(document.id);
    }
}

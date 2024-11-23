import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Injectable, NotFoundException } from "@nestjs/common";
import { s3 } from "../../config/multer-s3.config"
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from 'uuid';
import { UpdateDocumentByIdRepository } from "@/domain/repositories/update-document";
import { Document } from "@/domain/entities/document.entity";
import { LoadDocumentByIdRepository } from "@/domain/repositories/load-document-by-id";

@Injectable()
export class UploadFileUseCase {
    constructor(
        private readonly config: ConfigService,
        private readonly update: UpdateDocumentByIdRepository,
        private readonly loadDocument: LoadDocumentByIdRepository,
    ) { }

    async execute(documentId: string, file: Express.Multer.File): Promise<Document> {
        const document = await this.loadDocument.loadById(documentId)

        if (!document) {
            throw new NotFoundException("Document not found");
        }
        
        const bucket = this.config.get<string>('MINIO_BUCKET');

        if (document.fileUrl) {
            const oldFileKey = document.fileUrl.split(`${bucket}/`)[1];

            const deleteObjectCommand = new DeleteObjectCommand({
                Bucket: process.env.MINIO_BUCKET as string,
                Key: oldFileKey,
            });
    
            await s3.send(deleteObjectCommand);
        }

        const uuid = uuidv4();
        const filename = `${uuid}-${file.originalname}`;
        const fileKey = `uploads/${filename}`;

        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: fileKey,
            Body: file.buffer,
        });

        await s3.send(command);

        const fileUrl = `${this.config.get<string>('MINIO_ENDPOINT')}/${bucket}/${fileKey}`;

        return await this.update.updateById(documentId, {
            fileUrl,
            name: file.originalname,
        });
    }

}
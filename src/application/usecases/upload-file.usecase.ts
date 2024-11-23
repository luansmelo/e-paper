import { PutObjectCommand } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { s3 } from "../../config/multer-s3.config"
import { ConfigService } from "@nestjs/config";
import { v4 as uuidv4 } from 'uuid';
import { UpdateDocumentByIdRepository } from "@/domain/repositories/update-document";
import { Document } from "@/domain/entities/document.entity";

@Injectable()
export class UploadFileUseCase {
    constructor(
        private readonly config: ConfigService,
        private readonly update: UpdateDocumentByIdRepository,
    ) { }

    async execute(documentId: string, file: Express.Multer.File): Promise<Document> {
        const bucket = this.config.get<string>('MINIO_BUCKET');
        const uuid = uuidv4();
        const fileExtension = file.originalname.split('.').pop();
        const filename = `${uuid}-${file.originalname}`;

        const fileKey = `uploads/${filename}.${fileExtension}`;

        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: fileKey,
            Body: file.buffer,
        });

        await s3.send(command);

        const fileUrl = `${this.config.get<string>('MINIO_ENDPOINT')}/${bucket}/${fileKey}`;

        return await this.update.updateById(documentId, {
            fileUrl,
            name: filename,
        });
    }

}
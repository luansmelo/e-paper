import { CreateBucketCommand, HeadBucketCommand, PutBucketPolicyCommand, S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const s3 = new S3Client({
    region: process.env.MINIO_BUCKET as string,
    credentials: {
        accessKeyId: process.env.MINIO_ACCESS_KEY,
        secretAccessKey: process.env.MINIO_SECRET_KEY,
    },
    endpoint: process.env.MINIO_ENDPOINT,
    forcePathStyle: true,
});

const initializeBucket = async () => {
    const bucketName = process.env.MINIO_BUCKET as string;

    try {
        await s3.send(new HeadBucketCommand({ Bucket: bucketName }));
        console.log(`Bucket "${bucketName}" já existe.`);
    } catch (error) {
        if (error.name === 'NotFound') {
            console.log(`Criando bucket "${bucketName}"...`);
            await s3.send(new CreateBucketCommand({ Bucket: bucketName }));

            const bucketPolicy = {
                Version: "2012-10-17",
                Statement: [
                    {
                        Effect: "Allow",
                        Principal: "*",
                        Action: "s3:GetObject",
                        Resource: [`arn:aws:s3:::${bucketName}/*`],
                    },
                ],
            };

            await s3.send(new PutBucketPolicyCommand({
                Bucket: bucketName,
                Policy: JSON.stringify(bucketPolicy),
            }));

            console.log(`Bucket "${bucketName}" criado e configurado com sucesso.`);
        } else {
            console.error("Erro ao verificar ou criar bucket:", error);
        }
    }
}

initializeBucket().catch(console.error);
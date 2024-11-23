import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DocumentController } from './presentation/controllers/document.controller';
import { DocumentModule } from './infrastructure/ioc/document.module';

@Module({
  controllers: [DocumentController],
  imports: [
    DocumentModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().uri().required(),
        MINIO_ACCESS_KEY: Joi.string().required(),
        MINIO_SECRET_KEY: Joi.string().required(),
        MINIO_ENDPOINT: Joi.string().uri().required(),
        MINIO_BUCKET: Joi.string().required(),
      }),
    }),
  ],
})
export class AppModule { }

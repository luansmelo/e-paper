import { openApiDocument } from '@/application';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';

export const configureSwagger = (app: INestApplication) => {
    SwaggerModule.setup('api', app, openApiDocument);
}

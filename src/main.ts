import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { configureSwagger } from './config/swagger.config';
import { configureAllFilters, configureGlobalPipes } from './config/global.config';
import "@/config/multer-s3.config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  const PORT = config.get<number>('PORT')
  const ENVERIOMENT = config.get<string>('NODE_ENV') || 'development'

  app.enableCors({
    origin: '*',
  });

  configureSwagger(app);
  configureGlobalPipes(app);
  configureAllFilters(app);

  await app.listen(PORT, () => {
    console.log(`=================================`);
    console.log(`🚀 Application is running!`);
    console.log(`🌍 Environment: ${ENVERIOMENT}`);
    console.log(`🔗 Port: ${PORT}`);
    console.log(`=================================`);
  });
}
bootstrap();

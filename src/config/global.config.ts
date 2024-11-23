import { ZodValidationExceptionFilter } from "@/presentation/filters/zod-validation.exception.filter";
import { INestApplication, ValidationPipe } from "@nestjs/common";

export function configureGlobalPipes(app: INestApplication) {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );
}

export function configureAllFilters(app: INestApplication) {
    app.useGlobalFilters(new ZodValidationExceptionFilter())
}
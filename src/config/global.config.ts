import { AllExceptionsFilter } from "@/presentation/filters/all-exceptions.filter";
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
    app.useGlobalFilters(new AllExceptionsFilter());
}
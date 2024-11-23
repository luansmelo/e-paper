import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DrizzleService } from '../database/drizzle/drizzle.service';
import { DrizzleDocumentRepositoryImpl } from '../database/drizzle/repositories/document.repository.impl';

@Module({
    imports: [ConfigModule],
    providers: [DrizzleService, DrizzleDocumentRepositoryImpl],
    exports: [DrizzleService, DrizzleDocumentRepositoryImpl],
})
export class DatabaseModule { }

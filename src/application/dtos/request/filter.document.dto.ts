import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, IsEnum, IsDate, IsPositive, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class DocumentFilter {
    @ApiPropertyOptional({ description: 'Tipo de documento (ex: Nota fiscal de serviço)' })
    @IsOptional()
    @IsString()
    type?: string;

    @ApiPropertyOptional({ description: 'Razão social do emitente' })
    @IsOptional()
    @IsString()
    issuer?: string;

    @ApiPropertyOptional({ description: 'Data inicial de criação', type: String, format: 'date-time' })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdAtStart?: Date;

    @ApiPropertyOptional({ description: 'Data final de criação', type: String, format: 'date-time' })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdAtEnd?: Date;

    @ApiPropertyOptional({ description: 'Valor mínimo dos tributos', type: Number })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    totalTaxValueMin?: number;

    @ApiPropertyOptional({ description: 'Valor máximo dos tributos', type: Number })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    totalTaxValueMax?: number;

    @ApiPropertyOptional({ description: 'Valor líquido mínimo', type: Number })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    netValueMin?: number;

    @ApiPropertyOptional({ description: 'Valor líquido máximo', type: Number })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    netValueMax?: number;

    @ApiPropertyOptional({ description: 'Campo para ordenação', default: 'createdAt' })
    @IsOptional()
    @IsString()
    sortBy?: string = 'createdAt';

    @ApiPropertyOptional({ description: 'Ordem de ordenação', enum: ['asc', 'desc'], default: 'asc' })
    @IsOptional()
    @IsEnum(['asc', 'desc'])
    sortOrder?: 'asc' | 'desc' = 'asc';

    @ApiPropertyOptional({ description: 'Número da página', type: Number, default: 1 })
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({ description: 'Itens por página', type: Number, default: 10 })
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    @Min(0)
    pageSize?: number = 10;
}

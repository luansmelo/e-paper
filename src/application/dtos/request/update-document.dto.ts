import { PartialType } from '@nestjs/swagger';
import { AddDocumentDto } from './add-document.dto';
import { IsOptional, IsString, IsNumber, IsDate } from 'class-validator';

export class UpdateDocumentDto extends PartialType(AddDocumentDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  issuer?: string;

  @IsOptional()
  @IsNumber()
  totalTaxValue?: number;

  @IsOptional()
  @IsNumber()
  netValue?: number;

  @IsOptional()
  @IsString()
  fileUrl?: string; 
}

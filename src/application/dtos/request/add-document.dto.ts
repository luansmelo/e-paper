import { IsString } from 'class-validator';

export class AddDocumentDto {
  @IsString()
  origin: string;

  @IsString()
  type: string;
}

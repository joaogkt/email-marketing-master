import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  usuarioId: number;

  @IsString()
  @IsOptional()
  dominio?: string;
}

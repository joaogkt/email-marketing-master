import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateContactListDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsInt()
  company_id: number;
}

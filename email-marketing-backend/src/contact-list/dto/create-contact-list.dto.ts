import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';  

export class CreateContactListDto {
  @ApiProperty({ example: 'VIP list', description: 'The name of contact list' })
  @IsNotEmpty()
  @IsString()
  nome: string;


  @ApiProperty({ example: '1', description: 'Number of company id' })
  @IsNotEmpty()
  @IsInt()
  company_id: number;
}

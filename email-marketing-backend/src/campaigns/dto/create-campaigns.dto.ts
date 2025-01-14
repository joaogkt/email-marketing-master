import { IsString, IsNotEmpty, IsOptional, IsDateString  } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateCampaignDto {

  @ApiProperty({ example: 'Liquidacao', description: 'The name of the campaign' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Grupo de email para divulgar liquidacoes', description: 'The description of the campaign' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsOptional()
  createdAt: Date;

}

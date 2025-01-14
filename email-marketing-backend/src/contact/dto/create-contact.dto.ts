import { IsNotEmpty, IsString, IsOptional, IsEmail, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';  


export class CreateContactDto {
    @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
    @IsString()
    name: string;
  
    @ApiProperty({ example: 'johndoe@doe.com', description: 'The email of the user' })
    @IsEmail()
    email: string;
  
    @ApiProperty({ example: '[1,2]', description: 'ID contact list' })
    @IsArray()
    @IsOptional()
    contactListIds?: number[];
}
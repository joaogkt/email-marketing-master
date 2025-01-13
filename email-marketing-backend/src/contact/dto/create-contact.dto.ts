import { IsNotEmpty, IsString, IsOptional, IsEmail, IsArray } from 'class-validator';

export class CreateContactDto {
    
    @IsString()
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsArray()
    @IsOptional()
    contactListIds?: number[];
}
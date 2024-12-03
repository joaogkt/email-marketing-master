import { IsString, IsEmail } from 'class-validator';

export class CreateEmailDto {
  @IsEmail()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;

}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {

  constructor(private configService: ConfigService) {}

  getHello(): string {
    return 'Hello Ratin!';
  }
  
  getEmailHost(): string {
    return this.configService.get<string>('EMAIL_HOST');
  }
}

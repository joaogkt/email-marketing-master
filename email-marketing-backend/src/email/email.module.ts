import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { Email} from './email.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailerModule } from '@nestjs-modules/mailer';
import Configs from '../config/configs';


@Module({
  imports: [
    TypeOrmModule.forFeature([Email]), 
    AuthModule, JwtModule,
    PassportModule,
    JwtModule.register({
      secret: 'chave-secreta',
      signOptions: { expiresIn: '1h'},
    }),
    MailerModule.forRoot({
      transport: {
          host: Configs.host,
          port: Configs.port,
          secure: false,
          auth: {
              user: Configs.user,
              pass: Configs.password
          }
      },
      defaults: {
          from: '"No Reply" <noreply@example.com>'
      }
  })
  ],
  providers: [EmailService],
  controllers: [EmailController],
  exports: [EmailService]
  })
export class EmailModule {}

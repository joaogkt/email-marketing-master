import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { Email } from './email/email.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';

import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CampaignsModule } from './campaigns/campaigns.module';
import { Campaigns } from './campaigns/campaigns.entity';
import { CompanyModule } from './company/company.module';
import { Company } from './company/company.entity';
import { ContactListModule } from './contact-list/contact-list.module';



@Module({
  imports: [

    ConfigModule.forRoot({
      envFilePath: '.env', 
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '1234',
      database: process.env.DB_NAME || 'test',
      entities: [User, Email, Campaigns, Company],
      synchronize: true,
    }),
    EmailModule,
    AuthModule,
    UsersModule,
    CampaignsModule,
     MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: Number(process.env.EMAIL_PORT) || 587,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, process.env.NODE_ENV === 'production' ? '../templates' : './src/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
     CompanyModule,
     ContactListModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

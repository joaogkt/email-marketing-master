import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { Company } from './company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule
    .forFeature([Company, User]),
    AuthModule, JwtModule,
    PassportModule, UsersModule,
    JwtModule.register({
      secret: 'chave-secreta',
      signOptions: { expiresIn: '1h'},
    }),
    
    ],

  providers: [CompanyService],
  controllers: [CompanyController]
})
export class CompanyModule {}

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy'; // Criaremos em seguida
import { Company } from 'src/company/company.entity';
import { CompanyModule } from 'src/company/company.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User, Company]), // Registre a entidade User
    PassportModule,

    JwtModule.register({
      secret: 'chave-secreta',
      signOptions: { expiresIn: '1h'},
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}

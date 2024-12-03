import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy'; // Criaremos em seguida


@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Registre a entidade User
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

import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { Contact } from './entities/contact.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactList } from 'src/contact-list/entities/contact-list.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([ContactList, Contact]),
        AuthModule, JwtModule,
        PassportModule, UsersModule,
        JwtModule.register({
          secret: 'chave-secreta',
          signOptions: { expiresIn: '1h'},
  }),
],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}

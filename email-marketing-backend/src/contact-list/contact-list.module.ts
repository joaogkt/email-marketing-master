import { Module } from '@nestjs/common';
import { ContactListService } from './contact-list.service';
import { ContactListController } from './contact-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactList } from './entities/contact-list.entity';
import { Company } from 'src/company/company.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { Campaigns } from 'src/campaigns/campaigns.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([ContactList, Company, Campaigns]),
        AuthModule, JwtModule,
        PassportModule, UsersModule,
        JwtModule.register({
          secret: 'chave-secreta',
          signOptions: { expiresIn: '1h'},
  }),
        
  ],
  controllers: [ContactListController],
  providers: [ContactListService],
})
export class ContactListModule {}

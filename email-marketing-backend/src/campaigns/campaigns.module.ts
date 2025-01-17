import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaigns } from './campaigns.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ContactList } from 'src/contact-list/entities/contact-list.entity';


@Module({
    imports: [
        TypeOrmModule.forFeature([Campaigns, ContactList]),
        AuthModule, JwtModule,
        PassportModule,
        JwtModule.register({
          secret: 'chave-secreta',
          signOptions: { expiresIn: '1h'},
        }),
        ],
    providers: [CampaignsService],
    controllers: [CampaignsController],
    exports: [CampaignsService]
})
export class CampaignsModule {}

import { Module } from '@nestjs/common';
import { ContactListService } from './contact-list.service';
import { ContactListController } from './contact-list.controller';

@Module({
  controllers: [ContactListController],
  providers: [ContactListService],
})
export class ContactListModule {}

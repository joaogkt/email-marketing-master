import { Injectable, Logger } from '@nestjs/common';
import { CreateContactListDto } from './dto/create-contact-list.dto';
import { UpdateContactListDto } from './dto/update-contact-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactList } from './entities/contact-list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactListService {

  private readonly logger = new Logger(ContactListService.name)

  constructor(
    @InjectRepository(ContactList)
    private contactListRepository: Repository<ContactList>,
  ) {}

  create(createContactListDto: CreateContactListDto) {
    
    return 'This action adds a new contactList';
  }

  findAll() {
    return `This action returns all contactList`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contactList`;
  }

  update(id: number, updateContactListDto: UpdateContactListDto) {
    return `This action updates a #${id} contactList`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactList`;
  }
}

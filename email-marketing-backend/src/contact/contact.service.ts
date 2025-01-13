import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { ContactList } from 'src/contact-list/entities/contact-list.entity';


@Injectable()
export class ContactService {


  private readonly logger = new Logger(ContactService.name);
  

  constructor(

    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,

    @InjectRepository(ContactList)
    private readonly contactListRepository: Repository<ContactList>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const { contactListIds, ...contactData } = createContactDto;

    const contactLists = contactListIds
      ? await this.contactListRepository.findBy({
      id: In(contactListIds),
    })
  : [];
    const contact = this.contactRepository.create({
      ...contactData,
      contactLists,
    });

    return this.contactRepository.save(contact);
  }

  findAll() {
    const contact = this.contactRepository.find({relations: ['contactLists']})
    return contact;
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}

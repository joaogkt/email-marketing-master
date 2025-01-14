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

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ where: {id }, relations: ['contactLists']})
    if (!contact) {
      throw new Error('Contato não encontrado')
    }
    return contact;
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.findOne(id)
    const { name, email, contactListIds } = updateContactDto

    const contactLists = await this.contactListRepository.find({
      where: { id: In(contactListIds) },
    });
    
    contact.name = name
    contact.email = email
    contact.contactLists = contactLists
    return this.contactRepository.save(contact);
  }

  async remove(id: number): Promise<void> {
    const contact = await this.findOne(id)
    if (!contact) {
      throw new NotFoundException(`Contato com o id: ${id} não encontrado`)
    }
    await this.contactRepository.remove(contact)
  }
}

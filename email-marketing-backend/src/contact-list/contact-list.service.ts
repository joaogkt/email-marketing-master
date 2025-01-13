import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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

  async create(createContactListDto: CreateContactListDto): Promise<ContactList> {
    const { nome, company_id } = createContactListDto;
    const contactList = this.contactListRepository.create({ nome, company: { id: company_id } });
    return this.contactListRepository.save(contactList)
  }

  findAll() {
    return this.contactListRepository.find({relations: ['company']});
  }

  async findOne(id: number): Promise<ContactList> {
    const contactList = await this.contactListRepository.findOne({
      where: { id },
      relations: ['company']
    })
    if (!contactList) {
      throw new Error('Lista de contatos não encontrada');
  }
    return contactList;
  }

  async update(id: number, updateContactListDto: UpdateContactListDto) {
    const contactList = await this.findOne(id)
    const { nome, company_id } = updateContactListDto
    contactList.nome = nome
    return this.contactListRepository.save(contactList);
  }

  async remove(id: number): Promise<void> {
    const contactList = await this.findOne(id)
    if (!contactList) {
      throw new NotFoundException(`Campanha com id ${id} não encontrado`)
    }
    await this.contactListRepository.remove(contactList)
  }
}

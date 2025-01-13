import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactListService } from './contact-list.service';
import { CreateContactListDto } from './dto/create-contact-list.dto';
import { UpdateContactListDto } from './dto/update-contact-list.dto';

@Controller('contact-list')
export class ContactListController {
  constructor(private readonly contactListService: ContactListService) {}

  @Post()
  create(@Body() createContactListDto: CreateContactListDto) {
    return this.contactListService.create(createContactListDto);
  }

  @Get()
  findAll() {
    return this.contactListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactListDto: UpdateContactListDto) {
    return this.contactListService.update(+id, updateContactListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactListService.remove(+id);
  }
}

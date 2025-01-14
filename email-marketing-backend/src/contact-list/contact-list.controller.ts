import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ContactListService } from './contact-list.service';
import { CreateContactListDto } from './dto/create-contact-list.dto';
import { UpdateContactListDto } from './dto/update-contact-list.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('ContactList')
@Controller('contact-list')
export class ContactListController {
  constructor(private readonly contactListService: ContactListService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contact list' })
  @ApiBody({ 
    description: 'Data required to create a contact list',
    schema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Contact list name' },
        company_id: { type: 'string', description: 'Contact list company id' },
      },
      required: ['nome', 'company_id'],
    },
  })
  create(@Body() createContactListDto: CreateContactListDto) {
    return this.contactListService.create(createContactListDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all contact lists' })
  findAll() {
    return this.contactListService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a single contact list by ID' })
  @ApiParam({ name: 'id', description: 'ID of the contact list', type: 'integer' })
  findOne(@Param('id') id: number) {
    return this.contactListService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a contact list by ID' }) 
  @ApiParam({ name: 'id', description: 'ID of the contact list', type: 'integer' }) 
  @ApiBody({ 
    description: 'Data required to create a contact list',
    schema: {
      type: 'object',
      properties: {
        nome: { type: 'string', description: 'Contact list name' },
        company_id: { type: 'string', description: 'Contact list company id' },
      },
    },
  })
  update(@Param('id') id: number, @Body() updateContactListDto: UpdateContactListDto) {
    return this.contactListService.update(id, updateContactListDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contact list by ID' }) 
  @ApiParam({ name: 'id', description: 'ID of the contact list', type: 'integer' })
  remove(@Param('id') id: number) {
    return this.contactListService.remove(id);
  }
}


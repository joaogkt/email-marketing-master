import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Campaigns') 
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new campaign' }) 
  @ApiBody({
    description: 'Data for creating a new campaign',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Campaign name' },
        description: { type: 'string', description: 'Campaign description' },
        contactLists: {type: 'string', description: 'Contact list id - [4] or [1,2,3,4]'}
      },
      required: ['name', 'description'],
    },
  })
  create(@Body() createCampaignDto: { name: string; description: string; contactLists: number[] }) {
    return this.campaignsService.createCampaign(
      createCampaignDto.name,
      createCampaignDto.description,
      createCampaignDto.contactLists,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all campaigns' })
  findAll() {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single campaign by ID' })
  @ApiParam({ name: 'id', description: 'Campaign ID', type: 'integer' })
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a campaign by ID' }) 
  @ApiParam({ name: 'id', description: 'Campaign ID', type: 'integer' }) 
  @ApiBody({
    description: 'Data to update a campaign',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Updated campaign name' },
        description: { type: 'string', description: 'Updated campaign description' },
      },
      required: ['name', 'description'],
    },
  })
  update(@Param('id') id: string, @Body() updateCampaignDto: { name: string; description: string }) {
    return this.campaignsService.update(+id, updateCampaignDto.name, updateCampaignDto.description);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a campaign by ID' })
  @ApiParam({ name: 'id', description: 'Campaign ID', type: 'integer' })
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';

@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  create(@Body() createCampaignDto: { name: string; description: string }) {
    return this.campaignsService.createCampaign(createCampaignDto.name, createCampaignDto.description);
  }

  @Get()
  findAll() {
    return this.campaignsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampaignDto: { name: string; description: string }) {
    return this.campaignsService.update(+id, updateCampaignDto.name, updateCampaignDto.description);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(+id);
  }
}

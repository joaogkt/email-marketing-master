import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Campaigns } from './campaigns.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class CampaignsService {

    private readonly logger = new Logger(CampaignsService.name);


    constructor(
    @InjectRepository(Campaigns)
    private campaignRepository: Repository<Campaigns>,
    ) {}

    async createCampaign(name: string, description: string): Promise<Campaigns> {
        this.logger.log(`Creating campaign with name: ${name}`);
        const campaign = this.campaignRepository.create({ name, description });
        return this.campaignRepository.save(campaign)
    }

    async findAll(): Promise<Campaigns[]> {
        return this.campaignRepository.find();
    }

    async findOne(id: number): Promise<Campaigns> {
      try {
          const campaign = await this.campaignRepository.findOne({ where: { id } });
          if (!campaign) {
              throw new NotFoundException(`Campaign with id ${id} not found`);
          }
          return campaign;

      } catch (error) {
          this.logger.error(`Error finding campaign with id ${id}`, error.stack);
          throw error;
      }
    }

    async update(id: number, name: string, description: string): Promise<Campaigns> {
      const campaign = await this.findOne(id);
      campaign.name = name;
      campaign.description = description;
      return this.campaignRepository.save(campaign);
    }

    
      async remove(id: number): Promise<void> {
        const campaign = await this.findOne(id)
        if (!campaign) {
          throw new NotFoundException(`Campanha com id ${id} não encontrado`)
        }
        await this.campaignRepository.remove(campaign)
      }
}

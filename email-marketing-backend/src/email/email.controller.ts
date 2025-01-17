import { Body, Controller, Post, UseGuards, Get, Delete, NotFoundException, Param } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto'; 
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Email } from './email.entity';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { CampaignsService } from 'src/campaigns/campaigns.service';



@UseGuards(JwtAuthGuard)
@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService, private campaignService: CampaignsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('send')
    async sendEmail(@Body() createEmailDto: CreateEmailDto): Promise<string> {

      try { 
        const { to, subject, message} = createEmailDto;
        return this.emailService.trySendEmail(to, subject, message);

      } catch (error) {
        console.log(`Erro ao enviar email ${error}`)
        throw new Error(`Falha ao enviar email`)
      }
      }

    @Get()
    async findAll(): Promise<Email[]> {
        return this.emailService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Email> {
      return this.emailService.findOne(id);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<string> {
      try { 
        await this.emailService.remove(id)
        return `Email com id ${id} deletado com sucesso`
      } catch (error) {
        throw new NotFoundException(`Email com id ${id} não encontrado`)
      }
    }

    @Post('send-everyone')
    async sendEmailEveryone(@Body() createEmailDto: CreateEmailDto): Promise<string> {
      try { 
        const { to, subject, message} = createEmailDto;
        return this.emailService.trySendEmail(to, subject, message);

      } catch (error) {
        console.log(`Erro ao enviar email ${error}`)
        throw new Error(`Falha ao enviar email`)
      }
    }

    @Post('/:campaignId')
    @ApiOperation({ summary: 'Send emails to all contacts in the campaign' })
    @ApiParam({
      name: 'campaignId',
      description: 'The ID of the campaign',
      type: Number,
    })
    @ApiBody({
      description: 'Subject and message to send',
      schema: {
        type: 'object',
        properties: {
          subject: { type: 'string', example: 'Campaign Subject' },
          message: { type: 'string', example: 'Message body for the campaign' },
        },
      },
    })
    async sendCampaignEmails(
      @Param('campaignId') campaignId: number,
      @Body('subject') subject: string,
      @Body('message') message: string,
    ): Promise<any> {
      const campaign = await this.campaignService.findOne(
        campaignId,
      );
  
      if (!campaign) {
        return { error: 'Campaign not found' };
      }
  
      const emails = campaign.contactLists.flatMap((list) =>
        list.contacts.map((contact) => contact.email),
      );
  
      if (emails.length === 0) {
        return { error: 'No contacts found in the campaign' };
      }
  
      await this.emailService.sendBulkEmails(emails, subject, message);
  
      return { message: 'Emails sent successfully', emails };
    }
  }
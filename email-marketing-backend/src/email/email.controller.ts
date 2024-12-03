import { Body, Controller, Post, UseGuards, Get, Delete, NotFoundException, Param } from '@nestjs/common';
import { EmailService } from './email.service';
import { CreateEmailDto } from './dto/create-email.dto'; 
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Email } from './email.entity';


@UseGuards(JwtAuthGuard)
@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) {}

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
  }
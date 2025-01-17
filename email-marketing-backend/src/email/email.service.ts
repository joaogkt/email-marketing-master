import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from 'src/email/email.entity';
import { MailerService } from '@nestjs-modules/mailer';
import Configs from '../config/configs';
import * as nodemailer from "nodemailer";



@Injectable()
export class EmailService {

  private readonly logger = new Logger(EmailService.name);


    constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
    private readonly mailerService: MailerService
    ) {}

    async saveEmail(to: string, subject: string, message: string, status: string): Promise<Email> {
      const email = this.emailRepository.create({ to, subject, message, status })
      return this.emailRepository.save(email)
    }


    async findAll(): Promise<Email[]> {
        return this.emailRepository.find();
    }

    async findOne(id: number): Promise<Email> {
      const email = await this.emailRepository.findOne({ where: { id: id }, });
      if(!email) {
        throw new NotFoundException(`Email com id ${id} não encontrado`)
      }
      return email
    }

    async remove(id: number): Promise<void> {
      const email = await this.emailRepository.findOne({ where: { id: id }, });
      if (!email) {
        throw new NotFoundException(`Email com id ${id} não encontrado`)
      }
      await this.emailRepository.remove(email)
    }


    private async sendEmailWithTransporter(mailOptions: any): Promise<any> {
      const transporter = nodemailer.createTransport({
        host: Configs.host,
        port: Configs.port,
        secure: false,
        auth: {
          user: Configs.user,
          pass: Configs.password,
        },
        tls: { rejectUnauthorized: false },
      });
      return transporter.sendMail(mailOptions);
    }
  
    async trySendEmail(to: string, subject: string, message: string): Promise<string> {
      const email = await this.saveEmail(to, subject, message, 'pending');
  
      const mailOptions = {
        from: "jgabriel.ktorres@gmail.com",
        to: to,
        subject: subject,
        html: message,
      };
  
      this.logger.log(`Tentando enviar e-mail para ${to}...`);
  
      try {
        const info = await this.sendEmailWithTransporter(mailOptions);
        this.logger.log(`E-mail enviado com sucesso para ${to}: ${info.messageId}`);
  
        email.status = 'sent';
        await this.emailRepository.save(email);
  
        return `Email enviado com sucesso para ${to}!`;
      } catch (error) {
        this.logger.error(`Erro ao enviar e-mail para ${to}: ${error.message}`);
  
        email.status = 'failed';
        await this.emailRepository.save(email);
  
        return `Falha ao enviar o email para ${to}.`;
      }
    }

    async sendBulkEmails(
      to: string[],
      subject: string,
      message: string,
    ): Promise<void> {
      for (const email of to) {
        this.logger.log(`Tentando enviar e-mail para ${email}...`);
        try {
          const result = await this.trySendEmail(email, subject, message);
          this.logger.log(`Email enviado para ${email}`);
          console.log(`Sending email to: ${email}, Subject: ${subject}`);
          
         } catch (error) {
        console.error(`Erro ao enviar email para: ${email}, Erro: ${error.message}`);
      }
    }
  }
}
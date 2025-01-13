import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';

@Injectable()
export class CompanyService {

    private readonly logger = new Logger(CompanyService.name);

    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,

        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findAllWithUsers(): Promise<Company[]> {
        return this.companyRepository.find({
            relations: ['users'],
        });
    }
    
    async createCompany(nome: string): Promise<Company> {
        const company = this.companyRepository.create({ nome });
        return this.companyRepository.save(company);
      }


    async update(id: number, nome?: string, dominio?: string): Promise<Company> {

        const company = await this.companyRepository.findOne({ where: { id } });
    
        if (!company) {
            throw new NotFoundException('Empresa não encontrada');
        }
    
        if (nome !== undefined) {
            company.nome = nome;
        }
    
        if (dominio !== undefined) {
            company.dominio = dominio;
        }
    
        return this.companyRepository.save(company);
    }

    async updateCompany(id: number, updateCompanyDto: { nome?: string; dominio?: string }): Promise<Company> {
        const company = await this.companyRepository.findOne({ where: { id } });
    
        if (!company) {
            throw new Error('Empresa não encontrada');
        }
    
        if (updateCompanyDto.nome) {
            company.nome = updateCompanyDto.nome;
        }
    
        if (updateCompanyDto.dominio) {
            company.dominio = updateCompanyDto.dominio;
        }
    
        return this.companyRepository.save(company);
    }
    

    async findOneWithUser(id: number): Promise<Company> {
        const company = await this.companyRepository.findOne({
            where: { id },
            relations: ['users'],
        });

        if (!company) {
            throw new Error('Empresa não encontrada');
        }

        return company;
    }

    async findAll(): Promise<Company[]> {
        return this.companyRepository.find()
    }



}

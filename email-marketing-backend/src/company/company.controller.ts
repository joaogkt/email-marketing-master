import { Controller, Param, Body, Post, Get, Patch, Delete, Put } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {

    constructor(private readonly companyService: CompanyService) {}


    @Patch(':id')
    async updateCompany(
        @Param('id') id: number,
        @Body() updateCompanyDto: { nome?: string; dominio?: string },
    ) {
        return this.companyService.update(id, updateCompanyDto.nome, updateCompanyDto.dominio);
    }

    @Get()
    async getAllCompanies() {
        return this.companyService.findAllWithUsers();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.companyService.findOneWithUser(+id);
    }
}

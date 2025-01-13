import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Company } from 'src/company/company.entity';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService: JwtService,

        @InjectRepository(Company)
        private companyRepository: Repository<Company>
    ) {}

    async register(name: string, email: string, password: string): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newCompany = this.companyRepository.create({
            nome: `Empresa de ${name}`,
        });
    
        await this.companyRepository.save(newCompany);
    

        const newUser = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            company: newCompany,
        })
        return this.userRepository.save(newUser)
    }

    async login(email:string, password:string): Promise<{ accessToken: string }> {
        const user = await this.userRepository.findOne({ where: { email } });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException("Credenciais invalidas")
        }
        const payload = { id: user.id}
        const accessToken = this.jwtService.sign(payload)

        return { accessToken }
    }

    async validateUser(payload: any): Promise<User> {
        return this.userRepository.findOne({ where: { id: payload.id }})
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id }, relations: ['company'], });
    
        if (!user) {
          throw new UnauthorizedException('Usuário não encontrado');
        }

        console.log('Usuário buscado no banco:', user);
        return user;
      }
}

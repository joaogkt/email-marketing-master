import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOne({ where: { id } })
        if(!user) {
            throw new NotFoundException(`Usuario de id ${id} não encontrado`)
        }
        return user
    }

    async create(userData: Partial<User>): Promise<User> {
        const user = this.usersRepository.create(userData)
        return this.usersRepository.save(user)
    }
    
    async update(id: number, updateData: Partial<User>): Promise<User> {
        await this.findOne(id);
        await this.usersRepository.update(id, updateData)
        return this.findOne(id)
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id)
        await this.usersRepository.remove(user)
    }
}

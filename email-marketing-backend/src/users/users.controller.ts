import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findOne(id)
    }

    //@Post()
    //async create(@Body() userData: Partial<User>): Promise<User> {
    //    return this.usersService.create(userData)
    //}

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateData: Partial<User>,
    ): Promise<User> {
        return this.usersService.update(id, updateData)
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.usersService.remove(id)
    }

}

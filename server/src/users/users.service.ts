import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

import * as bcrypt from "bcrypt";
import { UserDto } from 'src/dtos/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        return this.userRepository.findOne({ where: { id } });
    }

    async findByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({ where: { username } });
    }

    async create(user: UserDto): Promise<User> {
        return this.userRepository.save(user);
    }

    async update(id: string, user: User): Promise<void> {
        await this.userRepository.update(id, user);
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}

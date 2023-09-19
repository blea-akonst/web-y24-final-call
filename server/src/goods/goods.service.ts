import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Good } from '../entities/good.entity';

@Injectable()
export class GoodsService {
    constructor(
        @InjectRepository(Good)
        private readonly goodRepository: Repository<Good>,
    ) {}

    async findAll(): Promise<Good[]> {
        return this.goodRepository.find();
    }

    async findOne(id: string): Promise<Good> {
        return this.goodRepository.findOne({ where: { id: String(id) } });
    }

    async create(good: Good): Promise<Good> {
        return this.goodRepository.save(good);
    }

    async update(id: string, good: Good): Promise<void> {
        await this.goodRepository.update(id, good);
    }

    async remove(id: string): Promise<void> {
        await this.goodRepository.delete(id);
    }
}

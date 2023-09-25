import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Good } from '../entities/good.entity';
import {GoodsCreateDto} from "../dtos/goods.create.dto";

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

    async create(good: GoodsCreateDto): Promise<Good> {
        return this.goodRepository.save({
            name: good.name,
            price: good.price,
            category: good.category
        });
    }

    async update(id: string, good: Good): Promise<void> {
        await this.goodRepository.update(id, good);
    }

    async remove(id: string): Promise<void> {
        await this.goodRepository.delete(id);
    }
}

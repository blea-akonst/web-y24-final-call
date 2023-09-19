// orders.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderCreateDto } from 'src/dtos/order.create.dto';
import { GoodsService } from 'src/goods/goods.service';
import { OrderUnit } from 'src/entities/order_unit.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entities/user.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(OrderUnit)
        private readonly orderUnitRepository: Repository<OrderUnit>,
        private readonly goodsService: GoodsService,
        private readonly usersService: UsersService
    ) {}

    async findAll(user: User): Promise<Order[]> {
        return this.orderRepository.find({ where: {
            userId: user.id
        }, 
        relations: ['orderUnits', 'orderUnits.good']
    });
    }

    async findOne(id: string): Promise<Order> {
        return this.orderRepository.findOne({ where: { id: String(id) }, relations: ['orderUnits', 'orderUnits.good'] });
    }

    async create(user: User, dto: OrderCreateDto): Promise<Order> {
        if (!user) {
            throw new Error('User not found');
        }

        const order = this.orderRepository.create({
            user,
            address: dto.address,
        });

        const savedOrder = await this.orderRepository.save(order);

        for (const orderGoodId of dto.orderGoodIds) {
            const good = await this.goodsService.findOne(orderGoodId);
            if (!good) {
                throw new Error(`Good with ID ${orderGoodId} not found`);
            }

            const orderUnit = this.orderUnitRepository.create({
                good,
                order: savedOrder
            });

            await this.orderUnitRepository.save(orderUnit);
        }

        return savedOrder;
    }

    async update(id: string, order: Order): Promise<void> {
        await this.orderRepository.update(id, order);
    }

    async remove(id: string): Promise<void> {
        await this.orderRepository.delete(id);
    }
}

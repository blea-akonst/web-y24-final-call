// orders.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderCreateDto } from 'src/dtos/order.create.dto';
import { GoodsService } from 'src/goods/goods.service';
import { OrderUnit } from 'src/entities/order_unit.entity';
import {OrdersGateway} from "./orders.gateway";

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly ordersRepository: Repository<Order>,

        @InjectRepository(OrderUnit)
        private readonly orderUnitRepository: Repository<OrderUnit>,

        private readonly goodsService: GoodsService,
        private readonly ordersGateway: OrdersGateway
    ) {}

    async findAll(auth0UserId: string): Promise<Order[]> {
        return this.ordersRepository.find({ where: {
                auth0UserId: auth0UserId
        },
        relations: ['orderUnits', 'orderUnits.good']
    });
    }

    async findOne(id: string): Promise<Order> {
        return this.ordersRepository.findOne({ where: { id: String(id) }, relations: ['orderUnits', 'orderUnits.good'] });
    }

    async create(auth0UserId: string, dto: OrderCreateDto): Promise<Order> {
        if (!auth0UserId || auth0UserId.length == 0) {
            throw new Error('User not found');
        }

        const order = this.ordersRepository.create({
            auth0UserId,
            address: dto.address
        });

        const savedOrder = await this.ordersRepository.save(order);

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

        this.ordersGateway.orderCreated({
            orderId: savedOrder.id,
            userId: auth0UserId,
            address: savedOrder.address
        });

        return savedOrder;
    }

    async update(id: string, order: Order): Promise<void> {
        await this.ordersRepository.update(id, order);
    }

    async remove(id: string): Promise<void> {
        await this.ordersRepository.delete(id);
    }
}

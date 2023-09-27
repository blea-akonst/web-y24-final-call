import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Good } from 'src/entities/good.entity';
import { Order } from 'src/entities/order.entity';
import { OrderUnit } from 'src/entities/order_unit.entity';
import { GoodsModule } from 'src/goods/goods.module';
import {OrdersGateway} from "./orders.gateway";

@Module({
  imports: [TypeOrmModule.forFeature([Good, Order, OrderUnit]), GoodsModule],
  providers: [OrdersService, OrdersGateway],
  controllers: [OrdersController]
})
export class OrdersModule {}

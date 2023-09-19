import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Good } from 'src/entities/good.entity';
import { Order } from 'src/entities/order.entity';
import { OrderUnit } from 'src/entities/order_unit.entity';
import { User } from 'src/entities/user.entity';
import { GoodsModule } from 'src/goods/goods.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Good, Order, OrderUnit]), GoodsModule, UsersModule, AuthModule],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Good } from 'src/entities/good.entity';
import { Order } from 'src/entities/order.entity';
import { OrderUnit } from 'src/entities/order_unit.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Good, Order, OrderUnit])],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}

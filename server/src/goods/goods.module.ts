import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Good } from 'src/entities/good.entity';
import { Order } from 'src/entities/order.entity';
import { OrderUnit } from 'src/entities/order_unit.entity';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Good, Order, OrderUnit])],
  providers: [GoodsService],
  controllers: [GoodsController],
  exports: [GoodsService]
})
export class GoodsModule {}

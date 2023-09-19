import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GoodsModule } from './goods/goods.module';
import { OrdersModule } from './orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

const dbConfig = require('../ormconfig.json')

@Module({
  imports: [UsersModule, GoodsModule, OrdersModule, TypeOrmModule.forRoot(dbConfig), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

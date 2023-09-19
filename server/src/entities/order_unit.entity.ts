import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, PrimaryColumn, Generated } from 'typeorm';
import { Good } from './good.entity';
import { Order } from './order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class OrderUnit {
    @PrimaryColumn('uuid')
    @Generated('uuid')
    id: string;

    @ApiProperty()
    @ManyToOne(() => Good, good => good.orderUnits)
    good: Good;

    @ApiProperty()
    @ManyToOne(() => Order, order => order.orderUnits)
    order: Order;
}
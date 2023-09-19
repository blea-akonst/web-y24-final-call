import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, PrimaryColumn, Generated } from 'typeorm';
import { User } from './user.entity';
import { OrderUnit } from './order_unit.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
    @PrimaryColumn('uuid')
    @Generated('uuid')
    id: string;

    @ApiProperty()
    @ManyToOne(() => User, user => user.orders)
    user: () => User

    @Column()
    userId: string;

    @ApiProperty()
    @Column({ length: 255 })
    address: string;

    @ApiProperty()
    @OneToMany(() => OrderUnit, orderUnit => orderUnit.order)
    orderUnits: OrderUnit[];
}

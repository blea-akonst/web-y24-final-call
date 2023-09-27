import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, PrimaryColumn, Generated } from 'typeorm';
import { OrderUnit } from './order_unit.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Order {
    @PrimaryColumn('uuid')
    @Generated('uuid')
    id: string;

    @ApiProperty()
    @Column()
    auth0UserId: string;

    @ApiProperty()
    @Column({ length: 255 })
    address: string;

    @ApiProperty()
    @OneToMany(() => OrderUnit, orderUnit => orderUnit.order)
    orderUnits: OrderUnit[];
}

import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Generated, OneToMany } from 'typeorm';
import { OrderUnit } from './order_unit.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Good {
    @PrimaryColumn('uuid')
    @Generated('uuid')
    id: string;

    @ApiProperty()
    @Column({ length: 255 })
    name: string;

    @ApiProperty()
    @Column('int')
    price: number;

    @ApiProperty()
    @Column({ length: 255 })
    category: string;

    @OneToMany(() => OrderUnit, orderUnit => orderUnit.good)
    orderUnits: OrderUnit[];
}

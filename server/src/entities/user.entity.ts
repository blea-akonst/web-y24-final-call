import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Generated, OneToMany } from 'typeorm';
import { Order } from './order.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @PrimaryColumn('uuid')
    @Generated('uuid')
    id: string;

    @ApiProperty()
    @Column({ length: 255 })
    username: string;

    @ApiProperty()
    @Column({ length: 255, nullable: true })
    password: string;

    @ApiProperty()
    @Column({ length: 255 })
    fullName: string;

    @ApiProperty()
    @Column({ length: 255 })
    birthDate: string;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}
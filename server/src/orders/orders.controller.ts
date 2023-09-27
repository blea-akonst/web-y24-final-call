import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrdersService } from './orders.service';
import {ApiOperation, ApiParam, ApiTags} from '@nestjs/swagger';
import { Request } from 'express';
import {AuthorizationGuard} from "../authorization/authorization.guard";
import {OrderCreateDto} from "../dtos/order.create.dto";

@UseGuards(AuthorizationGuard)
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @ApiOperation({
        summary: 'Find all user orders'
    })
    @Get()
    async findAll(@Req() request: Request): Promise<Order[]> {
        return this.ordersService.findAll(request.user.id);
    }

    @ApiOperation({
        summary: 'Find user order by ID'
    })
    @ApiParam({ name: 'id', type: 'uuid' })
    @Get(':id')
    async findOne(@Param('id') id: string, @Req() request: Request): Promise<Order> {
        return this.ordersService.findOne(id);
    }

    @ApiOperation({
        summary: 'Create new order'
    })
    @Post()
    async create(@Body() order: OrderCreateDto, @Req() request: Request): Promise<Order> {
        return this.ordersService.create(request.user.id, order);
    }

    @ApiOperation({
        summary: 'Update existing order'
    })
    @ApiParam({ name: 'id', type: 'uuid' })
    @Put(':id')
    async update(@Param('id') id: string, @Body() order: Order): Promise<void> {
        return this.ordersService.update(id, order);
    }

    @ApiOperation({
        summary: 'Delete order'
    })
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.ordersService.remove(id);
    }
}

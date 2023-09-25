import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { Order } from '../entities/order.entity';
import { OrdersService } from './orders.service';
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import { OrderCreateDto } from 'src/dtos/order.create.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';

@UseGuards(JwtAuthGuard)
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService, private readonly authService: AuthService) {}

    @ApiOperation({
        summary: 'Find all user orders'
    })
    @Get()
    async findAll(@Req() request: Request): Promise<Order[]> {
        return this.ordersService.findAll(await this.authService.getUserFromRequest(request));
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
        return this.ordersService.create(await this.authService.getUserFromRequest(request), order);
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

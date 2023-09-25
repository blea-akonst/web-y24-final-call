import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Good } from '../entities/good.entity';
import { GoodsService } from './goods.service';
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger';
import {GoodsCreateDto} from "../dtos/goods.create.dto";

@ApiTags('goods')
@Controller('goods')
export class GoodsController {
    constructor(private readonly goodsService: GoodsService) {}

    @ApiOperation({
        summary: 'Find all goods'
    })
    @ApiResponse({
        status: 200,
        description: 'Goods are returned.'
    })
    @Get()
    findAll(): Promise<Good[]> {
        return this.goodsService.findAll();
    }

    @ApiOperation({
        summary: 'Find good by ID'
    })
    @ApiParam({ name: 'id', type: 'uuid' })
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Good> {
        return this.goodsService.findOne(id);
    }

    @ApiOperation({
        summary: 'Create new good'
    })
    @Post()
    create(@Body() good: GoodsCreateDto): Promise<Good> {
        return this.goodsService.create(good);
    }

    @ApiOperation({
        summary: 'Edit existing good'
    })
    @ApiParam({ name: 'id', type: 'uuid' })
    @Put(':id')
    update(@Param('id') id: string, @Body() good: Good): Promise<void> {
        return this.goodsService.update(id, good);
    }

    @ApiOperation({
        summary: 'Delete good'
    })
    @ApiParam({ name: 'id', type: 'uuid' })
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.goodsService.remove(id);
    }
}

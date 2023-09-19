import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Good } from '../entities/good.entity';
import { GoodsService } from './goods.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('goods')
@Controller('goods')
export class GoodsController {
    constructor(private readonly goodsService: GoodsService) {}

    @Get()
    findAll(): Promise<Good[]> {
        return this.goodsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Good> {
        return this.goodsService.findOne(id);
    }

    @Post()
    create(@Body() good: Good): Promise<Good> {
        return this.goodsService.create(good);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() good: Good): Promise<void> {
        return this.goodsService.update(id, good);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.goodsService.remove(id);
    }
}

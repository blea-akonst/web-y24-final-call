import {ApiProperty} from "@nestjs/swagger";

export class GoodsCreateDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    category: string;
}
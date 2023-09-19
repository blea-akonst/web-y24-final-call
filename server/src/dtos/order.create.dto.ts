import { ApiProperty } from "@nestjs/swagger";

export class OrderCreateDto {
    @ApiProperty()
    address: string;

    @ApiProperty()
    orderGoodIds: string[];
}
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty()
    username: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    birthDate: string;
}
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../entities/user.entity";

export class UserProfileDto {
    constructor(user: User) {
        this.username = user.username;
        this.fullName = user.fullName;
        this.birthDate = user.birthDate;
    }

    @ApiProperty()
    username: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    birthDate: string;
}
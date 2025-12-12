import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/schemas/userSchema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/getUser.decorator';
import type { UserPayload } from 'src/common/types/user.type';

@Controller('user')
export class UserController {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUsers(@GetUser() user: UserPayload) {
        return await this.userModel.find();
    }
}

import { Controller, Get } from '@nestjs/common';
import { User } from 'src/schemas/userSchema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('user')
export class UserController {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    @Public()
    // @UseGuards(AuthGuard('jwt'))
    @Get()
    async getUsers() {
        return await this.userModel.find();
    }
}

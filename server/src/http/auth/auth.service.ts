import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/schemas/userSchema';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    async signup(): Promise<{
        user: User;
        tokens: { accessToken: string; refreshToken: string };
    }> {
        const user = await this.userService.create();
        // const tokens = this.tokenService.generateTokens();
        return {
            user,
            tokens: { accessToken: '123', refreshToken: '123' },
        };
    }
}

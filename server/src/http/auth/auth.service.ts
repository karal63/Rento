import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/schemas/userSchema';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    async signup(candidate: SignupDto): Promise<{
        user: User;
        tokens: { accessToken: string; refreshToken: string };
    }> {
        const user = await this.userService.create(candidate);
        // const tokens = this.tokenService.generateTokens();
        return {
            user,
            tokens: { accessToken: '123', refreshToken: '123' },
        };
    }
}

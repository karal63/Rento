import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
    imports: [UserModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, RtStrategy, AtStrategy],
})
export class AuthModule {}

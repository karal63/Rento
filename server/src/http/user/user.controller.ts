import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EditDto } from './dto/edit.dto';
import { GetUser } from 'src/common/decorators/getUser.decorator';
import type { UserPayload } from 'src/common/types/user.type';
import { UserService } from './user.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { GetUsersDto } from './dto/getUsers.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles(Role.Admin)
    @Get('all')
    async get(@Query() query: GetUsersDto) {
        return await this.userService.get(query);
    }

    @ApiOperation({ summary: 'Update user details' })
    @ApiResponse({ status: 200, description: 'Returns updated user' })
    @Patch('edit')
    async edit(@Body() body: EditDto, @GetUser() user: UserPayload) {
        return await this.userService.update(user.id, body);
    }
}

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EditOwnDto } from './dto/editOwn.dto';
import { GetUser } from 'src/common/decorators/getUser.decorator';
import type { UserPayload } from 'src/common/types/user.type';
import { UserService } from './user.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { GetUsersDto } from './dto/getUsers.dto';
import { EditDto } from './dto/editDto';
import { CreateDto } from './dto/createDto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Roles(Role.Admin)
    @Get('all')
    async get(@Query() query: GetUsersDto) {
        return await this.userService.get(query);
    }

    @ApiOperation({ summary: 'Update requesting user details' })
    @ApiResponse({ status: 200, description: 'Returns updated user' })
    @Patch('edit')
    async editOwn(@Body() body: EditOwnDto, @GetUser() user: UserPayload) {
        return await this.userService.editOwn(user.id, body);
    }

    @ApiOperation({ summary: 'Update user details' })
    @ApiResponse({ status: 200, description: 'Returns updated user' })
    @Roles(Role.Admin, Role.Employee)
    @Patch('edit/:id')
    async edit(@Body() body: EditDto, @Param('id') id: string) {
        return await this.userService.edit(id, body);
    }

    @Roles(Role.Admin)
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: 200, description: 'Returns success message' })
    @Delete('delete/:id')
    async delete(@Param('id') userId: string) {
        await this.userService.delete(userId);
        return { success: true };
    }

    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: '2XX', description: 'Returns a new user' })
    @Roles(Role.Admin)
    @Post('create')
    async create(@Body() body: CreateDto) {
        return await this.userService.add(body);
    }
}

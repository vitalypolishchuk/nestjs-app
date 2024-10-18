import { Controller, UseGuards, Req, Get, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { TokenValidationGuard } from 'src/guards/token-validation.guard';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}


    @UseGuards(AuthGuard)
    @Get('/me') // This should be the correct endpoint
    async infoMe(@Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        const userInfo = await this.userService.getUser(userId);
        return userInfo;
    }

    @UseGuards(TokenValidationGuard)
    @Get('/:id')
    async info(@Param('id') userId: string) {
        const userInfo = await this.userService.getUser(userId);
        return userInfo;
    }

    @UseGuards(AuthGuard)
    @Delete('/')  // Change to DELETE
    async delete(@Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        const userInfo = await this.userService.deleteUser(userId);
        return userInfo;
    }
}

import { Controller, UseGuards, Req, Get, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AuthGuard)
    @Get('/info')
    async info(@Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        const userInfo = await this.userService.getUser(userId);
        return userInfo;
    }

    @UseGuards(AuthGuard)
    @Delete('/delete')  // Change to DELETE
    async delete(@Req() request: any) {
        const userId = request.user.id; // Get user ID from JWT
        const userInfo = await this.userService.deleteUser(userId);
        return userInfo;
    }
}

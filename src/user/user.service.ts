import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserModel, User } from '../models/user.model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
        constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

    async getUser(userId: string): Promise<User> {
        const cachedUser = await this.cacheManager.get<User>(userId);
        if (cachedUser) {
            return cachedUser;
        }

        const user = await UserModel
            .findOne({ _id: userId })
            .select('_id email registeredAt lastLogIn')
            .exec() as User | null;

        if (!user) {
            throw new NotFoundException(`No user found with ID: ${userId}`);
        }

        await this.cacheManager.set(userId, user, 1000 * 60);

        return user;
    }

    async deleteUser(userId: string): Promise<{ message: string }> {
        const result = await UserModel.deleteOne({ _id: userId });

        if (result.deletedCount === 0) {
            throw new NotFoundException(`No user found with ID: ${userId}`);
        }

        return { message: `User successfully deleted` };
    }
}

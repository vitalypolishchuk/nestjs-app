import { Injectable, NotFoundException } from '@nestjs/common';
import { UserModel, User } from '../models/user.model';

@Injectable()
export class UserService {
    async getUser(userId: string): Promise<User> {
        const user = await UserModel
            .findOne({ _id: userId })
            .select('_id email registeredAt lastLogIn')
            .exec() as User | null;

        if (!user) {
            throw new NotFoundException(`No user found with ID: ${userId}`);
        }

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

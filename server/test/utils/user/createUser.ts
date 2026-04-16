import { User, UserSchema } from '../../../src/schemas/userSchema';
import { Connection } from 'mongoose';
import * as argon from '@node-rs/argon2';

export async function createUser(
    connection: Connection,
    overrides: Partial<any> = {},
) {
    const UserModel = connection.model<User>('User', UserSchema);
    const password = await argon.hash("/']{:>");

    const user = await UserModel.create({
        name: 'test',
        secondName: 'test',
        phoneNumber: '+48123123123',
        email: 'test@gmail.com',
        password,
        roles: ['admin'],
        ...overrides,
    });

    return user;
}

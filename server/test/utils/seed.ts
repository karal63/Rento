import mongoose from 'mongoose';
import { createUser } from './user/createUser';

async function seedAdmin() {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Cannot seed an admin user in production');
    }

    const { connection } = await mongoose.connect(
        process.env.MONGODB_URI as string,
    );

    await createUser(connection, {
        name: 'admin',
        secondName: 'admin',
        phoneNumber: '+48123123123',
        email: 'admin@gmail.com',
        auth_provider: 'local',
    });

    await mongoose.disconnect();
}

seedAdmin().catch((err) => {
    console.error(err);
    process.exit(1);
});

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URI!;

async function resetDb() {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Cannot reset DB in production');
    }

    await mongoose.connect(MONGO_URI);

    await mongoose.connection.db?.dropDatabase();

    await mongoose.disconnect();
}

resetDb().catch((err) => {
    console.error(err);
    process.exit(1);
});

import { Connection } from 'mongoose';

export async function resetDatabase(connection: Connection) {
    const collections = connection.collections;

    for (const key of Object.keys(collections)) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}

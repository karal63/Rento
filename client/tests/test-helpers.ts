import { execSync } from 'child_process';

export function resetDatabase() {
    execSync('cd ../server && npm run db:reset && npm run db:seed', {
        stdio: 'inherit',
        env: {
            ...process.env,
            MONGODB_URI: `mongodb://127.0.0.1:27017/test_playwright_${process.env.WORKER_ID || '1'}`,
            NODE_ENV: 'test',
        },
    });
}

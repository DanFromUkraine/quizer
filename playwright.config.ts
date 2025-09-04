import { defineConfig } from '@playwright/test';

export default defineConfig({
        testDir: 'tests/end-to-end',
        fullyParallel: true,
        reporter: 'html',
        use: {
                baseURL: 'http://localhost:4005'
        },
        outputDir: 'tests/playwright-output',
        webServer: {
                command: 'pnpm dev -p 4005',
                url: 'http://localhost:4005',
                stdout: 'pipe',
                stderr: 'pipe'
        },
        timeout: 30_000
});

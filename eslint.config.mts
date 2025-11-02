import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
        // інші блоки (js, react, css) залишаються як є

        // TypeScript з type-check
        ...tseslint.configs.recommendedTypeChecked,
        {
                files: ['**/*.{ts,tsx,mts,cts}'],
                ignores: ['eslint.config.mts'],
                languageOptions: {
                        parserOptions: {
                                project: './tsconfig.json', // обов’язково!
                                tsconfigRootDir: import.meta.dirname
                        }
                },
                rules: {
                        '@typescript-eslint/no-floating-promises': 'error'
                }
        }
]);

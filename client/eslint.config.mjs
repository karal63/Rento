import path from 'path';
import typescriptParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';

const config = [
    {
        ignores: ['**/node_modules/**', '**/build/**', '**/*config.ts', 'eslint.config.*'],
    },

    // Spread TypeScript recommended rules directly
    ...tseslint.configs.recommended,

    // Spread Vue flat essential rules directly
    ...pluginVue.configs['flat/essential'],

    {
        files: ['**/*.vue'],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
        rules: {
            'vue/multi-word-component-names': 'off',
            '@typescript-eslint/no-unused-vars': 'warn',
            // 'vue/html-indent': ['error', 4],
            'vue/html-self-closing': [
                'error',
                {
                    html: {
                        void: 'always', // <br />, <img /> etc.
                        normal: 'any', // <div></div>
                        component: 'always', // <MyButton />
                    },
                    svg: 'always',
                    math: 'always',
                },
            ],
        },
    },

    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                parser: tseslint.parser,
                project: [path.resolve('./tsconfig.app.json')], // enables type-aware linting
            },
            globals: { ...globals.browser },
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            // '@typescript-eslint/no-explicit-any': 'off',
            // add any TS-specific rules for hooks, stores, utils, etc.
        },
    },
];

export default config;

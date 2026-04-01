import path from 'path';
import typescriptParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import boundaries from 'eslint-plugin-boundaries';

const config = [
    {
        ignores: ['**/node_modules/**', '**/dist/**', '**/*config.ts', 'eslint.config.*'],
    },

    // Spread TypeScript recommended rules directly
    ...tseslint.configs.recommended,

    // Spread Vue flat essential rules directly
    ...pluginVue.configs['flat/essential'],

    {
        files: ['**/*.vue'],
        languageOptions: {
            parserOptions: {
                parser: tseslint.parser,
                tsconfigRootDir: __dirname,
                project: ['./tsconfig.app.json'],
                extraFileExtensions: ['.vue'],
            },
        },
        rules: {
            'vue/multi-word-component-names': 'off',
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
            'newline-before-return': 'error',
            '@typescript-eslint/array-type': ['error', { default: 'array' }],
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/no-import-type-side-effects': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/naming-convention': [
                'error',
                { selector: 'typeLike', format: ['PascalCase'] },
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
                tsconfigRootDir: __dirname,
                project: ['./tsconfig.app.json'],
                extraFileExtensions: ['.vue'],
            },
            globals: { ...globals.browser },
        },
        rules: {
            'newline-before-return': 'error',
            '@typescript-eslint/array-type': ['error', { default: 'array' }],
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/no-import-type-side-effects': 'error',
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/naming-convention': [
                'error',
                { selector: 'typeLike', format: ['PascalCase'] },
            ],
        },
    },
];

export default config;

// import boundaries
// {
//     plugins: { boundaries },
//     settings: {
//         'boundaries/elements': [
//             { type: 'shared', pattern: 'src/shared/*' },
//             { type: 'entities', pattern: 'src/entities/*' },
//             { type: 'features', pattern: 'src/features/*' },
//             { type: 'widgets', pattern: 'src/widgets/*' },
//             { type: 'pages', pattern: 'src/pages/*' },
//             { type: 'app', pattern: 'src/app/*' },
//         ],
//     },
//     rules: {
//         'boundaries/element-types': [
//             'error',
//             {
//                 default: 'disallow',
//                 rules: [
//                     { from: 'features', allow: ['shared', 'entities', 'features'] },
//                     { from: 'widgets', allow: ['shared', 'entities', 'features'] },
//                     { from: 'pages', allow: ['shared', 'entities', 'features', 'widgets'] },
//                     {
//                         from: 'app',
//                         allow: ['shared', 'entities', 'features', 'widgets', 'pages'],
//                     },
//                 ],
//             },
//         ],
//         'boundaries/no-unknown': 'error',
//     },
// },

// import eslintPluginJs from '@eslint/js';
// import { defineConfig } from 'eslint/config';
// import globals from 'globals';
// import tseslint from 'typescript-eslint';
// import pluginVue from 'eslint-plugin-vue';

// export default defineConfig(
//     eslintPluginJs.configs.recommended,
//     ...tseslint.configs.recommended,
//     ...pluginVue.configs['flat/recommended'],
//     {
//         languageOptions: {
//             globals: { ...globals.node },
//             parser: tseslint.parser,
//             parserOptions: {
//                 ecmaVersion: 'latest',
//                 sourceType: 'module',
//                 warnOnUnsupportedTypeScriptVersion: false,
//             },
//         },

//         rules: {
//             'newline-before-return': 'error',
//             '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
//             '@typescript-eslint/consistent-type-imports': 'error',
//             '@typescript-eslint/no-import-type-side-effects': 'error',
//             '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
//             '@typescript-eslint/array-type': ['error', { default: 'array' }],
//             '@typescript-eslint/naming-convention': [
//                 'error',
//                 { selector: 'typeLike', format: ['PascalCase'] },
//             ],
//         },
//     }
// );

// restrict use of env

// 'no-restricted-syntax': [
//     'error',
//     {
//         selector:
//             "ImportSpecifier[local.name='env'][parent.source.value='node:process']",
//         message:
//             "Importing env from 'node:process' is not allowed. Use env config instead.",
//     },
//     {
//         selector: "ImportSpecifier[local.name='env'][parent.source.value='process']",
//         message:
//             "Importing 'env' from 'process' is not allowed. Use env config instead.",
//     },
//     {
//         selector: "MemberExpression[object.name='process'][property.name='env']",
//         message: "Accessing 'process.env' is not allowed. Use env config instead.",
//     },
// ],

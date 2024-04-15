import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import globals from 'globals';
import js from '@eslint/js';

export default [
    js.configs.recommended,
    prettierConfig,
    {
        plugins: {
            prettier: prettierPlugin,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                global: true,
            },
        },
    },
];

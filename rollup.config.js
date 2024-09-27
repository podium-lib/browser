import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.js',
    plugins: [
        resolve(),
        commonjs(),
        getBabelOutputPlugin({
            presets: ['@babel/preset-env'],
        }),
    ],
    output: [
        {
            exports: 'auto',
            format: 'cjs',
            dir: 'dist/',
            preserveModules: true,
        },
    ],
};

import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default [{
    input: 'src/index.js',
    output: [{
        dir: 'dist/cjs',
        format: 'cjs',
    }],
    plugins: [resolve(), commonjs(), getBabelOutputPlugin({
        presets: ['@babel/preset-env']
    })],
    preserveModules: true,
},{
    input: 'src/index.js',
    output: [{
        dir: 'dist/esm',
        format: 'esm',
    }],
    plugins: [resolve(), commonjs()],
    preserveModules: true,
}];

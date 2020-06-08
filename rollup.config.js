import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.js',
    output: [{
        dir: 'dist/esm',
        format: 'esm',
    },
    {
        dir: 'dist/cjs',
        format: 'cjs',
    }],
    plugins: [resolve(), commonjs()],
    preserveModules: true,
};

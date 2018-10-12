import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';

const input = 'src/index.js';
const excludeAllExternals = id => !id.startsWith('.') && !id.startsWith('/');
const extensions = ['.js', '.jsx'];

export default [
  // ESM build
  {
    input,
    output: {
      file: 'dist/css-box-model.esm.js',
      format: 'esm',
    },
    external: excludeAllExternals,
    plugins: [babel()],
  },
  // CommonJS build
  {
    input,
    external: excludeAllExternals,
    output: {
      file: 'dist/css-box-model.cjs.js',
      format: 'cjs',
    },
    plugins: [babel()],
  },
  // Universal module definition (UMD) build
  {
    input,
    output: {
      file: 'dist/css-box-model.js',
      format: 'umd',
      name: 'cssBoxModel',
    },
    plugins: [
      babel(),
      // used to include tiny-invariant
      resolve({ extensions }),
      commonjs({ include: 'node_modules/**' }),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
  },
  // Universal module definition (UMD) build (production)
  {
    input,
    output: {
      file: 'dist/css-box-model.min.js',
      format: 'umd',
      name: 'cssBoxModel',
    },
    plugins: [
      babel(),
      // used to include tiny-invariant
      resolve({ extensions }),
      commonjs({ include: 'node_modules/**' }),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      uglify(),
    ],
  },
];

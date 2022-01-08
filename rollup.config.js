import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';

const plugins = [resolve(), typescript(), commonjs()];

// TODO: edit external dependencies
const external = [
  "dependency"
]

// TODO: edit name
const name = "chessopsnpmts"

export default [  
  // Universal Module Definition, works as amd, cjs and iife all in one
  {
    input: 'src/index.ts',
    external,
    output: {
      name,
      file: `dist/index.js`,
      format: 'umd',
      sourcemap: true,
      globals: {
        child_process: "child_process",
      }
    },
    plugins,
    onwarn: (warning, warn)=>{
      if(warning.code === "FILE_NAME_CONFLICT") return
        if(warning.code === "CIRCULAR_DEPENDENCY") return
      warn(warning)
    }
  },      
];
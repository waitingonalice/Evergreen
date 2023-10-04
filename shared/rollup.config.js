import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import sourceMaps from "rollup-plugin-sourcemaps";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

export default {
  input: "./src/index.ts",
  output: [
    {
      file: "./dist/cjs/index.cjs",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "./dist/mjs/index.mjs",
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
    resolve(),
    commonjs(),
    sourceMaps(),
    terser(),
  ],
};

import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript2";
import sourceMaps from "rollup-plugin-sourcemaps";
import vue from "rollup-plugin-vue"; 

const libraryName = '@iwowen/utils'

export default {
  input: "src/index.ts",
  output: [
    { format: "es", file: 'lib/main.esm.js' },
    { format: "umd", file: 'lib/main.umd.js', name: libraryName },
  ],
  plugins: [
    json(),
    typescript({
      exclude: "node_modules/**",
      // eslint-disable-next-line no-undef
      typescript: require("typescript"),
      useTsconfigDeclarationDir: true
    }),
    vue({
      css: true, 
      compileTemplate: true 
    }),
    sourceMaps(),
  ],
};

import { alias } from "rollup-plugin-alias";

export default {
  input: "./index.js",
  output: {
    file: "./dist/index.js",
    format: "es",
  },
  plugins: [
    alias({
      entries: {
        "-": "./utils",
      },
      /*  第二种写法
        entries:[
          {
            find:'-',
            replacement:'./utils'
          }
        ]
        */
    }),
  ],
};
